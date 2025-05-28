import { WorkflowEngine } from './workflow';

// Teste da lógica do workflow baseada na metodologia do artigo
function testWorkflow() {
  console.log('Testing Workflow Logic - Metodologia do Artigo...');
  
  // Teste 1: Dados podem ser inseridos no prompt -> Abordagens Intermediárias
  console.log('\n--- Teste 1: Dados podem ser inseridos no prompt ---');
  let engine = new WorkflowEngine();
  let state = engine.answerQuestion('q1', 'option-a'); // Não - dados podem ser inseridos no prompt
  console.log('Complete:', state.isComplete);
  console.log('Results:', state.results);
  console.log('Expected: ["intermediateApproaches"]');
  
  // Teste 2: Apenas contexto -> RAG viável -> RAG
  console.log('\n--- Teste 2: Apenas contexto -> RAG viável ---');
  engine = new WorkflowEngine();
  engine.answerQuestion('q1', 'option-b'); // Sim - volume inviabiliza prompt
  engine.answerQuestion('q2', 'option-a'); // Apenas fornecer informações como contexto
  engine.answerQuestion('q3', 'option-a'); // Sim - RAG é viável
  state = engine.answerQuestion('q5', 'option-a'); // Sim - latência aceitável
  console.log('Complete:', state.isComplete);
  console.log('Results:', state.results);
  console.log('Expected: ["rag"]');
  
  // Teste 3: Apenas comportamentos -> Fine-Tuning viável -> Fine-Tuning
  console.log('\n--- Teste 3: Apenas comportamentos -> Fine-Tuning viável ---');
  engine = new WorkflowEngine();
  engine.answerQuestion('q1', 'option-b'); // Sim - volume inviabiliza prompt
  engine.answerQuestion('q2', 'option-b'); // Ensinar novos comportamentos
  engine.answerQuestion('q4', 'option-a'); // Sim - dados adequados
  state = engine.answerQuestion('q6', 'option-a'); // Sim - recursos suficientes
  console.log('Complete:', state.isComplete);
  console.log('Results:', state.results);
  console.log('Expected: ["fineTuning"]');
  
  // Teste 4: Ambos -> RAG e Fine-Tuning viáveis -> Híbrido
  console.log('\n--- Teste 4: Ambos -> Abordagem Híbrida ---');
  engine = new WorkflowEngine();
  engine.answerQuestion('q1', 'option-b'); // Sim - volume inviabiliza prompt
  engine.answerQuestion('q2', 'option-c'); // Ambos - contexto e comportamentos
  engine.answerQuestion('q3', 'option-a'); // Sim - RAG é viável
  engine.answerQuestion('q5', 'option-a'); // Sim - latência aceitável
  engine.answerQuestion('q4', 'option-a'); // Sim - dados adequados
  state = engine.answerQuestion('q6', 'option-a'); // Sim - recursos suficientes
  console.log('Complete:', state.isComplete);
  console.log('Results:', state.results);
  console.log('Expected: ["hybridApproach"]');
  
  // Teste 5: RAG não viável -> volta para Abordagens Intermediárias
  console.log('\n--- Teste 5: RAG não viável -> Abordagens Intermediárias ---');
  engine = new WorkflowEngine();
  engine.answerQuestion('q1', 'option-b'); // Sim - volume inviabiliza prompt
  engine.answerQuestion('q2', 'option-a'); // Apenas fornecer informações como contexto
  state = engine.answerQuestion('q3', 'option-b'); // Não - RAG não é viável
  console.log('Complete:', state.isComplete);
  console.log('Results:', state.results);
  console.log('Expected: ["intermediateApproaches"]');
  
  // Teste 6: Fine-Tuning sem recursos -> Abordagens Intermediárias
  console.log('\n--- Teste 6: Fine-Tuning sem recursos -> Abordagens Intermediárias ---');
  engine = new WorkflowEngine();
  engine.answerQuestion('q1', 'option-b'); // Sim - volume inviabiliza prompt
  engine.answerQuestion('q2', 'option-b'); // Ensinar novos comportamentos
  engine.answerQuestion('q4', 'option-a'); // Sim - dados adequados
  state = engine.answerQuestion('q6', 'option-b'); // Não - recursos insuficientes
  console.log('Complete:', state.isComplete);
  console.log('Results:', state.results);
  console.log('Expected: ["intermediateApproaches"]');
  
  console.log('\nTodos os testes da metodologia do artigo concluídos!');
}

// Executa os testes se este arquivo for executado diretamente
if (typeof window === 'undefined') {
  testWorkflow();
} 