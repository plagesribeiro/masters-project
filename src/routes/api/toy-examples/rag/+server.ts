import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { RAGAgent } from '$lib/langchain/agents.js';
import { LangfuseTracingService } from '$lib/langchain/tracing.js';
import type { ChatMessage } from '$lib/langchain/service.js';
import type { RequestHandler } from './$types.js';

interface RAGRequest {
    message: string;
    history?: ChatMessage[];
    language?: string;
    sessionId?: string;
    userId?: string;
}

export const POST: RequestHandler = async ({ request }) => {
    let language = 'en'; // Default language
    const tracingService = LangfuseTracingService.getInstance();

    try {
        const OPENAI_API_KEY = env.OPENAI_API_KEY;

        if (!OPENAI_API_KEY) {
            throw new Error('OpenAI API key not configured');
        }

        const requestData: RAGRequest = await request.json();
        const { message, history = [], sessionId, userId } = requestData;
        language = requestData.language || 'en'; // Update language from request

        if (!message || typeof message !== 'string') {
            return json({ error: 'Message is required' }, { status: 400 });
        }

        // Extract user information from request headers
        const { userId: headerUserId, sessionId: headerSessionId } = LangfuseTracingService.extractUserInfo(request);
        
        // Use provided or extracted user/session info
        const finalUserId = userId || headerUserId;
        const finalSessionId = sessionId || headerSessionId || LangfuseTracingService.generateSessionId(finalUserId, 'rag');

        // System prompt for RAG Implementation
        const systemPrompt = language === 'en'
            ? 'You are an AI assistant specialized in RAG (Retrieval-Augmented Generation) implementation. You help users understand and implement techniques like Vector Embeddings, Semantic Search, Document Indexing, and context retrieval for enhanced AI responses. You have access to tools for searching documents and generating embeddings. Provide clear, practical guidance on RAG architecture and implementation strategies.'
            : 'Você é um assistente de IA especializado em implementação de RAG (Retrieval-Augmented Generation). Você ajuda usuários a entender e implementar técnicas como Vector Embeddings, Busca Semântica, Indexação de Documentos e recuperação de contexto para respostas de IA aprimoradas. Você tem acesso a ferramentas para buscar documentos e gerar embeddings. Forneça orientações claras e práticas sobre arquitetura e estratégias de implementação de RAG.';

        // Initialize RAG agent
        const ragAgent = new RAGAgent(OPENAI_API_KEY, systemPrompt);

        // Create comprehensive tracing configuration for RAG
        const tracingConfig = {
            sessionId: finalSessionId,
            userId: finalUserId,
            language: language,
            endpoint: 'rag-implementation',
            metadata: {
                userAgent: request.headers.get('user-agent') || 'Unknown',
                ip: request.headers.get('x-forwarded-for') || 'Unknown',
                referer: request.headers.get('referer') || 'Unknown',
                requestTimestamp: new Date().toISOString(),
                messageWordCount: message.split(' ').length,
                conversationTurn: history.length + 1,
                systemPromptType: 'rag-specialized',
                agentType: 'RAG',
                availableTools: ['rag_search', 'vector_embedding'],
                useCase: 'rag-toy-example',
            },
        };

        // Generate response using RAG agent with comprehensive tracing
        const response = await ragAgent.generateResponse(
            message,
            history,
            'rag-session', // Thread ID for this session
            tracingConfig
        );

        // Log successful RAG interaction
        console.log(`RAG interaction completed - Session: ${finalSessionId}, Language: ${language}, Response length: ${response.length}`);

        return json({
            response: response,
            sessionId: finalSessionId,
            metadata: {
                language: language,
                timestamp: new Date().toISOString(),
                messageLength: message.length,
                responseLength: response.length,
                agentType: 'RAG',
                toolsAvailable: ['rag_search', 'vector_embedding'],
            }
        });

    } catch (error) {
        console.error('RAG API error:', error);

        // Get error message based on language
        const errorMessage = language === 'en'
            ? 'Internal server error. Please try again in a few moments.'
            : 'Erro interno do servidor. Tente novamente em alguns instantes.';

        // Ensure flushing even on error
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
                endpoint: 'rag-implementation',
            },
            { status: 500 }
        );
    }
}; 