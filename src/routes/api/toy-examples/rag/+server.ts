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

interface RAGRequest {
    message: string;
    history?: ChatMessage[];
    language?: string;
    sessionId?: string;
    userId?: string;
}

// Banco de dados de produtos eletrônicos (simulando um catálogo dinâmico extenso)
const PRODUTOS_ELETRONICOS = [
    // Notebooks
    { id: 1, nome: 'Dell Inspiron 15 3000', categoria: 'notebook', preco: 2499.99, ram: '8GB', ssd: '256GB', processador: 'Intel i5-1135G7', gpu: 'Intel Iris Xe', marca: 'Dell', peso: '1.8kg', bateria: '6h', uso_recomendado: 'trabalho escritório estudos', estoque: 12 },
    { id: 2, nome: 'Lenovo IdeaPad Gaming 3i', categoria: 'notebook', preco: 4299.99, ram: '16GB', ssd: '512GB', processador: 'Intel i7-11370H', gpu: 'GTX 1650', marca: 'Lenovo', peso: '2.2kg', bateria: '5h', uso_recomendado: 'jogos games gaming programação', estoque: 8 },
    { id: 3, nome: 'MacBook Air M2', categoria: 'notebook', preco: 7999.99, ram: '8GB', ssd: '256GB', processador: 'Apple M2', gpu: 'Apple M2', marca: 'Apple', peso: '1.24kg', bateria: '18h', uso_recomendado: 'design vídeo edição trabalho premium', estoque: 5 },
    { id: 4, nome: 'Acer Aspire 5', categoria: 'notebook', preco: 2899.99, ram: '8GB', ssd: '512GB', processador: 'AMD Ryzen 5 5500U', gpu: 'AMD Radeon', marca: 'Acer', peso: '1.7kg', bateria: '7h', uso_recomendado: 'estudos trabalho escritório básico', estoque: 15 },
    { id: 5, nome: 'ASUS ROG Strix G15', categoria: 'notebook', preco: 6799.99, ram: '16GB', ssd: '1TB', processador: 'AMD Ryzen 7 5800H', gpu: 'RTX 3060', marca: 'ASUS', peso: '2.3kg', bateria: '4h', uso_recomendado: 'jogos games gaming streaming', estoque: 6 },
    
    // Smartphones
    { id: 6, nome: 'iPhone 14 Pro', categoria: 'smartphone', preco: 6999.99, ram: '6GB', armazenamento: '128GB', processador: 'A16 Bionic', camera: '48MP tripla', marca: 'Apple', tela: '6.1"', bateria: '3200mAh', uso_recomendado: 'premium fotografia vídeo', estoque: 20 },
    { id: 7, nome: 'Samsung Galaxy S23', categoria: 'smartphone', preco: 4499.99, ram: '8GB', armazenamento: '256GB', processador: 'Snapdragon 8 Gen 2', camera: '50MP tripla', marca: 'Samsung', tela: '6.1"', bateria: '3900mAh', uso_recomendado: 'premium Android fotografia', estoque: 18 },
    { id: 8, nome: 'Xiaomi Redmi Note 12', categoria: 'smartphone', preco: 1299.99, ram: '6GB', armazenamento: '128GB', processador: 'Snapdragon 685', camera: '48MP dupla', marca: 'Xiaomi', tela: '6.67"', bateria: '5000mAh', uso_recomendado: 'custo benefício básico', estoque: 25 },
    
    // Placas de Vídeo
    { id: 9, nome: 'NVIDIA RTX 4090', categoria: 'gpu', preco: 12999.99, memoria: '24GB GDDR6X', cuda_cores: '16384', marca: 'NVIDIA', consumo: '450W', uso_recomendado: 'jogos 4K gaming streaming professional', estoque: 3 },
    { id: 10, nome: 'AMD RX 7800 XT', categoria: 'gpu', preco: 3899.99, memoria: '16GB GDDR6', stream_processors: '3840', marca: 'AMD', consumo: '263W', uso_recomendado: 'jogos 1440p gaming', estoque: 7 },
    { id: 11, nome: 'NVIDIA RTX 4060', categoria: 'gpu', preco: 2299.99, memoria: '8GB GDDR6', cuda_cores: '3072', marca: 'NVIDIA', consumo: '115W', uso_recomendado: 'jogos 1080p entry gaming', estoque: 12 },
    
    // Periféricos
    { id: 12, nome: 'Logitech MX Master 3S', categoria: 'mouse', preco: 599.99, tipo: 'wireless', dpi: '8000', marca: 'Logitech', bateria: '70 dias', uso_recomendado: 'produtividade design trabalho', estoque: 30 },
    { id: 13, nome: 'Keychron K2', categoria: 'teclado', preco: 899.99, tipo: 'mecânico wireless', switches: 'Gateron Brown', marca: 'Keychron', bateria: '72h', uso_recomendado: 'programação gaming trabalho', estoque: 15 },
    { id: 14, nome: 'Sony WH-1000XM5', categoria: 'fone', preco: 1999.99, tipo: 'over-ear wireless', cancelamento_ruido: 'sim', marca: 'Sony', bateria: '30h', uso_recomendado: 'música trabalho viagem premium', estoque: 22 },
    { id: 15, nome: 'HyperX Cloud II', categoria: 'fone', preco: 499.99, tipo: 'gaming wired', microfone: 'sim', marca: 'HyperX', frequencia: '15Hz-25kHz', uso_recomendado: 'jogos gaming comunicação', estoque: 18 },
    
    // Monitores
    { id: 16, nome: 'LG UltraGear 27GP850', categoria: 'monitor', preco: 2299.99, tamanho: '27"', resolucao: '1440p', refresh_rate: '165Hz', marca: 'LG', painel: 'IPS', uso_recomendado: 'jogos gaming produtividade', estoque: 10 },
    { id: 17, nome: 'Samsung Odyssey G9', categoria: 'monitor', preco: 7999.99, tamanho: '49"', resolucao: '5120x1440', refresh_rate: '240Hz', marca: 'Samsung', painel: 'VA Curved', uso_recomendado: 'gaming premium imersivo', estoque: 2 },
    
    // Componentes
    { id: 18, nome: 'AMD Ryzen 9 7900X', categoria: 'processador', preco: 3299.99, cores: '12', threads: '24', frequencia: '4.7GHz', marca: 'AMD', socket: 'AM5', uso_recomendado: 'gaming high-end produtividade', estoque: 8 },
    { id: 19, nome: 'Intel Core i7-13700K', categoria: 'processador', preco: 2899.99, cores: '16', threads: '24', frequencia: '5.4GHz', marca: 'Intel', socket: 'LGA1700', uso_recomendado: 'gaming produtividade streaming', estoque: 11 },
    { id: 20, nome: 'Corsair Vengeance LPX 32GB', categoria: 'memoria', preco: 899.99, capacidade: '32GB', velocidade: 'DDR4-3200', marca: 'Corsair', latencia: 'CL16', uso_recomendado: 'gaming produtividade multitask', estoque: 20 }
];

// Simulação de pedidos
let PEDIDOS_ELETRONICOS: any[] = [];

// Ferramenta de busca RAG com similaridade semântica
const buscaProdutosRAGTool = tool(async ({ consulta_usuario, orcamento_max, categoria_preferida }) => {
    console.log('RAG Search executada - Query:', consulta_usuario);
    
    // Simular busca vetorial/semântica
    const termosBusca = consulta_usuario.toLowerCase().split(' ');
    const produtosFiltrados = PRODUTOS_ELETRONICOS.filter(produto => {
        // Filtro por orçamento
        if (orcamento_max && produto.preco > orcamento_max) return false;
        
        // Filtro por categoria
        if (categoria_preferida && !produto.categoria.includes(categoria_preferida.toLowerCase())) return false;
        
        // Busca semântica simulada - verifica termos relevantes
        const camposBusca = [
            produto.nome, produto.categoria, produto.uso_recomendado,
            produto.marca, produto.processador || '', produto.gpu || ''
        ].join(' ').toLowerCase();
        
        return termosBusca.some(termo => camposBusca.includes(termo));
    });
    
    // Simular ranking por relevância (ordenar por estoque e preço)
    const produtosRankeados = produtosFiltrados
        .sort((a, b) => b.estoque - a.estoque)
        .slice(0, 8); // Limitar resultados
    
    const resultado = {
        produtos_encontrados: produtosRankeados.length,
        produtos: produtosRankeados.map(p => ({
            nome: p.nome,
            preco: `R$ ${p.preco.toFixed(2)}`,
            categoria: p.categoria,
            marca: p.marca,
            especificacoes: extrairEspecificacoes(p),
            uso_recomendado: p.uso_recomendado,
            estoque: p.estoque
        })),
        metadados_busca: {
            termos_identificados: termosBusca,
            orcamento_aplicado: orcamento_max || 'sem limite',
            categoria_filtrada: categoria_preferida || 'todas'
        }
    };
    
    return JSON.stringify(resultado);
}, {
    name: 'busca_produtos_rag',
    description: 'Busca produtos no catálogo usando RAG com busca vetorial/semântica baseada nas necessidades do usuário',
    schema: z.object({
        consulta_usuario: z.string().describe('Descrição das necessidades do usuário em linguagem natural'),
        orcamento_max: z.number().optional().describe('Orçamento máximo em reais'),
        categoria_preferida: z.string().optional().describe('Categoria preferida: notebook, smartphone, gpu, etc.')
    })
});

// Ferramenta para comparar produtos
const compararProdutosTool = tool(async ({ ids_produtos }) => {
    const produtos = PRODUTOS_ELETRONICOS.filter(p => ids_produtos.includes(p.id));
    
    const comparacao = {
        produtos_comparados: produtos.length,
        detalhes: produtos.map(p => ({
            nome: p.nome,
            preco: `R$ ${p.preco.toFixed(2)}`,
            especificacoes_completas: extrairEspecificacoes(p),
            marca: p.marca,
            categoria: p.categoria,
            estoque: p.estoque
        })),
        analise_comparativa: gerarAnaliseComparativa(produtos)
    };
    
    console.log('Comparação executada para produtos:', ids_produtos);
    return JSON.stringify(comparacao);
}, {
    name: 'comparar_produtos',
    description: 'Compara especificações detalhadas entre produtos selecionados',
    schema: z.object({
        ids_produtos: z.array(z.number()).describe('IDs dos produtos para comparar')
    })
});

// Ferramenta para confirmar pedido
const confirmarPedidoTool = tool(async ({ nome_cliente, email_cliente, produtos_pedido, endereco_entrega }) => {
    const produtosPedido = produtos_pedido.map(item => {
        const produto = PRODUTOS_ELETRONICOS.find(p => p.id === item.produto_id);
        if (!produto || produto.estoque < item.quantidade) {
            return { erro: `Produto ${item.produto_id} indisponível ou estoque insuficiente` };
        }
        return {
            produto: produto.nome,
            quantidade: item.quantidade,
            preco_unitario: produto.preco,
            subtotal: produto.preco * item.quantidade
        };
    });
    
    if (produtosPedido.some(item => item.erro)) {
        return JSON.stringify({ sucesso: false, erros: produtosPedido.filter(item => item.erro) });
    }
    
    const valorTotal = produtosPedido
        .filter(item => !item.erro && 'subtotal' in item)
        .reduce((sum, item) => sum + (item as any).subtotal, 0);
    
    const pedido = {
        id: PEDIDOS_ELETRONICOS.length + 1,
        cliente: nome_cliente,
        email: email_cliente,
        produtos: produtosPedido,
        endereco: endereco_entrega,
        valor_total: valorTotal,
        data: new Date().toISOString(),
        status: 'Confirmado'
    };
    
    PEDIDOS_ELETRONICOS.push(pedido);
    
    // Atualizar estoque
    produtos_pedido.forEach(item => {
        const produto = PRODUTOS_ELETRONICOS.find(p => p.id === item.produto_id);
        if (produto) produto.estoque -= item.quantidade;
    });
    
    console.log('Pedido confirmado:', pedido.id);
    return JSON.stringify({
        sucesso: true,
        pedido_id: pedido.id,
        valor_total: `R$ ${valorTotal.toFixed(2)}`,
        prazo_entrega: '3-7 dias úteis'
    });
}, {
    name: 'confirmar_pedido',
    description: 'Confirma pedido de produtos eletrônicos e atualiza estoque',
    schema: z.object({
        nome_cliente: z.string().describe('Nome completo do cliente'),
        email_cliente: z.string().describe('Email do cliente'),
        produtos_pedido: z.array(z.object({
            produto_id: z.number(),
            quantidade: z.number()
        })).describe('Lista de produtos e quantidades'),
        endereco_entrega: z.string().describe('Endereço completo para entrega')
    })
});

// Funções auxiliares
function extrairEspecificacoes(produto: any): string {
    const specs = [];
    if (produto.ram) specs.push(`RAM: ${produto.ram}`);
    if (produto.ssd) specs.push(`SSD: ${produto.ssd}`);
    if (produto.processador) specs.push(`CPU: ${produto.processador}`);
    if (produto.gpu) specs.push(`GPU: ${produto.gpu}`);
    if (produto.memoria) specs.push(`VRAM: ${produto.memoria}`);
    if (produto.bateria) specs.push(`Bateria: ${produto.bateria}`);
    if (produto.peso) specs.push(`Peso: ${produto.peso}`);
    if (produto.tela) specs.push(`Tela: ${produto.tela}`);
    if (produto.resolucao) specs.push(`Resolução: ${produto.resolucao}`);
    if (produto.refresh_rate) specs.push(`Taxa: ${produto.refresh_rate}`);
    
    return specs.join(', ') || 'Especificações básicas';
}

function gerarAnaliseComparativa(produtos: any[]): string {
    if (produtos.length < 2) return 'Necessários pelo menos 2 produtos para comparação';
    
    const categorias = [...new Set(produtos.map(p => p.categoria))];
    if (categorias.length > 1) {
        return `Comparando produtos de categorias diferentes: ${categorias.join(', ')}`;
    }
    
    const precos = produtos.map(p => p.preco);
    const maisBarato = produtos.find(p => p.preco === Math.min(...precos));
    const maisCaro = produtos.find(p => p.preco === Math.max(...precos));
    
    return `Análise: ${maisBarato?.nome} é a opção mais econômica (R$ ${maisBarato?.preco}), enquanto ${maisCaro?.nome} é premium (R$ ${maisCaro?.preco})`;
}

// Classe do agente RAG para eletrônicos
class TechStoreRAGAgent {
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

        this.agent = createReactAgent({
            llm: model,
            tools: [buscaProdutosRAGTool, compararProdutosTool, confirmarPedidoTool],
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
            const messages = [new SystemMessage(this.systemPrompt)];
            
            for (const msg of history.slice(-10)) {
                messages.push(msg.isUser ? new HumanMessage(msg.text) : new AIMessage(msg.text));
            }
            
            messages.push(new HumanMessage(message));

            const result = await this.agent.invoke(
                { messages },
                { 
                    configurable: { thread_id: threadId },
                    callbacks: [cleanTracer.getCallbackHandler()],
                    runName: `techstore-rag-${tracingConfig.language || 'pt'}`,
                    metadata: {
                        endpoint: 'techstore-rag',
                        systemType: 'RAG',
                    },
                }
            );

            const responseContent = result.messages[result.messages.length - 1].content;

            // Log clean conversation with just user input and AI output
            await cleanTracer.logConversation(
                message, 
                responseContent, 
                { 
                    systemType: 'RAG',
                    conversationLength: history.length,
                    catalogSize: PRODUTOS_ELETRONICOS.length,
                }
            );

            await this.tracingService.flush();
            return responseContent;

        } catch (error) {
            console.error('TechStore RAG Agent error:', error);
            
            // Log error with clean format
            await cleanTracer.logError(
                message, 
                error instanceof Error ? error.message : 'Unknown error',
                { 
                    systemType: 'RAG',
                    errorType: error instanceof Error ? error.constructor.name : 'Unknown'
                }
            );
            
            await this.tracingService.flush();
            throw error;
        }
    }
}

export const POST: RequestHandler = async ({ request }) => {
    let language = 'pt';
    const tracingService = LangfuseTracingService.getInstance();

    try {
        const OPENAI_API_KEY = env.OPENAI_API_KEY;

        if (!OPENAI_API_KEY) {
            throw new Error('OpenAI API key not configured');
        }

        const requestData: RAGRequest = await request.json();
        const { message, history = [], sessionId, userId } = requestData;
        language = requestData.language || 'pt';

        if (!message || typeof message !== 'string') {
            return json({ error: 'Message is required' }, { status: 400 });
        }

        const { userId: headerUserId, sessionId: headerSessionId } = LangfuseTracingService.extractUserInfo(request);
        
        const finalUserId = userId || headerUserId;
        const finalSessionId = sessionId || headerSessionId || LangfuseTracingService.generateSessionId(finalUserId, 'techstore-rag');

        // System prompt para TechStore com RAG
        const systemPrompt = `Você é um assistente de vendas especializado da TechStore, uma loja de eletrônicos e componentes tecnológicos.

SOBRE A TECHSTORE:
- Vendemos notebooks, smartphones, placas de vídeo, periféricos, monitores, componentes
- Catálogo dinâmico com milhares de produtos atualizados em tempo real
- Integração com sistemas ERP e catálogos de distribuidores
- Busca vetorial/semântica para recomendações personalizadas

SEU PAPEL COMO ESPECIALISTA:
1. Entenda necessidades técnicas expressas em linguagem natural
2. Use a ferramenta "busca_produtos_rag" para encontrar produtos relevantes
3. Faça recomendações baseadas em: orçamento, tipo de uso, compatibilidade, marca
4. Explique especificações técnicas de forma didática
5. Compare produtos quando solicitado usando "comparar_produtos"
6. Finalize vendas com "confirmar_pedido"

FERRAMENTAS RAG DISPONÍVEIS:
- busca_produtos_rag: busca vetorial/semântica no catálogo
- comparar_produtos: análise comparativa detalhada
- confirmar_pedido: processamento de vendas

ESPECIALIDADES:
- Gaming: placas de vídeo, processadores, monitors de alta refresh
- Produtividade: notebooks para trabalho, periféricos ergonômicos
- Criação de Conteúdo: equipamentos para edição de vídeo/foto
- Orçamento Limitado: custo-benefício e alternativas econômicas

IMPORTANTE:
- SEMPRE use busca RAG antes de recomendar produtos
- Considere compatibilidade entre componentes
- Explique diferenças técnicas relevantes
- Sugira upgrades ou alternativas quando apropriado
- Mantenha foco nas necessidades específicas do cliente

Inicie se apresentando como especialista da TechStore e pergunte como pode ajudar com tecnologia!`;

        const agent = new TechStoreRAGAgent(OPENAI_API_KEY, systemPrompt);

        const tracingConfig = {
            sessionId: finalSessionId,
            userId: finalUserId,
            language: language,
            endpoint: 'techstore-rag',
            metadata: {
                userAgent: request.headers.get('user-agent') || 'Unknown',
                ip: request.headers.get('x-forwarded-for') || 'Unknown',
                referer: request.headers.get('referer') || 'Unknown',
                requestTimestamp: new Date().toISOString(),
                messageWordCount: message.split(' ').length,
                conversationTurn: history.length + 1,
                systemPromptType: 'techstore-rag-especializado',
                agentType: 'TechStoreRAG',
                availableTools: ['busca_produtos_rag', 'comparar_produtos', 'confirmar_pedido'],
                useCase: 'loja-eletronicos-rag',
                businessType: 'e-commerce-rag',
                catalogSize: PRODUTOS_ELETRONICOS.length,
            },
        };

        const response = await agent.generateResponse(
            message,
            history,
            'techstore-rag-session',
            tracingConfig
        );

        console.log(`TechStore RAG interaction completed - Session: ${finalSessionId}, Language: ${language}, Response length: ${response.length}`);

        return json({
            response: response,
            sessionId: finalSessionId,
            metadata: {
                language: language,
                timestamp: new Date().toISOString(),
                messageLength: message.length,
                responseLength: response.length,
                agentType: 'TechStoreRAG',
                toolsAvailable: ['busca_produtos_rag', 'comparar_produtos', 'confirmar_pedido'],
                businessContext: 'loja-eletronicos-rag',
                catalogoAtual: PRODUTOS_ELETRONICOS.length,
                pedidosProcessados: PEDIDOS_ELETRONICOS.length
            }
        });

    } catch (error) {
        console.error('TechStore RAG API error:', error);

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
                endpoint: 'techstore-rag',
            },
            { status: 500 }
        );
    }
};

// Endpoint para consultar dados (GET)
export const GET: RequestHandler = async ({ url }) => {
    const type = url.searchParams.get('type');
    
    if (type === 'produtos') {
        return json({ produtos: PRODUTOS_ELETRONICOS });
    } else if (type === 'pedidos') {
        return json({ pedidos: PEDIDOS_ELETRONICOS });
    }
    
    return json({ 
        produtos: PRODUTOS_ELETRONICOS, 
        pedidos: PEDIDOS_ELETRONICOS,
        resumo: {
            total_produtos: PRODUTOS_ELETRONICOS.length,
            total_pedidos: PEDIDOS_ELETRONICOS.length,
            categorias: [...new Set(PRODUTOS_ELETRONICOS.map(p => p.categoria))],
            marcas: [...new Set(PRODUTOS_ELETRONICOS.map(p => p.marca))],
            valor_total_estoque: PRODUTOS_ELETRONICOS.reduce((acc, p) => acc + (p.preco * p.estoque), 0)
        }
    });
}; 