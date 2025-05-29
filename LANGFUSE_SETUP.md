# Langfuse Integration Setup

This document explains how to configure and use Langfuse for comprehensive observability and tracing in your LLM Training Helper application.

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Langfuse Configuration
LANGFUSE_SECRET_KEY=sk-lf-your-secret-key-here
LANGFUSE_PUBLIC_KEY=pk-lf-your-public-key-here
LANGFUSE_BASE_URL=https://cloud.langfuse.com  # Use https://us.cloud.langfuse.com for US region

# OpenAI Configuration (already configured)
OPENAI_API_KEY=sk-your-openai-key-here
```

## Getting Langfuse Credentials

1. Visit [Langfuse Cloud](https://cloud.langfuse.com) or [US region](https://us.cloud.langfuse.com)
2. Create an account or sign in
3. Create a new project
4. Go to Settings → API Keys
5. Copy your Public Key and Secret Key
6. Add them to your `.env` file

## Features Integrated

### 1. Comprehensive Tracing
- **LangChain Callbacks**: Automatic tracing of all LangChain operations
- **LangGraph Agent Monitoring**: Full visibility into agent tool usage and decision making
- **Request Metadata**: Captures user agent, IP, language, conversation turns
- **Session Management**: Tracks user sessions across interactions

### 2. Detailed Metadata Capture
Each trace includes:
- **Request Information**: Timestamp, IP, user agent, referer
- **Language Settings**: User's selected language (EN/PT)
- **Message Analytics**: Word count, message length, response length
- **Agent Information**: Model used, temperature, available tools
- **System Context**: Endpoint type, conversation turn number

### 3. Error Tracking
- **Error Logging**: Comprehensive error capture with context
- **Serverless Support**: Proper event flushing for serverless environments
- **Graceful Degradation**: System continues working even if tracing fails

### 4. Agent-Specific Monitoring

#### Main Chat Service
- Tracks general LLM training help conversations
- Monitors system prompt usage and effectiveness
- Captures conversation flow and user engagement

#### RAG Agent
- Monitors RAG tool usage (`rag_search`, `vector_embedding`)
- Tracks retrieval effectiveness and context relevance
- Captures vector search patterns and document access

#### Alternative Approaches Agent
- Monitors Few-Shot Learning and Chain of Thought tool usage
- Tracks prompt engineering effectiveness
- Captures learning pattern demonstrations

## Using the Tracing Features

### 1. Automatic Tracing
All endpoints now automatically trace interactions with comprehensive metadata:

```typescript
// All these are automatically traced
POST /api/chat
POST /api/toy-examples/rag
POST /api/toy-examples/alternative-approaches
```

### 2. Session Management
Each interaction gets a session ID for tracking:
```json
{
  "message": "Your question",
  "sessionId": "optional-custom-session-id",
  "userId": "optional-user-id",
  "language": "en"
}
```

### 3. Enhanced Response Metadata
Responses now include rich metadata:
```json
{
  "response": "AI response",
  "sessionId": "generated-session-id",
  "metadata": {
    "language": "en",
    "timestamp": "2024-01-01T12:00:00Z",
    "messageLength": 25,
    "responseLength": 150,
    "agentType": "RAG",
    "toolsAvailable": ["rag_search", "vector_embedding"]
  }
}
```

## Data Captured

### Per Request
- Request timestamp and metadata
- User agent, IP address, referer
- Message content and statistics
- Language preferences
- Session and user identification

### Per Response
- Response content and statistics
- Processing time and token usage
- Tool usage patterns (for agents)
- Error rates and types
- Model performance metrics

### Per Session
- Conversation flow and length
- User engagement patterns
- Feature usage (chat vs specialized agents)
- Language preference consistency
- Error patterns and recovery

## Analytics and Insights

### Available in Langfuse Dashboard

1. **Usage Analytics**
   - Daily/weekly/monthly usage patterns
   - Popular features and endpoints
   - User engagement metrics
   - Language distribution

2. **Performance Monitoring**
   - Response times by endpoint
   - Error rates and types
   - Model performance metrics
   - Tool usage effectiveness

3. **Conversation Analysis**
   - Session lengths and patterns
   - Most common questions/topics
   - Agent effectiveness comparison
   - User satisfaction indicators

4. **Cost Tracking**
   - Token usage by endpoint
   - Cost per interaction
   - Usage trends and forecasting
   - Resource optimization opportunities

## Best Practices

### 1. Session Management
- Use consistent session IDs for related conversations
- Include user IDs when available for better analytics
- Track language preferences across sessions

### 2. Error Handling
- All endpoints include proper error tracing
- Errors are logged with context for debugging
- Graceful degradation ensures system reliability

### 3. Privacy and Security
- User IDs and session IDs can be anonymized
- Sensitive data can be masked in traces
- GDPR compliance through data retention policies

### 4. Performance
- Events are queued and batched for efficiency
- Proper flushing ensures data integrity
- Minimal performance impact on requests

## Development vs Production

### Development Environment
- Detailed logging and tracing enabled
- All metadata captured for debugging
- Immediate event flushing for testing

### Production Environment
- Optimized batching and queueing
- Selective metadata capture
- Performance-optimized tracing

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**
   ```
   Error: Langfuse credentials not configured
   Solution: Add LANGFUSE_SECRET_KEY and LANGFUSE_PUBLIC_KEY to .env
   ```

2. **Network Connection Issues**
   ```
   Error: Cannot connect to Langfuse
   Solution: Check LANGFUSE_BASE_URL and network connectivity
   ```

3. **Events Not Appearing**
   ```
   Issue: Traces not showing in dashboard
   Solution: Ensure proper flushing in serverless environments
   ```

### Debug Mode
Set debug logging to troubleshoot tracing issues:
```env
LANGFUSE_DEBUG=true
```

## Advanced Features

### Custom Scoring
Add custom scores to traces for evaluation:
```typescript
await tracingService.addScore(traceId, 'user-satisfaction', 4, 'Very helpful response');
```

### Dataset Creation
Create datasets for evaluation and training:
```typescript
await tracingService.createDatasetItem('conversation-samples', input, expectedOutput);
```

### Manual Spans
Add custom spans for detailed tracking:
```typescript
const span = tracingService.createSpan(trace, 'custom-operation', metadata);
```

## Integration with Other Tools

- **LangSmith**: Can run alongside for comparison
- **PostHog**: Integration available for product analytics
- **Custom Dashboards**: API available for custom visualizations
- **Jupyter Notebooks**: Data export for analysis and research 