import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { AlternativeApproachesAgent } from '$lib/langchain/agents.js';
import { LangfuseTracingService } from '$lib/langchain/tracing.js';
import type { ChatMessage } from '$lib/langchain/service.js';
import type { RequestHandler } from './$types.js';

interface AlternativeApproachesRequest {
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

        const requestData: AlternativeApproachesRequest = await request.json();
        const { message, history = [], sessionId, userId } = requestData;
        language = requestData.language || 'en'; // Update language from request

        if (!message || typeof message !== 'string') {
            return json({ error: 'Message is required' }, { status: 400 });
        }

        // Extract user information from request headers
        const { userId: headerUserId, sessionId: headerSessionId } = LangfuseTracingService.extractUserInfo(request);
        
        // Use provided or extracted user/session info
        const finalUserId = userId || headerUserId;
        const finalSessionId = sessionId || headerSessionId || LangfuseTracingService.generateSessionId(finalUserId, 'alt-approaches');

        // System prompt for Alternative Approaches
        const systemPrompt = language === 'en'
            ? 'You are an AI assistant specialized in Alternative Approaches for language model training. You help users understand and implement techniques like Few-Shot Learning, Prompt Engineering, and Chain of Thought reasoning. You have access to specialized tools for demonstrating these techniques. Provide clear, practical guidance on these intermediate approaches to AI training.'
            : 'Você é um assistente de IA especializado em Abordagens Alternativas para treinamento de modelos de linguagem. Você ajuda usuários a entender e implementar técnicas como Few-Shot Learning, Prompt Engineering e raciocínio Chain of Thought. Você tem acesso a ferramentas especializadas para demonstrar essas técnicas. Forneça orientações claras e práticas sobre essas abordagens intermediárias para treinamento de IA.';

        // Initialize Alternative Approaches agent
        const altApproachesAgent = new AlternativeApproachesAgent(OPENAI_API_KEY, systemPrompt);

        // Create comprehensive tracing configuration for Alternative Approaches
        const tracingConfig = {
            sessionId: finalSessionId,
            userId: finalUserId,
            language: language,
            endpoint: 'alternative-approaches',
            metadata: {
                userAgent: request.headers.get('user-agent') || 'Unknown',
                ip: request.headers.get('x-forwarded-for') || 'Unknown',
                referer: request.headers.get('referer') || 'Unknown',
                requestTimestamp: new Date().toISOString(),
                messageWordCount: message.split(' ').length,
                conversationTurn: history.length + 1,
                systemPromptType: 'alternative-approaches-specialized',
                agentType: 'AlternativeApproaches',
                availableTools: ['few_shot_learning', 'chain_of_thought'],
                useCase: 'alternative-approaches-toy-example',
                techniques: ['Few-Shot Learning', 'Prompt Engineering', 'Chain of Thought'],
            },
        };

        // Generate response using Alternative Approaches agent with comprehensive tracing
        const response = await altApproachesAgent.generateResponse(
            message,
            history,
            'alt-approaches-session', // Thread ID for this session
            tracingConfig
        );

        // Log successful Alternative Approaches interaction
        console.log(`Alternative Approaches interaction completed - Session: ${finalSessionId}, Language: ${language}, Response length: ${response.length}`);

        return json({
            response: response,
            sessionId: finalSessionId,
            metadata: {
                language: language,
                timestamp: new Date().toISOString(),
                messageLength: message.length,
                responseLength: response.length,
                agentType: 'AlternativeApproaches',
                toolsAvailable: ['few_shot_learning', 'chain_of_thought'],
                techniques: ['Few-Shot Learning', 'Prompt Engineering', 'Chain of Thought'],
            }
        });

    } catch (error) {
        console.error('Alternative Approaches API error:', error);

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
                endpoint: 'alternative-approaches',
            },
            { status: 500 }
        );
    }
}; 