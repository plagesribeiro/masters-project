import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const OPENAI_API_KEY = env.OPENAI_API_KEY;

        if (!OPENAI_API_KEY) {
            throw new Error('OpenAI API key not configured');
        }

        const formData = await request.formData();
        const audioFile = formData.get('audio');

        if (!audioFile || !(audioFile instanceof File)) {
            return json({ error: 'Audio file is required' }, { status: 400 });
        }

        // Create FormData for OpenAI API
        const openaiFormData = new FormData();
        openaiFormData.append('file', audioFile);
        openaiFormData.append('model', 'whisper-1');
        openaiFormData.append('language', 'pt'); // Portuguese
        openaiFormData.append('response_format', 'json');

        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: openaiFormData
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('OpenAI Transcription API error:', errorData);
            throw new Error(`OpenAI Transcription API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.text) {
            throw new Error('Invalid response from OpenAI Transcription API');
        }

        return json({
            text: data.text.trim()
        });

    } catch (error) {
        console.error('Transcription API error:', error);

        return json(
            {
                error: 'Erro ao transcrever áudio. Tente novamente em alguns instantes.',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
} 