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
    progress: 'Progress',
    
    // Workflow Questions
    question1: 'Do you have a large dataset available for training?',
    question2: 'What is your primary focus?',
    question2OptionA: 'Computational efficiency',
    question2OptionB: 'Model quality',
    question2OptionBoth: 'Both equally important',
    question3: 'Do you have limited computational resources?',
    question4: 'Do you need the highest possible model quality?',
    
    // Workflow Results
    result1Title: 'Traditional Training Methodology',
    result1Description: 'Based on your answers, we recommend using traditional training methodologies with your large dataset. This approach will provide solid results with proven techniques.',
    result2Title: 'Efficient Training Methodology',
    result2Description: 'Given your focus on computational efficiency, we recommend using optimization techniques such as gradient checkpointing, mixed precision training, and efficient data loading strategies.',
    result3Title: 'Quality-Focused Methodology',
    result3Description: 'For maximum model quality, we recommend using advanced techniques such as curriculum learning, sophisticated regularization, and careful hyperparameter tuning.',
    result2And3Title: 'Hybrid Methodology',
    result2And3Description: 'Since you need both efficiency and quality, we recommend a balanced approach combining optimization techniques with quality-enhancing methods, carefully balancing computational cost and model performance.',

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
    progress: 'Progresso',
    
    // Workflow Questions
    question1: 'Você possui um grande dataset disponível para treinamento?',
    question2: 'Qual é seu foco principal?',
    question2OptionA: 'Eficiência computacional',
    question2OptionB: 'Qualidade do modelo',
    question2OptionBoth: 'Ambos igualmente importantes',
    question3: 'Você possui recursos computacionais limitados?',
    question4: 'Você precisa da maior qualidade possível do modelo?',
    
    // Workflow Results
    result1Title: 'Metodologia de Treinamento Tradicional',
    result1Description: 'Com base em suas respostas, recomendamos usar metodologias de treinamento tradicionais com seu grande dataset. Esta abordagem fornecerá resultados sólidos com técnicas comprovadas.',
    result2Title: 'Metodologia de Treinamento Eficiente',
    result2Description: 'Dado seu foco em eficiência computacional, recomendamos usar técnicas de otimização como gradient checkpointing, treinamento de precisão mista e estratégias eficientes de carregamento de dados.',
    result3Title: 'Metodologia Focada em Qualidade',
    result3Description: 'Para máxima qualidade do modelo, recomendamos usar técnicas avançadas como curriculum learning, regularização sofisticada e ajuste cuidadoso de hiperparâmetros.',
    result2And3Title: 'Metodologia Híbrida',
    result2And3Description: 'Como você precisa tanto de eficiência quanto qualidade, recomendamos uma abordagem balanceada combinando técnicas de otimização com métodos que melhoram a qualidade, equilibrando cuidadosamente custo computacional e performance do modelo.',

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