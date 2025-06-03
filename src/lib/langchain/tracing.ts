import { CallbackHandler, Langfuse } from 'langfuse-langchain';
import { env } from '$env/dynamic/private';
import type { BaseMessage } from '@langchain/core/messages';

// Tracing configuration interface
export interface TracingConfig {
    sessionId?: string;
    userId?: string;
    language?: string;
    endpoint?: string;
    metadata?: Record<string, any>;
}

// Enhanced tracing service for Langfuse integration
export class LangfuseTracingService {
    private langfuse: Langfuse;
    private static instance: LangfuseTracingService;

    private constructor() {
        // Initialize Langfuse with environment variables or default values
        this.langfuse = new Langfuse({
            secretKey: env.LANGFUSE_SECRET_KEY,
            publicKey: env.LANGFUSE_PUBLIC_KEY,
            baseUrl: env.LANGFUSE_BASE_URL || 'https://cloud.langfuse.com',
        });
    }

    // Singleton pattern to ensure single instance
    public static getInstance(): LangfuseTracingService {
        if (!LangfuseTracingService.instance) {
            LangfuseTracingService.instance = new LangfuseTracingService();
        }
        return LangfuseTracingService.instance;
    }

    /**
     * Extract clean text content from LangChain messages
     */
    private extractMessageContent(message: any): string {
        if (typeof message === 'string') {
            return message;
        }
        
        if (message && typeof message === 'object') {
            // Handle LangChain message objects
            if (message.content) {
                return typeof message.content === 'string' ? message.content : JSON.stringify(message.content);
            }
            
            // Handle message with text property
            if (message.text) {
                return message.text;
            }
            
            // Handle tool calls and complex structures
            if (message.additional_kwargs?.tool_calls) {
                const toolCalls = message.additional_kwargs.tool_calls;
                return `Tool calls: ${toolCalls.map((call: any) => 
                    `${call.function?.name}(${call.function?.arguments || ''})`
                ).join(', ')}`;
            }
        }
        
        return JSON.stringify(message);
    }

    /**
     * Format messages array for better visibility
     */
    private formatMessagesForTracing(messages: any[]): { 
        formattedInput: string, 
        messageCount: number, 
        messageTypes: string[] 
    } {
        if (!Array.isArray(messages)) {
            return {
                formattedInput: this.extractMessageContent(messages),
                messageCount: 1,
                messageTypes: [typeof messages]
            };
        }

        const messageTypes: string[] = [];
        const formattedMessages = messages.map((msg, index) => {
            const messageType = msg.constructor?.name || typeof msg;
            messageTypes.push(messageType);
            
            const content = this.extractMessageContent(msg);
            return `[${messageType}]: ${content}`;
        });

        return {
            formattedInput: formattedMessages.join('\n\n'),
            messageCount: messages.length,
            messageTypes: messageTypes
        };
    }

    /**
     * Create a basic LangChain callback handler (for compatibility)
     */
    public createCallbackHandler(config: TracingConfig = {}): CallbackHandler {
        const { sessionId, userId, language, endpoint, metadata = {} } = config;

        // Create basic metadata
        const traceMetadata = {
            ...metadata,
            endpoint: endpoint || 'unknown',
            language: language || 'en',
            timestamp: new Date().toISOString(),
            environment: 'development',
        };

        // Create minimal callback handler
        const callbackHandler = new CallbackHandler({
            secretKey: env.LANGFUSE_SECRET_KEY,
            publicKey: env.LANGFUSE_PUBLIC_KEY,
            baseUrl: env.LANGFUSE_BASE_URL || 'https://cloud.langfuse.com',
            metadata: traceMetadata,
            sessionId: sessionId,
            userId: userId,
        });

        return callbackHandler;
    }

    /**
     * Create a clean conversation tracer that logs only essential data
     */
    public createCleanConversationTracer(config: TracingConfig = {}) {
        const { sessionId, userId, endpoint = 'chat', language, metadata = {} } = config;

        // Create a manual trace for clean logging
        const trace = this.langfuse.trace({
            sessionId,
            userId,
            name: `${endpoint}-conversation`,
            metadata: {
                ...metadata,
                endpoint,
                language: language || 'pt',
                timestamp: new Date().toISOString(),
            },
        });

        let toolsUsed: string[] = [];

        return {
            // Log clean conversation turn with just input/output text
            logConversation: async (userInput: string, aiOutput: string, metadata: Record<string, any> = {}) => {
                await trace.generation({
                    name: `${endpoint}-turn`,
                    input: userInput,
                    output: aiOutput,
                    metadata: {
                        ...metadata,
                        inputLength: userInput.length,
                        outputLength: aiOutput.length,
                        timestamp: new Date().toISOString(),
                        sessionId,
                        userId,
                        language: language || 'pt',
                        toolsUsed: toolsUsed.length > 0 ? toolsUsed.join(', ') : 'none',
                    },
                });

                // Reset tools for next conversation
                toolsUsed = [];
            },

            // Log tool usage manually
            logToolUsage: (toolName: string, input: string, output: string) => {
                if (!toolsUsed.includes(toolName)) {
                    toolsUsed.push(toolName);
                }
                
                // Create a span for the tool usage
                trace.span({
                    name: `tool-${toolName}`,
                    input: input,
                    output: output,
                    metadata: {
                        toolName,
                        timestamp: new Date().toISOString(),
                    },
                });
            },

            // Log error
            logError: async (userInput: string, error: string, metadata: Record<string, any> = {}) => {
                await trace.generation({
                    name: `${endpoint}-error`,
                    input: userInput,
                    output: `Error: ${error}`,
                    metadata: {
                        ...metadata,
                        isError: true,
                        timestamp: new Date().toISOString(),
                        sessionId,
                        userId,
                        toolsUsed: toolsUsed.length > 0 ? toolsUsed.join(', ') : 'none',
                    },
                });
            },

            // Get the basic callback handler for LangChain compatibility
            getCallbackHandler: () => this.createCallbackHandler(config),
        };
    }

    /**
     * Enhanced callback handler with custom tracing for conversations
     */
    public createConversationCallbackHandler(config: TracingConfig = {}) {
        const baseHandler = this.createCallbackHandler(config);
        const { sessionId, userId, endpoint = 'chat' } = config;

        // Create a trace for this conversation
        const trace = this.createTrace(config);

        return {
            handler: baseHandler,
            trace: trace,
            
            // Helper to log formatted messages
            logConversationTurn: async (input: any, output: any, metadata: Record<string, any> = {}) => {
                const formattedInput = this.extractMessageContent(input);
                const formattedOutput = this.extractMessageContent(output);

                await trace.generation({
                    name: `${endpoint}-turn`,
                    input: formattedInput,
                    output: formattedOutput,
                    metadata: {
                        ...metadata,
                        inputLength: formattedInput.length,
                        outputLength: formattedOutput.length,
                        timestamp: new Date().toISOString(),
                        sessionId: sessionId,
                        userId: userId,
                    },
                });
            },

            // Helper to log tool usage
            logToolUsage: async (toolName: string, input: any, output: any, metadata: Record<string, any> = {}) => {
                const formattedInput = this.extractMessageContent(input);
                const formattedOutput = this.extractMessageContent(output);

                await trace.span({
                    name: `tool-${toolName}`,
                    input: formattedInput,
                    output: formattedOutput,
                    metadata: {
                        ...metadata,
                        toolName,
                        inputLength: formattedInput.length,
                        outputLength: formattedOutput.length,
                        timestamp: new Date().toISOString(),
                    },
                });
            },
        };
    }

    /**
     * Create a traced execution context for manual tracing with enhanced formatting
     */
    public createTrace(config: TracingConfig = {}) {
        const { sessionId, userId, language, endpoint, metadata = {} } = config;

        const traceMetadata = {
            ...metadata,
            endpoint: endpoint || 'unknown',
            language: language || 'en',
            timestamp: new Date().toISOString(),
            environment: 'development',
        };

        return this.langfuse.trace({
            sessionId,
            userId,
            metadata: traceMetadata,
            name: `${endpoint || 'chat'}-interaction`,
        });
    }

    /**
     * Create a generation with formatted input/output
     */
    public async createGeneration(config: {
        traceId?: string;
        name: string;
        input: any;
        output: any;
        model?: string;
        metadata?: Record<string, any>;
    }) {
        const { traceId, name, input, output, model, metadata = {} } = config;

        const formattedInput = typeof input === 'string' ? input : this.extractMessageContent(input);
        const formattedOutput = typeof output === 'string' ? output : this.extractMessageContent(output);

        return await this.langfuse.generation({
            traceId,
            name,
            input: formattedInput,
            output: formattedOutput,
            model,
            metadata: {
                ...metadata,
                inputLength: formattedInput.length,
                outputLength: formattedOutput.length,
                timestamp: new Date().toISOString(),
            },
        });
    }

    /**
     * Add score/feedback to a trace
     */
    public async addScore(traceId: string, name: string, value: number, comment?: string) {
        await this.langfuse.score({
            traceId,
            name,
            value,
            comment,
        });
    }

    /**
     * Add user feedback to a trace
     */
    public async addUserFeedback(traceId: string, rating: number, comment?: string) {
        await this.langfuse.score({
            traceId,
            name: 'user-feedback',
            value: rating,
            comment,
        });
    }

    /**
     * Create a span within a trace for detailed tracking with better formatting
     */
    public createSpan(trace: any, name: string, metadata: Record<string, any> = {}) {
        return trace.span({
            name,
            metadata: {
                ...metadata,
                timestamp: new Date().toISOString(),
                spanType: 'custom',
            },
        });
    }

    /**
     * Flush all pending events (important for serverless)
     */
    public async flush(): Promise<void> {
        await this.langfuse.flushAsync();
    }

    /**
     * Shutdown the tracing service
     */
    public async shutdown(): Promise<void> {
        await this.langfuse.shutdownAsync();
    }

    /**
     * Create dataset entry for evaluation with formatted content
     */
    public async createDatasetItem(
        datasetName: string,
        input: any,
        expectedOutput?: any,
        metadata?: Record<string, any>
    ) {
        const formattedInput = this.extractMessageContent(input);
        const formattedExpectedOutput = expectedOutput ? this.extractMessageContent(expectedOutput) : undefined;

        return await this.langfuse.createDatasetItem({
            datasetName,
            input: formattedInput,
            expectedOutput: formattedExpectedOutput,
            metadata: {
                ...metadata,
                createdAt: new Date().toISOString(),
                inputLength: formattedInput.length,
                expectedOutputLength: formattedExpectedOutput?.length || 0,
            },
        });
    }

    /**
     * Generate session ID based on user interaction
     */
    public static generateSessionId(userId?: string, endpoint?: string): string {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return `${endpoint || 'session'}-${userId || 'anonymous'}-${timestamp}-${random}`;
    }

    /**
     * Extract user information from request headers
     */
    public static extractUserInfo(request: Request): { userId?: string; sessionId?: string } {
        // You can customize this based on your authentication system
        const userId = request.headers.get('x-user-id') || undefined;
        const sessionId = request.headers.get('x-session-id') || undefined;
        
        return { userId, sessionId };
    }
} 