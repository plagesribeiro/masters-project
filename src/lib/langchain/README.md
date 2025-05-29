# LangChain Integration

This directory contains the LangChain and LangGraph integration for the LLM Training Helper application.

## Architecture

### Core Components

1. **LangChainChatService** (`service.ts`)
   - Basic chat functionality using LangChain
   - Handles conversation history and message formatting
   - Uses OpenAI's GPT-4o model

2. **Specialized Agents** (`agents.ts`)
   - **RAGAgent**: Specialized for Retrieval-Augmented Generation topics
     - Tools: `rag_search`, `vector_embedding`
     - Features: Document search simulation, embedding generation
   
   - **AlternativeApproachesAgent**: Specialized for alternative training approaches
     - Tools: `few_shot_learning`, `chain_of_thought`
     - Features: Few-shot learning demos, CoT reasoning

### Key Features

- **Memory Persistence**: Uses `MemorySaver` for conversation memory across requests
- **Tool Integration**: Custom tools for specialized functionality
- **Bilingual Support**: Maintains existing English/Portuguese language support
- **Type Safety**: Full TypeScript implementation with proper type definitions

## Usage

### Basic Chat Service

```typescript
import { LangChainChatService } from '$lib/langchain';

const chatService = new LangChainChatService(apiKey);
const response = await chatService.generateResponse(
    systemPrompt,
    userMessage,
    conversationHistory
);
```

### RAG Agent

```typescript
import { RAGAgent } from '$lib/langchain';

const ragAgent = new RAGAgent(apiKey, systemPrompt);
const response = await ragAgent.generateResponse(
    message,
    history,
    threadId
);
```

### Alternative Approaches Agent

```typescript
import { AlternativeApproachesAgent } from '$lib/langchain';

const altAgent = new AlternativeApproachesAgent(apiKey, systemPrompt);
const response = await altAgent.generateResponse(
    message,
    history,
    threadId
);
```

## Dependencies

- `@langchain/core`: Core LangChain functionality
- `@langchain/langgraph`: Graph-based agent orchestration
- `@langchain/openai`: OpenAI model integration
- `@langchain/community`: Community tools and integrations
- `zod`: Schema validation for tool parameters

## Migration Benefits

1. **Better Tool Integration**: Agents can use specialized tools based on context
2. **Memory Management**: Persistent conversation memory across requests
3. **Modular Architecture**: Separated concerns for different use cases
4. **Enhanced Debugging**: Better observability with LangSmith integration potential
5. **Extensibility**: Easy to add new tools and agents as needed

## Future Enhancements

- Integrate with vector databases for real RAG functionality
- Add more specialized tools for each domain
- Implement streaming responses
- Add LangSmith tracing for debugging
- Create custom tools for specific training methodologies 