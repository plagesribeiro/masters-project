import { WorkflowEngine } from './workflow';

// Teste simples da lógica do workflow
function testWorkflow() {
  console.log('Testing Workflow Logic...');
  
  const engine = new WorkflowEngine();
  
  // Teste 1: Dataset pequeno + Recursos limitados -> Efficient Fine-tuning
  console.log('\n--- Teste 1: Dataset pequeno + Recursos limitados ---');
  engine.answerQuestion('q1', 'option-a'); // Dataset pequeno
  engine.answerQuestion('q2', 'option-a'); // Recursos limitados
  engine.answerQuestion('q3', 'option-a'); // Fine-tuning
  let state = engine.answerQuestion('q4', 'option-b'); // Abordagem equilibrada
  console.log('Complete:', state.isComplete);
  console.log('Results:', state.results);
  console.log('Expected: ["efficientFinetuning"]');
  
  // Reinicia para próximo teste
  engine.restart();
  
  // Teste 2: Dataset grande + Recursos extensos -> Distributed Training
  console.log('\n--- Teste 2: Dataset grande + Recursos extensos ---');
  engine.answerQuestion('q1', 'option-c'); // Dataset grande
  engine.answerQuestion('q2', 'option-c'); // Recursos extensos
  engine.answerQuestion('q3', 'option-b'); // Pré-treinamento
  state = engine.answerQuestion('q4', 'option-c'); // Qualidade máxima
  console.log('Complete:', state.isComplete);
  console.log('Results:', state.results);
  console.log('Expected: ["distributedTraining"]');
  
  // Reinicia para próximo teste
  engine.restart();
  
  // Teste 3: Adaptação de domínio -> Domain Adaptation
  console.log('\n--- Teste 3: Adaptação de domínio ---');
  engine.answerQuestion('q1', 'option-b'); // Dataset médio
  engine.answerQuestion('q2', 'option-b'); // Recursos moderados
  engine.answerQuestion('q3', 'option-c'); // Adaptação de domínio
  state = engine.answerQuestion('q4', 'option-b'); // Abordagem equilibrada
  console.log('Complete:', state.isComplete);
  console.log('Results:', state.results);
  console.log('Expected: ["domainAdaptation"]');
  
  // Reinicia para próximo teste
  engine.restart();
  
  // Teste 4: Abordagem híbrida
  console.log('\n--- Teste 4: Abordagem híbrida ---');
  engine.answerQuestion('q1', 'option-b'); // Dataset médio
  engine.answerQuestion('q2', 'option-b'); // Recursos moderados
  engine.answerQuestion('q3', 'option-a'); // Fine-tuning
  state = engine.answerQuestion('q4', 'option-b'); // Abordagem equilibrada
  console.log('Complete:', state.isComplete);
  console.log('Results:', state.results);
  console.log('Expected: ["hybridApproach"]');
  
  console.log('\nTodos os testes concluídos!');
}

// Executa os testes se este arquivo for executado diretamente
if (typeof window === 'undefined') {
  testWorkflow();
} 