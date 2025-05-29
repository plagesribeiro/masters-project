import { CallbackHandler, Langfuse } from 'langfuse-langchain';
import { env } from '$env/dynamic/private';

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
     * Create a LangChain callback handler with comprehensive tracing
     */
    public createCallbackHandler(config: TracingConfig = {}): CallbackHandler {
        const { sessionId, userId, language, endpoint, metadata = {} } = config;

        // Generate unique trace ID for this interaction
        const traceId = `${endpoint || 'chat'}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Create comprehensive metadata
        const traceMetadata = {
            ...metadata,
            endpoint: endpoint || 'unknown',
            language: language || 'en',
            timestamp: new Date().toISOString(),
            userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Server',
            environment: 'development', // You can make this configurable
        };

        // Create callback handler with rich configuration
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
     * Create a traced execution context for manual tracing
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
     * Create a span within a trace for detailed tracking
     */
    public createSpan(trace: any, name: string, metadata: Record<string, any> = {}) {
        return trace.span({
            name,
            metadata: {
                ...metadata,
                timestamp: new Date().toISOString(),
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
     * Create dataset entry for evaluation
     */
    public async createDatasetItem(
        datasetName: string,
        input: any,
        expectedOutput?: any,
        metadata?: Record<string, any>
    ) {
        return await this.langfuse.createDatasetItem({
            datasetName,
            input,
            expectedOutput,
            metadata: {
                ...metadata,
                createdAt: new Date().toISOString(),
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