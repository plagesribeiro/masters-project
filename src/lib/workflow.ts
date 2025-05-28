export type QuestionType = 'yes-no' | 'multiple-choice';
export type AnswerValue = 'yes' | 'no' | 'both' | 'option-a' | 'option-b';

export interface WorkflowQuestion {
  id: string;
  type: QuestionType;
  textKey: string;
  options?: {
    key: string;
    value: AnswerValue;
  }[];
}

export interface WorkflowResult {
  id: string;
  titleKey: string;
  descriptionKey: string;
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

// Definição das perguntas do workflow
export const workflowQuestions: WorkflowQuestion[] = [
  {
    id: 'q1',
    type: 'yes-no',
    textKey: 'question1'
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    textKey: 'question2',
    options: [
      { key: 'question2OptionA', value: 'option-a' },
      { key: 'question2OptionB', value: 'option-b' },
      { key: 'question2OptionBoth', value: 'both' }
    ]
  },
  {
    id: 'q3',
    type: 'yes-no',
    textKey: 'question3'
  },
  {
    id: 'q4',
    type: 'yes-no',
    textKey: 'question4'
  }
];

// Definição dos resultados possíveis
export const workflowResults: WorkflowResult[] = [
  {
    id: 'result1',
    titleKey: 'result1Title',
    descriptionKey: 'result1Description'
  },
  {
    id: 'result2',
    titleKey: 'result2Title',
    descriptionKey: 'result2Description'
  },
  {
    id: 'result3',
    titleKey: 'result3Title',
    descriptionKey: 'result3Description'
  },
  {
    id: 'result2and3',
    titleKey: 'result2And3Title',
    descriptionKey: 'result2And3Description'
  }
];

// Lógica do workflow
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

    // Determina próxima pergunta ou resultado
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
        return answer === 'yes' ? null : 'q2'; // Se sim, vai para resultado 1. Se não, vai para pergunta 2
      
      case 'q2':
        if (answer === 'option-a') return 'q3'; // Eficiência -> pergunta 3
        if (answer === 'option-b') return 'q4'; // Qualidade -> pergunta 4
        if (answer === 'both') return 'q3'; // Ambos -> pergunta 3 primeiro, depois 4
        return null;
      
      case 'q3':
        // Se veio de q2 com "both", ainda precisa responder q4
        const q2Answer = this.state.answers.find(a => a.questionId === 'q2')?.answer;
        if (q2Answer === 'both') {
          return 'q4';
        }
        return null; // Senão, termina
      
      case 'q4':
        return null; // Sempre termina após q4
      
      default:
        return null;
    }
  }

  private calculateResults(): string[] {
    const q1Answer = this.state.answers.find(a => a.questionId === 'q1')?.answer;
    const q2Answer = this.state.answers.find(a => a.questionId === 'q2')?.answer;
    const q3Answer = this.state.answers.find(a => a.questionId === 'q3')?.answer;
    const q4Answer = this.state.answers.find(a => a.questionId === 'q4')?.answer;

    // Pergunta 1: Se sim -> Resultado 1
    if (q1Answer === 'yes') {
      return ['result1'];
    }

    // Se chegou aqui, q1 foi "no", então temos q2
    if (q2Answer === 'option-a') {
      // Foco em eficiência -> q3
      return q3Answer === 'yes' ? ['result2'] : ['result2'];
    }
    
    if (q2Answer === 'option-b') {
      // Foco em qualidade -> q4
      return q4Answer === 'yes' ? ['result3'] : ['result3'];
    }
    
    if (q2Answer === 'both') {
      // Ambos -> q3 e q4
      const needsEfficiency = q3Answer === 'yes';
      const needsQuality = q4Answer === 'yes';
      
      if (needsEfficiency && needsQuality) {
        return ['result2and3'];
      } else if (needsEfficiency) {
        return ['result2'];
      } else if (needsQuality) {
        return ['result3'];
      } else {
        return ['result2and3']; // Default para abordagem híbrida
      }
    }

    return ['result1']; // Fallback
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
    
    // Determina pergunta atual baseada nas respostas restantes
    if (this.state.answers.length === 0) {
      this.state.currentQuestionId = 'q1';
    } else {
      // Reconstrói o caminho
      this.state.currentQuestionId = 'q1';
      const answers = [...this.state.answers];
      this.state.answers = [];
      
      for (const answer of answers) {
        this.answerQuestion(answer.questionId, answer.answer);
      }
    }

    return this.getState();
  }
} 