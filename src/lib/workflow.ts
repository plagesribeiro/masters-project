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

// Definição das perguntas do workflow
export const workflowQuestions: WorkflowQuestion[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    textKey: 'question1',
    options: [
      { key: 'question1OptionA', value: 'option-a' },
      { key: 'question1OptionB', value: 'option-b' },
      { key: 'question1OptionC', value: 'option-c' }
    ]
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    textKey: 'question2',
    options: [
      { key: 'question2OptionA', value: 'option-a' },
      { key: 'question2OptionB', value: 'option-b' },
      { key: 'question2OptionC', value: 'option-c' }
    ]
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    textKey: 'question3',
    options: [
      { key: 'question3OptionA', value: 'option-a' },
      { key: 'question3OptionB', value: 'option-b' },
      { key: 'question3OptionC', value: 'option-c' }
    ]
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    textKey: 'question4',
    options: [
      { key: 'question4OptionA', value: 'option-a' },
      { key: 'question4OptionB', value: 'option-b' },
      { key: 'question4OptionC', value: 'option-c' }
    ]
  }
];

// Definição dos resultados possíveis
export const workflowResults: WorkflowResult[] = [
  {
    id: 'efficientFinetuning',
    titleKey: 'efficientFinetuningTitle',
    descriptionKey: 'efficientFinetuningDescription',
    techniquesKey: 'efficientFinetuningTechniques',
    benefitsKey: 'efficientFinetuningBenefits'
  },
  {
    id: 'standardFinetuning',
    titleKey: 'standardFinetuningTitle',
    descriptionKey: 'standardFinetuningDescription',
    techniquesKey: 'standardFinetuningTechniques',
    benefitsKey: 'standardFinetuningBenefits'
  },
  {
    id: 'distributedTraining',
    titleKey: 'distributedTrainingTitle',
    descriptionKey: 'distributedTrainingDescription',
    techniquesKey: 'distributedTrainingTechniques',
    benefitsKey: 'distributedTrainingBenefits'
  },
  {
    id: 'domainAdaptation',
    titleKey: 'domainAdaptationTitle',
    descriptionKey: 'domainAdaptationDescription',
    techniquesKey: 'domainAdaptationTechniques',
    benefitsKey: 'domainAdaptationBenefits'
  },
  {
    id: 'hybridApproach',
    titleKey: 'hybridApproachTitle',
    descriptionKey: 'hybridApproachDescription',
    techniquesKey: 'hybridApproachTechniques',
    benefitsKey: 'hybridApproachBenefits'
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
        return 'q2'; // Sempre vai para pergunta 2
      case 'q2':
        return 'q3'; // Sempre vai para pergunta 3
      case 'q3':
        return 'q4'; // Sempre vai para pergunta 4
      case 'q4':
        return null; // Termina após pergunta 4
      default:
        return null;
    }
  }

  private calculateResults(): string[] {
    const q1Answer = this.state.answers.find(a => a.questionId === 'q1')?.answer;
    const q2Answer = this.state.answers.find(a => a.questionId === 'q2')?.answer;
    const q3Answer = this.state.answers.find(a => a.questionId === 'q3')?.answer;
    const q4Answer = this.state.answers.find(a => a.questionId === 'q4')?.answer;

    // Lógica de decisão baseada nas respostas
    
    // Se dataset pequeno e recursos limitados -> Efficient Fine-tuning
    if (q1Answer === 'option-a' && q2Answer === 'option-a') {
      return ['efficientFinetuning'];
    }
    
    // Se dataset grande e recursos extensos -> Distributed Training
    if (q1Answer === 'option-c' && q2Answer === 'option-c') {
      return ['distributedTraining'];
    }
    
    // Se objetivo é adaptação de domínio -> Domain Adaptation
    if (q3Answer === 'option-c') {
      return ['domainAdaptation'];
    }
    
    // Se objetivo é pré-treinamento do zero e recursos extensos -> Distributed Training
    if (q3Answer === 'option-b' && q2Answer === 'option-c') {
      return ['distributedTraining'];
    }
    
    // Se dataset médio e recursos moderados -> Standard Fine-tuning
    if (q1Answer === 'option-b' && q2Answer === 'option-b') {
      return ['standardFinetuning'];
    }
    
    // Se prioridade é velocidade -> Efficient Fine-tuning
    if (q4Answer === 'option-a') {
      return ['efficientFinetuning'];
    }
    
    // Se prioridade é qualidade máxima e recursos permitem -> Distributed Training
    if (q4Answer === 'option-c' && q2Answer !== 'option-a') {
      return ['distributedTraining'];
    }
    
    // Casos híbridos ou balanceados
    if (q4Answer === 'option-b') {
      return ['hybridApproach'];
    }
    
    // Default para abordagem padrão
    return ['standardFinetuning'];
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