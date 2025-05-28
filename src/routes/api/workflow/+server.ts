import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { WorkflowEngine, type WorkflowState, type AnswerValue } from '$lib/workflow';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { action, questionId, answer, currentState } = await request.json();
    
    // Cria ou restaura o engine do workflow
    const engine = new WorkflowEngine(currentState);
    
    let newState: WorkflowState;
    
    switch (action) {
      case 'answer':
        if (!questionId || !answer) {
          return json({ error: 'Missing questionId or answer' }, { status: 400 });
        }
        newState = engine.answerQuestion(questionId, answer as AnswerValue);
        break;
        
      case 'restart':
        newState = engine.restart();
        break;
        
      case 'back':
        newState = engine.goBack();
        break;
        
      case 'getState':
      default:
        newState = engine.getState();
        break;
    }
    
    return json({
      success: true,
      state: newState,
      currentQuestion: engine.getCurrentQuestion(),
      canGoBack: engine.canGoBack()
    });
    
  } catch (error) {
    console.error('Workflow API error:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}; 