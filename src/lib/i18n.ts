import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

type Language = 'en' | 'pt';

// Traduções
const translations = {
  en: {
    // Navigation
    home: 'Home',
    explore: 'Explore',
    toyExamples: 'Toy Examples',
    paper: 'Paper',
    
    // Home page
    masterDefense: 'Master\'s Defense',
    llmTraining: 'LLM Training',
    homeSubtitle: 'Explore advanced methodologies and practical tools for efficient training of Large Language Models. A journey through innovative techniques and real applications.',
    exploreResearch: 'Explore Research',
    academicPublication: 'Academic Publication',
    paperTitle: 'Advanced Methodologies for Efficient Training of Large Language Models',
    paperDescription: 'This research presents innovative techniques for optimizing the training process of large-scale language models, focusing on computational efficiency and quality of obtained results.',
    downloadPdf: 'Download PDF',
    viewOnline: 'View Online',
    
    // Explore page
    exploreTitle: 'Explore',
    exploreSubtitle: 'Discover interactive tools to explore LLM training methodologies and get your questions answered through specialized AI.',
    aiChatTitle: 'AI Specialized Chat',
    aiChatDescription: 'Chat with an AI trained specifically on the master\'s thesis content. Ask questions, explore concepts and get detailed explanations about the LLM training methodologies presented in the research.',
    methodologyTitle: 'Execute Methodology',
    methodologyDescription: 'Execute training methodologies through a guided interactive workflow. Answer sequential questions that direct you to the most suitable methodology for your specific case, with personalized results.',
    startChat: 'Start Chat',
    startWorkflow: 'Start Workflow',
    available: 'Available',
    inDevelopment: 'In Development',
    howItWorks: 'How It Works',
    howItWorksSubtitle: 'Explore the available features to deepen your knowledge about LLM Training',
    
    // Chat features
    articleBasedResponses: 'Article-based responses',
    detailedExplanations: 'Detailed explanations',
    academicContext: 'Academic context',
    guidedWorkflow: 'Guided workflow',
    sequentialQuestions: 'Sequential questions',
    personalizedResults: 'Personalized results',
    
    // Chat steps
    askQuestion: 'Ask your question',
    aiAnalyzes: 'AI analyzes the article',
    receiveResponse: 'Receive contextualized response',
    answerInitial: 'Answer initial questions',
    systemDirects: 'System directs next steps',
    receiveMethodology: 'Receive personalized methodology',
    
    // Toy Examples
    toyExamplesTitle: 'Toy Examples',
    toyExamplesSubtitle: 'Practical and interactive examples demonstrating language model training techniques in simplified cases.',
    pageInDevelopment: 'Page under development...',
    
    // Chat interface
    aiSpecialist: 'AI Specialist',
    specialistDescription: 'Expert in LLM training methodologies',
    online: 'Online',
    you: 'You',
    clearChat: 'Clear chat',
    recording: 'Recording...',
    send: 'send',
    newLine: 'new line',
    chatPlaceholder: 'Type your question about LLM training methodologies...',
    welcomeMessage: 'Hello! I am an AI specialized in the master\'s thesis on LLM training methodologies. How can I help you today?',
    chatCleared: 'Chat cleared! How can I help you?',
    
    // Errors
    communicationError: 'Communication failure with AI',
    errorProcessing: 'Sorry, an error occurred while processing your message. Please try again.',
    microphoneError: 'Error accessing microphone. Check permissions.',
    transcriptionError: 'Audio transcription failed',
    transcriptionErrorMessage: 'Error transcribing audio. Please try again.',
    
    // Tags
    machineLearning: 'Machine Learning',
    naturalLanguageProcessing: 'Natural Language Processing',
    deepLearning: 'Deep Learning',
    llmTrainingTag: 'LLM Training',

    // Workflow
    workflowTitle: 'Methodology Workflow',
    workflowSubtitle: 'Answer sequential questions to find the ideal methodology for your case',
    question: 'Question',
    yes: 'Yes',
    no: 'No',
    both: 'Both',
    next: 'Next',
    previous: 'Previous',
    restart: 'Restart',
    result: 'Result',
    yourAnswers: 'Your Answers',
    recommendedMethodology: 'Recommended Methodology',
    workflowComplete: 'Workflow Complete',
    
    // Workflow Questions
    question1: 'What is the size of your available dataset?',
    question1OptionA: 'Small (< 1M examples)',
    question1OptionB: 'Medium (1M - 100M examples)',
    question1OptionC: 'Large (> 100M examples)',
    
    question2: 'What are your computational resource constraints?',
    question2OptionA: 'Limited (single GPU or small cluster)',
    question2OptionB: 'Moderate (multiple GPUs)',
    question2OptionC: 'Extensive (large cluster or cloud resources)',
    
    question3: 'What is your primary training objective?',
    question3OptionA: 'Fine-tuning for specific tasks',
    question3OptionB: 'Pre-training from scratch',
    question3OptionC: 'Domain adaptation',
    
    question4: 'What is your priority regarding training time vs model quality?',
    question4OptionA: 'Fast training (accept lower quality)',
    question4OptionB: 'Balanced approach',
    question4OptionC: 'Maximum quality (longer training acceptable)',
    
    // Workflow Results
    efficientFinetuningTitle: 'Efficient Fine-tuning Methodology',
    efficientFinetuningDescription: 'Recommended for your scenario with limited resources and small datasets. Use Parameter-Efficient Fine-Tuning (PEFT) techniques like LoRA, Adapters, or Prompt Tuning. These methods require minimal computational resources while maintaining good performance.',
    efficientFinetuningTechniques: 'Key Techniques: LoRA (Low-Rank Adaptation), Adapters, Prompt Tuning, Gradient Checkpointing',
    efficientFinetuningBenefits: 'Benefits: Low memory usage, fast training, minimal parameter updates, good transfer learning',
    
    standardFinetuningTitle: 'Standard Fine-tuning Methodology',
    standardFinetuningDescription: 'Suitable for medium-sized datasets with moderate computational resources. Use full fine-tuning with optimization techniques like mixed precision training and gradient accumulation.',
    standardFinetuningTechniques: 'Key Techniques: Full Fine-tuning, Mixed Precision (FP16/BF16), Gradient Accumulation, Learning Rate Scheduling',
    standardFinetuningBenefits: 'Benefits: Good balance between performance and efficiency, proven techniques, flexible optimization',
    
    distributedTrainingTitle: 'Distributed Training Methodology',
    distributedTrainingDescription: 'Optimal for large datasets and extensive computational resources. Implement data and model parallelism with advanced optimization techniques for maximum performance.',
    distributedTrainingTechniques: 'Key Techniques: Data Parallelism, Model Parallelism, Pipeline Parallelism, ZeRO Optimizer, DeepSpeed',
    distributedTrainingBenefits: 'Benefits: Handles large models and datasets, scalable training, state-of-the-art performance',
    
    domainAdaptationTitle: 'Domain Adaptation Methodology',
    domainAdaptationDescription: 'Specialized approach for adapting pre-trained models to specific domains. Combines continued pre-training with targeted fine-tuning strategies.',
    domainAdaptationTechniques: 'Key Techniques: Continued Pre-training, Domain-specific Tokenization, Curriculum Learning, Progressive Training',
    domainAdaptationBenefits: 'Benefits: Domain-specific performance, efficient knowledge transfer, reduced training time',
    
    hybridApproachTitle: 'Hybrid Training Methodology',
    hybridApproachDescription: 'A balanced approach combining multiple techniques based on your specific requirements. Adapts training strategy based on available resources and quality requirements.',
    hybridApproachTechniques: 'Key Techniques: Multi-stage Training, Adaptive Optimization, Resource-aware Scheduling, Quality Monitoring',
    hybridApproachBenefits: 'Benefits: Flexible approach, optimized resource usage, balanced performance-efficiency trade-off',
    
    // Additional workflow terms
    keyTechniques: 'Key Techniques',
    benefits: 'Benefits',
    recommendedFor: 'Recommended For',
    implementationSteps: 'Implementation Steps',
    step: 'Step',

    // Footer
    masterCCDegree: 'Master\'s Degree in Computer Science',
    ofPUCMinas: 'at PUC Minas'
  },
  pt: {
    // Navigation
    home: 'Início',
    explore: 'Explorar',
    toyExamples: 'Exemplos Práticos',
    paper: 'Artigo',
    
    // Home page
    masterDefense: 'Defesa de Mestrado',
    llmTraining: 'Treinamento de LLM',
    homeSubtitle: 'Explore metodologias avançadas e ferramentas práticas para o treinamento eficiente de Large Language Models. Uma jornada através de técnicas inovadoras e aplicações reais.',
    exploreResearch: 'Explorar Pesquisa',
    academicPublication: 'Publicação Acadêmica',
    paperTitle: 'Metodologias Avançadas para Treinamento Eficiente de Large Language Models',
    paperDescription: 'Esta pesquisa apresenta técnicas inovadoras para otimização do processo de treinamento de modelos de linguagem em larga escala, com foco em eficiência computacional e qualidade dos resultados obtidos.',
    downloadPdf: 'Download PDF',
    viewOnline: 'Ver Online',
    
    // Explore page
    exploreTitle: 'Explorar',
    exploreSubtitle: 'Descubra ferramentas interativas para explorar metodologias de treinamento de LLM e tire suas dúvidas sobre a pesquisa através de IA especializada.',
    aiChatTitle: 'Chat com IA Especializada',
    aiChatDescription: 'Converse com uma IA treinada especificamente no conteúdo do artigo de mestrado. Tire dúvidas, explore conceitos e obtenha explicações detalhadas sobre as metodologias de treinamento de LLM apresentadas na pesquisa.',
    methodologyTitle: 'Executar Metodologia',
    methodologyDescription: 'Execute metodologias de treinamento através de um workflow interativo guiado. Responda perguntas sequenciais que direcionam para a metodologia mais adequada ao seu caso específico, com resultados personalizados.',
    startChat: 'Iniciar Chat',
    startWorkflow: 'Iniciar Workflow',
    available: 'Disponível',
    inDevelopment: 'Em Desenvolvimento',
    howItWorks: 'Como Funciona',
    howItWorksSubtitle: 'Explore as funcionalidades disponíveis para aprofundar seu conhecimento sobre LLM Training',
    
    // Chat features
    articleBasedResponses: 'Respostas baseadas no artigo',
    detailedExplanations: 'Explicações detalhadas',
    academicContext: 'Contexto acadêmico',
    guidedWorkflow: 'Workflow guiado',
    sequentialQuestions: 'Perguntas sequenciais',
    personalizedResults: 'Resultados personalizados',
    
    // Chat steps
    askQuestion: 'Faça sua pergunta',
    aiAnalyzes: 'IA analisa o artigo',
    receiveResponse: 'Receba resposta contextualizada',
    answerInitial: 'Responda perguntas iniciais',
    systemDirects: 'Sistema direciona próximos passos',
    receiveMethodology: 'Receba metodologia personalizada',
    
    // Toy Examples
    toyExamplesTitle: 'Exemplos Práticos',
    toyExamplesSubtitle: 'Exemplos práticos e interativos demonstrando técnicas de treinamento de modelos de linguagem em casos simplificados.',
    pageInDevelopment: 'Página em desenvolvimento...',
    
    // Chat interface
    aiSpecialist: 'IA Especializada',
    specialistDescription: 'Especialista em metodologias de treinamento de LLM',
    online: 'Online',
    you: 'Você',
    clearChat: 'Limpar chat',
    recording: 'Gravando...',
    send: 'enviar',
    newLine: 'nova linha',
    chatPlaceholder: 'Digite sua pergunta sobre metodologias de treinamento de LLM...',
    welcomeMessage: 'Olá! Sou uma IA especializada no artigo de mestrado sobre metodologias de treinamento de LLM. Como posso ajudá-lo hoje?',
    chatCleared: 'Chat limpo! Como posso ajudá-lo?',
    
    // Errors
    communicationError: 'Falha na comunicação com a IA',
    errorProcessing: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
    microphoneError: 'Erro ao acessar o microfone. Verifique as permissões.',
    transcriptionError: 'Falha na transcrição do áudio',
    transcriptionErrorMessage: 'Erro ao transcrever o áudio. Tente novamente.',
    
    // Tags
    machineLearning: 'Machine Learning',
    naturalLanguageProcessing: 'Processamento de Linguagem Natural',
    deepLearning: 'Deep Learning',
    llmTrainingTag: 'Treinamento de LLM',

    // Workflow
    workflowTitle: 'Workflow de Metodologia',
    workflowSubtitle: 'Responda perguntas sequenciais para encontrar a metodologia ideal para seu caso',
    question: 'Pergunta',
    yes: 'Sim',
    no: 'Não',
    both: 'Ambos',
    next: 'Próximo',
    previous: 'Anterior',
    restart: 'Reiniciar',
    result: 'Resultado',
    yourAnswers: 'Suas Respostas',
    recommendedMethodology: 'Metodologia Recomendada',
    workflowComplete: 'Workflow Completo',
    
    // Workflow Questions
    question1: 'Qual é o tamanho do seu dataset disponível?',
    question1OptionA: 'Pequeno (< 1M exemplos)',
    question1OptionB: 'Médio (1M - 100M exemplos)',
    question1OptionC: 'Grande (> 100M exemplos)',
    
    question2: 'Quais são suas restrições de recursos computacionais?',
    question2OptionA: 'Limitado (um único GPU ou pequeno cluster)',
    question2OptionB: 'Moderado (múltiplos GPUs)',
    question2OptionC: 'Extenso (grande cluster ou recursos de nuvem)',
    
    question3: 'Qual é seu objetivo principal de treinamento?',
    question3OptionA: 'Fine-tuning para tarefas específicas',
    question3OptionB: 'Pré-treinamento do zero',
    question3OptionC: 'Adaptação de domínio',
    
    question4: 'Qual é sua prioridade em relação ao tempo de treinamento vs qualidade do modelo?',
    question4OptionA: 'Treinamento rápido (aceitar menor qualidade)',
    question4OptionB: 'Abordagem equilibrada',
    question4OptionC: 'Qualidade máxima (treinamento mais longo aceitável)',
    
    // Workflow Results
    efficientFinetuningTitle: 'Metodologia de Fine-tuning Eficiente',
    efficientFinetuningDescription: 'Recomendada para seu cenário com recursos limitados e pequenos datasets. Use técnicas de Fine-Tuning de Parâmetro Eficiente (PEFT) como LoRA, Adaptadores, ou Ajuste de Prompt. Esses métodos requerem recursos computacionais mínimos enquanto mantêm boa performance.',
    efficientFinetuningTechniques: 'Técnicas Principais: LoRA (Adaptação de Baixo Rank), Adaptadores, Ajuste de Prompt, Gradient Checkpointing',
    efficientFinetuningBenefits: 'Benefícios: Baixo uso de memória, treinamento rápido, atualizações mínimas de parâmetros, boa transferência de aprendizado',
    
    standardFinetuningTitle: 'Metodologia de Fine-tuning Padrão',
    standardFinetuningDescription: 'Adequada para datasets de tamanho médio com recursos computacionais moderados. Use fine-tuning completo com técnicas de otimização como treinamento de precisão mista e acumulação de gradiente.',
    standardFinetuningTechniques: 'Técnicas Principais: Fine-tuning Completo, Precisão Mista (FP16/BF16), Acumulação de Gradiente, Agendamento de Taxa de Aprendizado',
    standardFinetuningBenefits: 'Benefícios: Bom equilíbrio entre performance e eficiência, técnicas comprovadas, otimização flexível',
    
    distributedTrainingTitle: 'Metodologia de Treinamento Distribuído',
    distributedTrainingDescription: 'Ideal para grandes datasets e recursos computacionais extensos. Implemente paralelismo de dados e modelo com técnicas avançadas de otimização para máxima performance.',
    distributedTrainingTechniques: 'Técnicas Principais: Paralelismo de Dados, Paralelismo de Modelo, Paralelismo de Pipeline, Otimizador ZeRO, DeepSpeed',
    distributedTrainingBenefits: 'Benefícios: Lida com modelos e datasets grandes, treinamento escalável, performance estado-da-arte',
    
    domainAdaptationTitle: 'Metodologia de Adaptação de Domínio',
    domainAdaptationDescription: 'Abordagem especializada para adaptar modelos pré-treinados a domínios específicos. Combina pré-treinamento continuado com estratégias de fine-tuning direcionadas.',
    domainAdaptationTechniques: 'Técnicas Principais: Pré-treinamento Continuado, Tokenização Específica de Domínio, Aprendizado Curricular, Treinamento Progressivo',
    domainAdaptationBenefits: 'Benefícios: Performance específica de domínio, transferência eficiente de conhecimento, tempo de treinamento reduzido',
    
    hybridApproachTitle: 'Metodologia de Treinamento Híbrida',
    hybridApproachDescription: 'Uma abordagem equilibrada combinando múltiplas técnicas baseadas em seus requisitos específicos. Adapta estratégia de treinamento baseada em recursos disponíveis e requisitos de qualidade.',
    hybridApproachTechniques: 'Técnicas Principais: Treinamento Multi-estágio, Otimização Adaptativa, Agendamento Consciente de Recursos, Monitoramento de Qualidade',
    hybridApproachBenefits: 'Benefícios: Abordagem flexível, uso otimizado de recursos, equilíbrio performance-eficiência',
    
    // Additional workflow terms
    keyTechniques: 'Técnicas Principais',
    benefits: 'Benefícios',
    recommendedFor: 'Recomendado Para',
    implementationSteps: 'Passos de Implementação',
    step: 'Passo',

    // Footer
    masterCCDegree: 'Mestrado em Ciência da Computação',
    ofPUCMinas: 'da PUC Minas'
  }
} as const;

type TranslationKey = keyof typeof translations.en;

// Função para detectar idioma do navegador
function detectBrowserLanguage(): Language {
  if (!browser) return 'pt';
  
  const browserLang = navigator.language || navigator.languages[0];
  console.log('Browser language detected:', browserLang);
  
  if (browserLang.startsWith('pt')) {
    return 'pt';
  }
  return 'en';
}

// Função para obter idioma do localStorage ou detectar
function getStoredLanguage(): Language {
  if (!browser) return 'pt';
  
  try {
    const stored = localStorage.getItem('llm-app-language') as Language;
    if (stored && (stored === 'en' || stored === 'pt')) {
      console.log('Language loaded from localStorage:', stored);
      return stored;
    }
  } catch (e) {
    console.warn('Error reading from localStorage:', e);
  }
  
  const detected = detectBrowserLanguage();
  console.log('Using detected language:', detected);
  return detected;
}

// Store para o idioma atual - inicializa com valor do localStorage ou detectado
export const currentLanguage = writable<Language>(getStoredLanguage());

// Salvar no localStorage sempre que o idioma mudar
if (browser) {
  currentLanguage.subscribe((lang) => {
    try {
      localStorage.setItem('llm-app-language', lang);
      console.log('Language saved to localStorage:', lang);
    } catch (e) {
      console.warn('Error saving to localStorage:', e);
    }
  });
}

// Store derivado para as traduções
export const t = derived(
  currentLanguage,
  ($currentLanguage) => (key: TranslationKey) => {
    return translations[$currentLanguage][key] || translations.pt[key] || key;
  }
);

// Função para trocar idioma
export function setLanguage(lang: Language): void {
  console.log('Setting language to:', lang);
  currentLanguage.set(lang);
}

// Função para inicializar o idioma (para garantir que está correto no onMount)
export function initializeLanguage(): void {
  if (!browser) return;
  
  const storedLang = getStoredLanguage();
  console.log('Initializing language:', storedLang);
  currentLanguage.set(storedLang);
} 