import { WorkflowEngine } from './workflow';

// Teste simples da lógica do workflow
function testWorkflow() {
  console.log('Testing Workflow Logic...');
  
  const engine = new WorkflowEngine();
  
  // Teste 1: Pergunta 1 = Sim -> Resultado 1
  console.log('\n--- Teste 1: Q1=Sim ---');
  let state = engine.answerQuestion('q1', 'yes');
  console.log('Complete:', state.isComplete);
  console.log('Results:', state.results);
  console.log('Expected: ["result1"]');
  
  // Reinicia para próximo teste
  engine.restart();
  
  // Teste 2: Q1=Não, Q2=Eficiência, Q3=Sim -> Resultado 2
  console.log('\n--- Teste 2: Q1=Não, Q2=Eficiência, Q3=Sim ---');
  engine.answerQuestion('q1', 'no');
  engine.answerQuestion('q2', 'option-a');
  state = engine.answerQuestion('q3', 'yes');
  console.log('Complete:', state.isComplete);
  console.log('Results:', state.results);
  console.log('Expected: ["result2"]');
  
  // Reinicia para próximo teste
  engine.restart();
  
  // Teste 3: Q1=Não, Q2=Ambos, Q3=Sim, Q4=Sim -> Resultado Híbrido
  console.log('\n--- Teste 3: Q1=Não, Q2=Ambos, Q3=Sim, Q4=Sim ---');
  engine.answerQuestion('q1', 'no');
  engine.answerQuestion('q2', 'both');
  engine.answerQuestion('q3', 'yes');
  state = engine.answerQuestion('q4', 'yes');
  console.log('Complete:', state.isComplete);
  console.log('Results:', state.results);
  console.log('Expected: ["result2and3"]');
  
  console.log('\nTodos os testes concluídos!');
}

// Executa os testes se este arquivo for executado diretamente
if (typeof window === 'undefined') {
  testWorkflow();
} 