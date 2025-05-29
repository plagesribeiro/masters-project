import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getSystemPrompt } from '$lib/prompts/index.js';
import { LangChainChatService, type ChatMessage } from '$lib/langchain/service.js';
import { LangfuseTracingService } from '$lib/langchain/tracing.js';
import type { RequestHandler } from './$types.js';

interface ChatRequest {
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

        const requestData: ChatRequest = await request.json();
        const { message, history = [], sessionId, userId } = requestData;
        language = requestData.language || 'en'; // Update language from request

        if (!message || typeof message !== 'string') {
            return json({ error: 'Message is required' }, { status: 400 });
        }

        // Extract user information from request headers
        const { userId: headerUserId, sessionId: headerSessionId } = LangfuseTracingService.extractUserInfo(request);
        
        // Use provided or extracted user/session info
        const finalUserId = userId || headerUserId;
        const finalSessionId = sessionId || headerSessionId || LangfuseTracingService.generateSessionId(finalUserId, 'chat');

        // Get the appropriate system prompt based on language
        const systemPrompt = getSystemPrompt(language);

        // Initialize LangChain service
        const chatService = new LangChainChatService(OPENAI_API_KEY);

        // Create comprehensive tracing configuration
        const tracingConfig = {
            sessionId: finalSessionId,
            userId: finalUserId,
            language: language,
            endpoint: 'chat',
            metadata: {
                userAgent: request.headers.get('user-agent') || 'Unknown',
                ip: request.headers.get('x-forwarded-for') || 'Unknown',
                referer: request.headers.get('referer') || 'Unknown',
                requestTimestamp: new Date().toISOString(),
                messageWordCount: message.split(' ').length,
                conversationTurn: history.length + 1,
                systemPromptType: 'main-chat',
            },
        };

        // Generate response using LangChain with comprehensive tracing
        const response = await chatService.generateResponse(
            systemPrompt,
            message,
            history,
            tracingConfig
        );

        // Optionally log successful interaction
        console.log(`Chat interaction completed - Session: ${finalSessionId}, Language: ${language}, Response length: ${response.length}`);

        return json({
            response: response,
            sessionId: finalSessionId,
            metadata: {
                language: language,
                timestamp: new Date().toISOString(),
                messageLength: message.length,
                responseLength: response.length,
            }
        });

    } catch (error) {
        console.error('Chat API error:', error);

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
            },
            { status: 500 }
        );
    }
}; 