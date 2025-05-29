import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import { MemorySaver } from '@langchain/langgraph';
import { CallbackHandler } from 'langfuse-langchain';
import { LangfuseTracingService, type TracingConfig } from './tracing.js';
import type { ChatMessage } from './service.js';

// Enhanced RAG-specific tools with tracing
const ragSearchTool = tool(async ({ query, context }) => {
    // This is a mock implementation - in a real scenario, you'd integrate with
    // vector databases, embeddings, etc.
    const result = `Based on the context about ${context}, here's relevant information for "${query}": This tool would normally search through indexed documents and return relevant chunks for RAG implementation.`;
    
    // Log tool usage for analytics
    console.log(`RAG Search Tool Used - Query: ${query}, Context: ${context}`);
    
    return result;
}, {
    name: 'rag_search',
    description: 'Search through indexed documents for RAG implementation.',
    schema: z.object({
        query: z.string().describe('The search query'),
        context: z.string().describe('The context or domain to search within')
    }),
});

const vectorEmbeddingTool = tool(async ({ text }) => {
    // Mock embedding tool
    const result = `Vector embedding generated for: "${text}". In a real implementation, this would return actual embeddings.`;
    
    // Log tool usage for analytics
    console.log(`Vector Embedding Tool Used - Text length: ${text.length}`);
    
    return result;
}, {
    name: 'vector_embedding',
    description: 'Generate vector embeddings for text.',
    schema: z.object({
        text: z.string().describe('Text to generate embeddings for')
    }),
});

// Enhanced Alternative Approaches tools with tracing
const fewShotTool = tool(async ({ task, examples }) => {
    const result = `Few-shot learning approach for "${task}" with ${examples} examples. This demonstrates how to structure few-shot prompts effectively.`;
    
    // Log tool usage for analytics
    console.log(`Few-Shot Learning Tool Used - Task: ${task}, Examples: ${examples}`);
    
    return result;
}, {
    name: 'few_shot_learning',
    description: 'Implement few-shot learning techniques.',
    schema: z.object({
        task: z.string().describe('The task to demonstrate'),
        examples: z.string().describe('Number of examples to use')
    }),
});

const chainOfThoughtTool = tool(async ({ problem }) => {
    const result = `Chain of Thought reasoning for: "${problem}". Step 1: Understand the problem. Step 2: Break down into smaller parts. Step 3: Solve systematically.`;
    
    // Log tool usage for analytics
    console.log(`Chain of Thought Tool Used - Problem: ${problem}`);
    
    return result;
}, {
    name: 'chain_of_thought',
    description: 'Apply chain of thought reasoning.',
    schema: z.object({
        problem: z.string().describe('The problem to solve using CoT')
    }),
});

export class RAGAgent {
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

        // Create RAG agent with specialized tools
        this.agent = createReactAgent({
            llm: model,
            tools: [ragSearchTool, vectorEmbeddingTool],
            checkpointSaver: this.checkpointer,
        });
    }

    async generateResponse(
        message: string, 
        history: ChatMessage[] = [], 
        threadId: string = 'default',
        tracingConfig: TracingConfig = {}
    ): Promise<string> {
        // Create comprehensive tracing configuration
        const enhancedConfig: TracingConfig = {
            ...tracingConfig,
            endpoint: 'rag-agent',
            metadata: {
                ...tracingConfig.metadata,
                agentType: 'RAG',
                threadId,
                messageLength: message.length,
                historyLength: history.length,
                systemPromptLength: this.systemPrompt.length,
                availableTools: ['rag_search', 'vector_embedding'],
                modelName: 'gpt-4o',
                temperature: 0.7,
            },
        };

        // Create Langfuse callback handler
        const langfuseHandler = this.tracingService.createCallbackHandler(enhancedConfig);

        try {
            // Convert history to LangChain messages, starting with system message
            const messages = [new SystemMessage(this.systemPrompt)];
            
            // Add conversation history
            for (const msg of history.slice(-10)) { // Last 10 messages
                messages.push(msg.isUser ? new HumanMessage(msg.text) : new AIMessage(msg.text));
            }
            
            // Add current message
            messages.push(new HumanMessage(message));

            const result = await this.agent.invoke(
                { messages },
                { 
                    configurable: { thread_id: threadId },
                    callbacks: [langfuseHandler],
                    runName: `rag-agent-${enhancedConfig.language || 'en'}`,
                    metadata: enhancedConfig.metadata,
                }
            );

            // Flush events for serverless environments
            await this.tracingService.flush();

            return result.messages[result.messages.length - 1].content;

        } catch (error) {
            // Log error with tracing
            console.error('RAG Agent error:', error);
            
            // Flush events even on error
            await this.tracingService.flush();
            
            throw error;
        }
    }
}

export class AlternativeApproachesAgent {
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

        // Create Alternative Approaches agent with specialized tools
        this.agent = createReactAgent({
            llm: model,
            tools: [fewShotTool, chainOfThoughtTool],
            checkpointSaver: this.checkpointer,
        });
    }

    async generateResponse(
        message: string, 
        history: ChatMessage[] = [], 
        threadId: string = 'default',
        tracingConfig: TracingConfig = {}
    ): Promise<string> {
        // Create comprehensive tracing configuration
        const enhancedConfig: TracingConfig = {
            ...tracingConfig,
            endpoint: 'alternative-approaches-agent',
            metadata: {
                ...tracingConfig.metadata,
                agentType: 'AlternativeApproaches',
                threadId,
                messageLength: message.length,
                historyLength: history.length,
                systemPromptLength: this.systemPrompt.length,
                availableTools: ['few_shot_learning', 'chain_of_thought'],
                modelName: 'gpt-4o',
                temperature: 0.7,
            },
        };

        // Create Langfuse callback handler
        const langfuseHandler = this.tracingService.createCallbackHandler(enhancedConfig);

        try {
            // Convert history to LangChain messages, starting with system message
            const messages = [new SystemMessage(this.systemPrompt)];
            
            // Add conversation history
            for (const msg of history.slice(-10)) { // Last 10 messages
                messages.push(msg.isUser ? new HumanMessage(msg.text) : new AIMessage(msg.text));
            }
            
            // Add current message
            messages.push(new HumanMessage(message));

            const result = await this.agent.invoke(
                { messages },
                { 
                    configurable: { thread_id: threadId },
                    callbacks: [langfuseHandler],
                    runName: `alt-approaches-agent-${enhancedConfig.language || 'en'}`,
                    metadata: enhancedConfig.metadata,
                }
            );

            // Flush events for serverless environments
            await this.tracingService.flush();

            return result.messages[result.messages.length - 1].content;

        } catch (error) {
            // Log error with tracing
            console.error('Alternative Approaches Agent error:', error);
            
            // Flush events even on error
            await this.tracingService.flush();
            
            throw error;
        }
    }
} 