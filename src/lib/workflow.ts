export type QuestionType = 'multiple-choice';
export type AnswerValue = 'option-a' | 'option-b' | 'option-c';

export interface WorkflowQuestion {
  id: string;
  type: QuestionType;
  textKey: string;
  options: {
    key: string;
    value: AnswerValue;
  }[];
}

export interface WorkflowResult {
  id: string;
  titleKey: string;
  descriptionKey: string;
  techniquesKey: string;
  benefitsKey: string;
}

export interface WorkflowAnswer {
  questionId: string;
  answer: AnswerValue;
}

export interface WorkflowState {
  currentQuestionId: string | null;
  answers: WorkflowAnswer[];
  results: string[];
  isComplete: boolean;
}

// Definição das perguntas do workflow baseadas na metodologia do artigo
export const workflowQuestions: WorkflowQuestion[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    textKey: 'question1',
    options: [
      { key: 'question1OptionA', value: 'option-a' }, // Não - dados podem ser inseridos no prompt
      { key: 'question1OptionB', value: 'option-b' }  // Sim - volume inviabiliza inserção no prompt
    ]
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    textKey: 'question2',
    options: [
      { key: 'question2OptionA', value: 'option-a' }, // Apenas fornecer informações como contexto
      { key: 'question2OptionB', value: 'option-b' }, // Ensinar novos comportamentos
      { key: 'question2OptionC', value: 'option-c' }  // Ambos
    ]
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    textKey: 'question3',
    options: [
      { key: 'question3OptionA', value: 'option-a' }, // Sim - é viável implementar RAG
      { key: 'question3OptionB', value: 'option-b' }  // Não - não é viável implementar RAG
    ]
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    textKey: 'question4',
    options: [
      { key: 'question4OptionA', value: 'option-a' }, // Sim - dados atendem aos requisitos
      { key: 'question4OptionB', value: 'option-b' }  // Não - dados não são suficientes
    ]
  },
  {
    id: 'q5',
    type: 'multiple-choice',
    textKey: 'question5',
    options: [
      { key: 'question5OptionA', value: 'option-a' }, // Sim - latência é aceitável
      { key: 'question5OptionB', value: 'option-b' }  // Não - latência é alta demais
    ]
  },
  {
    id: 'q6',
    type: 'multiple-choice',
    textKey: 'question6',
    options: [
      { key: 'question6OptionA', value: 'option-a' }, // Sim - existem recursos suficientes
      { key: 'question6OptionB', value: 'option-b' }  // Não - não há recursos adequados
    ]
  }
];

// Definição dos resultados possíveis baseados na metodologia do artigo
export const workflowResults: WorkflowResult[] = [
  {
    id: 'intermediateApproaches',
    titleKey: 'intermediateApproachesTitle',
    descriptionKey: 'intermediateApproachesDescription',
    techniquesKey: 'intermediateApproachesTechniques',
    benefitsKey: 'intermediateApproachesBenefits'
  },
  {
    id: 'fineTuning',
    titleKey: 'fineTuningTitle',
    descriptionKey: 'fineTuningDescription',
    techniquesKey: 'fineTuningTechniques',
    benefitsKey: 'fineTuningBenefits'
  },
  {
    id: 'rag',
    titleKey: 'ragTitle',
    descriptionKey: 'ragDescription',
    techniquesKey: 'ragTechniques',
    benefitsKey: 'ragBenefits'
  },
  {
    id: 'hybridApproach',
    titleKey: 'hybridApproachTitle',
    descriptionKey: 'hybridApproachDescription',
    techniquesKey: 'hybridApproachTechniques',
    benefitsKey: 'hybridApproachBenefits'
  }
];

// Lógica do workflow baseada na árvore de decisão do artigo
export class WorkflowEngine {
  private state: WorkflowState;

  constructor(initialState?: WorkflowState) {
    this.state = initialState || {
      currentQuestionId: 'q1',
      answers: [],
      results: [],
      isComplete: false
    };
  }

  getState(): WorkflowState {
    return { ...this.state };
  }

  getCurrentQuestion(): WorkflowQuestion | null {
    if (!this.state.currentQuestionId) return null;
    return workflowQuestions.find(q => q.id === this.state.currentQuestionId) || null;
  }

  answerQuestion(questionId: string, answer: AnswerValue): WorkflowState {
    // Remove resposta anterior se existir
    this.state.answers = this.state.answers.filter(a => a.questionId !== questionId);
    
    // Adiciona nova resposta
    this.state.answers.push({ questionId, answer });

    // Determina próxima pergunta ou resultado baseado na metodologia do artigo
    this.state.currentQuestionId = this.getNextQuestion(questionId, answer);
    
    // Verifica se o workflow está completo
    if (!this.state.currentQuestionId) {
      this.state.isComplete = true;
      this.state.results = this.calculateResults();
    }

    return this.getState();
  }

  private getNextQuestion(currentQuestionId: string, answer: AnswerValue): string | null {
    switch (currentQuestionId) {
      case 'q1':
        // Passo 1: Volume de dados
        if (answer === 'option-a') {
          // Não - dados podem ser inseridos no prompt -> Abordagens Intermediárias
          return null; // Termina aqui
        } else {
          // Sim - volume inviabiliza -> Passo 2
          return 'q2';
        }
      
      case 'q2':
        // Passo 2: Finalidade da adaptação
        if (answer === 'option-a') {
          // Apenas contexto -> RAG (Passo 3)
          return 'q3';
        } else if (answer === 'option-b') {
          // Apenas comportamentos -> Fine-Tuning (Passo 4)
          return 'q4';
        } else {
          // Ambos -> Híbrido (precisa validar ambos os caminhos)
          // Vamos para RAG primeiro (Passo 3)
          return 'q3';
        }
      
      case 'q3':
        // Passo 3: Viabilidade técnica do RAG
        const q2Answer = this.state.answers.find(a => a.questionId === 'q2')?.answer;
        
        if (answer === 'option-a') {
          // Sim - RAG é viável -> Passo 5 (latência)
          return 'q5';
        } else {
          // Não - RAG não é viável
          if (q2Answer === 'option-a') {
            // Se era só contexto e RAG não é viável -> Abordagens Intermediárias
            return null;
          } else {
            // Se era híbrido ou comportamentos -> vai para Fine-Tuning (Passo 4)
            return 'q4';
          }
        }
      
      case 'q4':
        // Passo 4: Qualidade dos dados para Fine-Tuning
        if (answer === 'option-a') {
          // Sim - dados são adequados -> Passo 6 (recursos)
          return 'q6';
        } else {
          // Não - dados não são adequados -> Abordagens Intermediárias
          return null;
        }
      
      case 'q5':
        // Passo 5: Latência do RAG
        const q2AnswerForQ5 = this.state.answers.find(a => a.questionId === 'q2')?.answer;
        
        if (answer === 'option-a') {
          // Sim - latência é aceitável
          if (q2AnswerForQ5 === 'option-c') {
            // Se era híbrido, ainda precisa validar Fine-Tuning
            return 'q4';
          } else {
            // Se era só contexto -> RAG
            return null;
          }
        } else {
          // Não - latência é alta demais
          if (q2AnswerForQ5 === 'option-a') {
            // Se era só contexto -> Abordagens Intermediárias
            return null;
          } else {
            // Se era híbrido -> vai para Fine-Tuning
            return 'q4';
          }
        }
      
      case 'q6':
        // Passo 6: Recursos para Fine-Tuning
        // Sempre termina aqui
        return null;
      
      default:
        return null;
    }
  }

  private calculateResults(): string[] {
    const q1Answer = this.state.answers.find(a => a.questionId === 'q1')?.answer;
    const q2Answer = this.state.answers.find(a => a.questionId === 'q2')?.answer;
    const q3Answer = this.state.answers.find(a => a.questionId === 'q3')?.answer;
    const q4Answer = this.state.answers.find(a => a.questionId === 'q4')?.answer;
    const q5Answer = this.state.answers.find(a => a.questionId === 'q5')?.answer;
    const q6Answer = this.state.answers.find(a => a.questionId === 'q6')?.answer;

    // Passo 1: Se dados podem ser inseridos no prompt
    if (q1Answer === 'option-a') {
      return ['intermediateApproaches'];
    }

    // A partir daqui, sabemos que q1Answer === 'option-b' (volume inviabiliza prompt)
    
    // Passo 2: Finalidade da adaptação
    if (q2Answer === 'option-a') {
      // Apenas contexto -> caminho RAG
      if (q3Answer === 'option-a' && q5Answer === 'option-a') {
        // RAG viável e latência aceitável
        return ['rag'];
      } else {
        // RAG não viável ou latência alta
        return ['intermediateApproaches'];
      }
    } else if (q2Answer === 'option-b') {
      // Apenas comportamentos -> caminho Fine-Tuning
      if (q4Answer === 'option-a' && q6Answer === 'option-a') {
        // Dados adequados e recursos suficientes
        return ['fineTuning'];
      } else {
        // Dados inadequados ou recursos insuficientes
        return ['intermediateApproaches'];
      }
    } else if (q2Answer === 'option-c') {
      // Ambos -> caminho híbrido
      const ragViable = q3Answer === 'option-a' && q5Answer === 'option-a';
      const fineTuningViable = q4Answer === 'option-a' && q6Answer === 'option-a';
      
      if (ragViable && fineTuningViable) {
        // Ambos viáveis -> Híbrido
        return ['hybridApproach'];
      } else if (ragViable) {
        // Só RAG viável
        return ['rag'];
      } else if (fineTuningViable) {
        // Só Fine-Tuning viável
        return ['fineTuning'];
      } else {
        // Nenhum viável
        return ['intermediateApproaches'];
      }
    }

    // Fallback
    return ['intermediateApproaches'];
  }

  restart(): WorkflowState {
    this.state = {
      currentQuestionId: 'q1',
      answers: [],
      results: [],
      isComplete: false
    };
    return this.getState();
  }

  canGoBack(): boolean {
    return this.state.answers.length > 0;
  }

  goBack(): WorkflowState {
    if (!this.canGoBack()) return this.getState();

    // Remove última resposta
    const lastAnswer = this.state.answers.pop();
    if (!lastAnswer) return this.getState();

    // Recalcula estado baseado nas respostas restantes
    this.state.isComplete = false;
    this.state.results = [];
    
    // Reconstrói o caminho
    if (this.state.answers.length === 0) {
      this.state.currentQuestionId = 'q1';
    } else {
      // Reconstrói o caminho baseado nas respostas restantes
      const answers = [...this.state.answers];
      this.state.answers = [];
      this.state.currentQuestionId = 'q1';
      
      for (const answer of answers) {
        this.answerQuestion(answer.questionId, answer.answer);
      }
    }

    return this.getState();
  }
} 