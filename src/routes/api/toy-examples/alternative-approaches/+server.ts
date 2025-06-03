import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { LangfuseTracingService } from '$lib/langchain/tracing.js';
import type { ChatMessage } from '$lib/langchain/service.js';
import type { RequestHandler } from './$types.js';
import { ChatOpenAI } from '@langchain/openai';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { MemorySaver } from '@langchain/langgraph';
import { SystemMessage, HumanMessage, AIMessage } from '@langchain/core/messages';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';

interface AlternativeApproachesRequest {
    message: string;
    history?: ChatMessage[];
    language?: string;
    sessionId?: string;
    userId?: string;
}

// Dados dos produtos da loja (simulando planilha)
const PRODUTOS = [
    { id: 1, nome: 'Caneca Personalizada', limite_chars: 50, preco: 25.90, estoque: 15 },
    { id: 2, nome: 'Camiseta Personalizada', limite_chars: 30, preco: 39.90, estoque: 8 },
    { id: 3, nome: 'Quadro Decorativo', limite_chars: 40, preco: 89.90, estoque: 5 },
    { id: 4, nome: 'Almofada Personalizada', limite_chars: 35, preco: 29.90, estoque: 12 },
    { id: 5, nome: 'Mousepad Personalizado', limite_chars: 25, preco: 19.90, estoque: 20 },
    { id: 6, nome: 'Agenda Personalizada', limite_chars: 20, preco: 34.90, estoque: 10 },
    { id: 7, nome: 'Chaveiro Personalizado', limite_chars: 15, preco: 12.90, estoque: 25 },
    { id: 8, nome: 'Porta-retratos Personalizado', limite_chars: 30, preco: 24.90, estoque: 7 },
    { id: 9, nome: 'Ecobag Personalizada', limite_chars: 40, preco: 22.90, estoque: 18 },
    { id: 10, nome: 'Squeeze Personalizado', limite_chars: 25, preco: 27.90, estoque: 14 }
];

// Simulação de base de dados de pedidos (em produção seria Google Sheets)
let PEDIDOS: any[] = [];

// Ferramentas da loja usando LangChain tools
const listarProdutosTool = tool(async () => {
    const resultado = PRODUTOS.map(p => ({
        nome: p.nome,
        preco: `R$ ${p.preco.toFixed(2)}`,
        limite_personalizacao: `${p.limite_chars} caracteres`,
        estoque: p.estoque
    }));
    
    console.log('Tool listar_produtos executada - produtos encontrados:', resultado.length);
    return JSON.stringify({ produtos: resultado });
}, {
    name: 'listar_produtos',
    description: 'Lista todos os produtos disponíveis na loja com preços, limites de personalização e estoque atual',
    schema: z.object({})
});

const validarPersonalizacaoTool = tool(async ({ produto_nome, texto_personalizacao }) => {
    const produto = PRODUTOS.find(p => p.nome.toLowerCase().includes(produto_nome.toLowerCase()));
    if (!produto) {
        return JSON.stringify({ valido: false, erro: 'Produto não encontrado' });
    }
    
    const valido = texto_personalizacao.length <= produto.limite_chars;
    const resultado = {
        valido,
        caracteres_usados: texto_personalizacao.length,
        limite_maximo: produto.limite_chars,
        produto: produto.nome
    };
    
    console.log('Tool validar_personalizacao executada:', resultado);
    return JSON.stringify(resultado);
}, {
    name: 'validar_personalizacao',
    description: 'Valida se o texto de personalização está dentro do limite permitido para o produto específico',
    schema: z.object({
        produto_nome: z.string().describe('Nome do produto para validar'),
        texto_personalizacao: z.string().describe('Texto da personalização a ser validado')
    })
});

const confirmarPedidoTool = tool(async ({ nome_cliente, telefone_cliente, produto_nome, quantidade, personalizacao }) => {
    const produto = PRODUTOS.find(p => p.nome.toLowerCase().includes(produto_nome.toLowerCase()));
    if (!produto) {
        return JSON.stringify({ sucesso: false, erro: 'Produto não encontrado' });
    }
    
    if (produto.estoque < quantidade) {
        return JSON.stringify({ sucesso: false, erro: `Estoque insuficiente. Disponível: ${produto.estoque}` });
    }
    
    // Criar pedido
    const pedido = {
        id: PEDIDOS.length + 1,
        cliente: nome_cliente,
        telefone: telefone_cliente,
        produto: produto.nome,
        quantidade: quantidade,
        personalizacao: personalizacao,
        valor_total: produto.preco * quantidade,
        data: new Date().toISOString(),
        status: 'Confirmado'
    };
    
    // Adicionar à lista de pedidos
    PEDIDOS.push(pedido);
    
    // Atualizar estoque
    produto.estoque -= quantidade;
    
    const resultado = {
        sucesso: true,
        pedido_id: pedido.id,
        valor_total: `R$ ${pedido.valor_total.toFixed(2)}`,
        prazo_entrega: '7-10 dias úteis'
    };
    
    console.log('Tool confirmar_pedido executada - Pedido criado:', pedido.id);
    return JSON.stringify(resultado);
}, {
    name: 'confirmar_pedido',
    description: 'Confirma um pedido, registra na base de dados e atualiza o estoque automaticamente',
    schema: z.object({
        nome_cliente: z.string().describe('Nome completo do cliente'),
        telefone_cliente: z.string().describe('Telefone de contato do cliente'),
        produto_nome: z.string().describe('Nome do produto escolhido'),
        quantidade: z.number().describe('Quantidade de itens'),
        personalizacao: z.string().describe('Texto da personalização')
    })
});

const consultarPedidosTool = tool(async () => {
    console.log('Tool consultar_pedidos executada - pedidos:', PEDIDOS.length);
    return JSON.stringify({ pedidos: PEDIDOS });
}, {
    name: 'consultar_pedidos',
    description: 'Consulta todos os pedidos realizados (ferramenta para verificação interna)',
    schema: z.object({})
});

// Classe para o agente da loja
class LojaArtefatosAgent {
    private agent: any;
    private checkpointer: MemorySaver;
    private systemPrompt: string;
    private tracingService: LangfuseTracingService;

    constructor(apiKey: string, systemPrompt: string) {
        this.checkpointer = new MemorySaver();
        this.systemPrompt = systemPrompt;
        this.tracingService = LangfuseTracingService.getInstance();
        
        const model = new ChatOpenAI({
            model: 'gpt-4o',
            temperature: 0.7,
            openAIApiKey: apiKey,
        });

        // Create agent com ferramentas da loja
        this.agent = createReactAgent({
            llm: model,
            tools: [listarProdutosTool, validarPersonalizacaoTool, confirmarPedidoTool, consultarPedidosTool],
            checkpointSaver: this.checkpointer,
        });
    }

    async generateResponse(
        message: string, 
        history: ChatMessage[] = [], 
        threadId: string = 'default',
        tracingConfig: any = {}
    ): Promise<string> {
        // Create clean conversation tracer
        const tracingService = LangfuseTracingService.getInstance();
        const cleanTracer = tracingService.createCleanConversationTracer(tracingConfig);

        try {
            // Convert history to LangChain messages, starting with system message
            const messages = [new SystemMessage(this.systemPrompt)];
            
            // Add conversation history
            for (const msg of history.slice(-10)) { // Last 10 messages
                messages.push(msg.isUser ? new HumanMessage(msg.text) : new AIMessage(msg.text));
            }
            
            // Add current message
            messages.push(new HumanMessage(message));

            const result = await this.agent.invoke(
                { messages },
                { 
                    configurable: { thread_id: threadId },
                    callbacks: [cleanTracer.getCallbackHandler()],
                    runName: `loja-agent-${tracingConfig.language || 'pt'}`,
                    metadata: {
                        endpoint: 'loja-artefatos',
                        systemType: 'alternative-approaches',
                    },
                }
            );

            const responseContent = result.messages[result.messages.length - 1].content;

            // Log clean conversation with just user input and AI output
            await cleanTracer.logConversation(
                message, 
                responseContent, 
                { 
                    systemType: 'alternative-approaches',
                    conversationLength: history.length,
                }
            );

            // Flush events for serverless environments
            await this.tracingService.flush();

            return responseContent;

        } catch (error) {
            console.error('Loja Agent error:', error);
            
            // Log error with clean format
            await cleanTracer.logError(
                message, 
                error instanceof Error ? error.message : 'Unknown error',
                { 
                    systemType: 'alternative-approaches',
                    errorType: error instanceof Error ? error.constructor.name : 'Unknown'
                }
            );
            
            await this.tracingService.flush();
            throw error;
        }
    }
}

export const POST: RequestHandler = async ({ request }) => {
    let language = 'pt'; // Default para português
    const tracingService = LangfuseTracingService.getInstance();

    try {
        const OPENAI_API_KEY = env.OPENAI_API_KEY;

        if (!OPENAI_API_KEY) {
            throw new Error('OpenAI API key not configured');
        }

        const requestData: AlternativeApproachesRequest = await request.json();
        const { message, history = [], sessionId, userId } = requestData;
        language = requestData.language || 'pt';

        if (!message || typeof message !== 'string') {
            return json({ error: 'Message is required' }, { status: 400 });
        }

        // Extract user information from request headers
        const { userId: headerUserId, sessionId: headerSessionId } = LangfuseTracingService.extractUserInfo(request);
        
        // Use provided or extracted user/session info
        const finalUserId = userId || headerUserId;
        const finalSessionId = sessionId || headerSessionId || LangfuseTracingService.generateSessionId(finalUserId, 'loja-artefatos');

        // System prompt para o vendedor da loja
        const systemPrompt = `Você é um vendedor especialista de uma loja virtual chamada "Artefatos Personalizados".

SOBRE A LOJA:
- Vendemos produtos personalizados como canecas, camisetas, quadros, almofadas, etc.
- Cada produto tem limite específico de caracteres para personalização
- Temos estoque limitado de cada item
- Preços competitivos e entrega em 7-10 dias úteis

SEU PAPEL COMO VENDEDOR:
1. Seja cordial, prestativo e profissional
2. Entenda as necessidades do cliente e faça perguntas relevantes
3. SEMPRE use a ferramenta "listar_produtos" para mostrar opções atualizadas
4. Sugira produtos adequados baseado no que eles querem personalizar
5. Valide personalizações usando "validar_personalizacao" ANTES de confirmar
6. Para finalizar vendas, colete obrigatoriamente: nome completo, telefone, produto, quantidade e texto da personalização
7. Use "confirmar_pedido" para processar a venda
8. Informe claramente sobre preços finais e prazos de entrega

FERRAMENTAS DISPONÍVEIS:
- listar_produtos: mostra catálogo completo com preços e estoque
- validar_personalizacao: verifica se o texto cabe no limite do produto
- confirmar_pedido: finaliza a venda e atualiza estoque
- consultar_pedidos: para verificações internas se necessário

IMPORTANTE:
- NUNCA confirme um pedido sem antes validar a personalização
- Seja transparente sobre preços e prazos
- Pergunte detalhes sobre a personalização desejada
- Ajude o cliente a escolher o produto ideal para suas necessidades
- Sempre confirme todos os dados antes de finalizar

Inicie se apresentando como vendedor da loja e pergunte como pode ajudar!`;

        // Initialize agent da loja
        const agent = new LojaArtefatosAgent(OPENAI_API_KEY, systemPrompt);

        // Create tracing configuration
        const tracingConfig = {
            sessionId: finalSessionId,
            userId: finalUserId,
            language: language,
            endpoint: 'loja-artefatos',
            metadata: {
                userAgent: request.headers.get('user-agent') || 'Unknown',
                ip: request.headers.get('x-forwarded-for') || 'Unknown',
                referer: request.headers.get('referer') || 'Unknown',
                requestTimestamp: new Date().toISOString(),
                messageWordCount: message.split(' ').length,
                conversationTurn: history.length + 1,
                systemPromptType: 'loja-vendedor-especializada',
                agentType: 'LojaArtefatos',
                availableTools: ['listar_produtos', 'validar_personalizacao', 'confirmar_pedido', 'consultar_pedidos'],
                useCase: 'loja-artefatos-personalizados',
                businessType: 'e-commerce',
            },
        };

        // Generate response using agent with tools
        const response = await agent.generateResponse(
            message,
            history,
            'loja-session',
            tracingConfig
        );

        console.log(`Loja interaction completed - Session: ${finalSessionId}, Language: ${language}, Response length: ${response.length}`);

        return json({
            response: response,
            sessionId: finalSessionId,
            metadata: {
                language: language,
                timestamp: new Date().toISOString(),
                messageLength: message.length,
                responseLength: response.length,
                agentType: 'LojaArtefatos',
                toolsAvailable: ['listar_produtos', 'validar_personalizacao', 'confirmar_pedido', 'consultar_pedidos'],
                businessContext: 'loja-artefatos-personalizados',
                // Dados de debug para verificação
                produtosDisponiveis: PRODUTOS.length,
                pedidosRegistrados: PEDIDOS.length
            }
        });

    } catch (error) {
        console.error('Loja API error:', error);

        const errorMessage = language === 'pt'
            ? 'Erro interno do servidor. Tente novamente em alguns instantes.'
            : 'Internal server error. Please try again in a few moments.';

        try {
            await tracingService.flush();
        } catch (flushError) {
            console.error('Error flushing tracing service:', flushError);
        }

        return json(
            {
                error: errorMessage,
                details: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString(),
                endpoint: 'loja-artefatos',
            },
            { status: 500 }
        );
    }
};

// Endpoint adicional para consultar dados (GET)
export const GET: RequestHandler = async ({ url }) => {
    const type = url.searchParams.get('type');
    
    if (type === 'produtos') {
        return json({ produtos: PRODUTOS });
    } else if (type === 'pedidos') {
        return json({ pedidos: PEDIDOS });
    }
    
    return json({ 
        produtos: PRODUTOS, 
        pedidos: PEDIDOS,
        resumo: {
            total_produtos: PRODUTOS.length,
            total_pedidos: PEDIDOS.length,
            estoque_total: PRODUTOS.reduce((acc, p) => acc + p.estoque, 0)
        }
    });
}; 