import { ENGLISH_PROMPT } from './english.js';
import { PORTUGUESE_PROMPT } from './portuguese.js';

export { ENGLISH_PROMPT, PORTUGUESE_PROMPT };

/**
 * Get the appropriate system prompt based on language
 * @param language - The language code ('en' or 'pt')
 * @returns The system prompt for the specified language
 */
export function getSystemPrompt(language: string = 'en'): string {
    switch (language) {
        case 'pt':
            return PORTUGUESE_PROMPT;
        case 'en':
        default:
            return ENGLISH_PROMPT;
    }
} 