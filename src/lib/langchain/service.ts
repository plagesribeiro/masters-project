import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, AIMessage, BaseMessage } from '@langchain/core/messages';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { LangfuseTracingService, type TracingConfig } from './tracing.js';

export interface ChatMessage {
    text: string;
    isUser: boolean;
}

export interface ChatRequest {
    message: string;
    history?: ChatMessage[];
    language?: string;
}

export interface ChatResponse {
    response: string;
    traceId?: string;
}

export class LangChainChatService {
    private model: ChatOpenAI;
    private outputParser: StringOutputParser;
    private tracingService: LangfuseTracingService;

    constructor(apiKey: string) {
        this.model = new ChatOpenAI({
            model: 'gpt-4o',
            temperature: 0.7,
            maxTokens: 1000,
            openAIApiKey: apiKey,
        });
        
        this.outputParser = new StringOutputParser();
        this.tracingService = LangfuseTracingService.getInstance();
    }

    /**
     * Convert chat history to LangChain messages format
     */
    private convertHistoryToMessages(history: ChatMessage[]): BaseMessage[] {
        return history.map(msg => 
            msg.isUser 
                ? new HumanMessage(msg.text)
                : new AIMessage(msg.text)
        );
    }

    /**
     * Generate a chat response using LangChain with comprehensive tracing
     */
    async generateResponse(
        systemPrompt: string,
        userMessage: string,
        history: ChatMessage[] = [],
        tracingConfig: TracingConfig = {}
    ): Promise<string> {
        // Create comprehensive tracing configuration
        const enhancedConfig: TracingConfig = {
            ...tracingConfig,
            endpoint: tracingConfig.endpoint || 'chat',
            metadata: {
                ...tracingConfig.metadata,
                systemPromptLength: systemPrompt.length,
                userMessageLength: userMessage.length,
                historyLength: history.length,
                modelName: 'gpt-4o',
                temperature: 0.7,
                maxTokens: 1000,
            },
        };

        // Create Langfuse callback handler
        const langfuseHandler = this.tracingService.createCallbackHandler(enhancedConfig);

        try {
            // Create prompt template
            const prompt = ChatPromptTemplate.fromMessages([
                ["system", systemPrompt],
                ["placeholder", "{history}"],
                ["human", "{input}"]
            ]);

            // Convert history to LangChain messages
            const historyMessages = this.convertHistoryToMessages(history.slice(-10)); // Last 10 messages

            // Create the chain
            const chain = prompt.pipe(this.model).pipe(this.outputParser);

            // Invoke the chain with tracing
            const response = await chain.invoke(
                {
                    history: historyMessages,
                    input: userMessage
                },
                {
                    callbacks: [langfuseHandler],
                    runName: `chat-${enhancedConfig.language || 'en'}`,
                    metadata: enhancedConfig.metadata,
                }
            );

            // Flush events for serverless environments
            await this.tracingService.flush();

            return response;

        } catch (error) {
            // Log error with tracing
            console.error('LangChain service error:', error);
            
            // Flush events even on error
            await this.tracingService.flush();
            
            throw error;
        }
    }

    /**
     * Shutdown the service and flush all pending traces
     */
    async shutdown(): Promise<void> {
        await this.tracingService.shutdown();
    }
} 