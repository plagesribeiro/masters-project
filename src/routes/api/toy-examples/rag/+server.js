import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    let language = 'en'; // Default language

    try {
        const OPENAI_API_KEY = env.OPENAI_API_KEY;

        if (!OPENAI_API_KEY) {
            throw new Error('OpenAI API key not configured');
        }

        const requestData = await request.json();
        const { message, history } = requestData;
        language = requestData.language || 'en'; // Update language from request

        if (!message || typeof message !== 'string') {
            return json({ error: 'Message is required' }, { status: 400 });
        }

        // Simple system prompt for RAG Implementation
        const systemPrompt = language === 'en'
            ? 'You are an AI assistant specialized in RAG (Retrieval-Augmented Generation) implementation. You help users understand and implement techniques like Vector Embeddings, Semantic Search, Document Indexing, and context retrieval for enhanced AI responses. Provide clear, practical guidance on RAG architecture and implementation strategies.'
            : 'Você é um assistente de IA especializado em implementação de RAG (Retrieval-Augmented Generation). Você ajuda usuários a entender e implementar técnicas como Vector Embeddings, Busca Semântica, Indexação de Documentos e recuperação de contexto para respostas de IA aprimoradas. Forneça orientações claras e práticas sobre arquitetura e estratégias de implementação de RAG.';

        // Prepare conversation history for context
        const messages = [
            { role: 'system', content: systemPrompt }
        ];

        // Add recent history for context (last 10 messages)
        if (history && Array.isArray(history)) {
            const recentHistory = history.slice(-10);
            for (const msg of recentHistory) {
                if (msg.text && typeof msg.text === 'string') {
                    messages.push({
                        role: msg.isUser ? 'user' : 'assistant',
                        content: msg.text
                    });
                }
            }
        }

        // Add current message
        messages.push({ role: 'user', content: message });

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: messages,
                max_tokens: 1000,
                temperature: 0.7,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('OpenAI API error:', errorData);
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Invalid response from OpenAI API');
        }

        return json({
            response: data.choices[0].message.content.trim()
        });

    } catch (error) {
        console.error('RAG API error:', error);

        // Get error message based on language
        const errorMessage = language === 'en'
            ? 'Internal server error. Please try again in a few moments.'
            : 'Erro interno do servidor. Tente novamente em alguns instantes.';

        return json(
            {
                error: errorMessage,
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
} 