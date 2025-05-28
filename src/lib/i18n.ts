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
    
    // Workflow Questions - Baseadas na metodologia do artigo
    question1: 'Does the amount of available data make it unfeasible to insert it directly into the prompt?',
    question1OptionA: 'No (data can be inserted directly into the prompt)',
    question1OptionB: 'Yes (data volume exceeds model context limits)',
    
    question2: 'Is the goal of adaptation to teach new behaviors to the model or just provide contextual information?',
    question2OptionA: 'Only provide information as context',
    question2OptionB: 'Teach new behaviors to the model',
    question2OptionC: 'Both - provide context and teach new behaviors',
    
    question3: 'Is it feasible to build or integrate an external retrieval mechanism (RAG) with the available data?',
    question3OptionA: 'Yes, it is possible to implement or there is already a RAG mechanism',
    question3OptionB: 'No, it is not possible to build or integrate a RAG mechanism',
    
    question4: 'Is there a specialized, organized and quality dataset sufficient to perform Fine-Tuning?',
    question4OptionA: 'Yes, the available data meets the requirements',
    question4OptionB: 'No, the data is not sufficient or not prepared',
    
    question5: 'Is the latency of the RAG mechanism acceptable for the context of use?',
    question5OptionA: 'Yes, latency is compatible with system requirements',
    question5OptionB: 'No, latency is too high for operational requirements',
    
    question6: 'Is there computational and financial availability to perform Fine-Tuning with the available data?',
    question6OptionA: 'Yes, there are sufficient resources (or it is possible to apply an efficient approach)',
    question6OptionB: 'No, there are no adequate resources for Fine-Tuning',
    
    // Workflow Results - Baseados na metodologia do artigo
    intermediateApproachesTitle: 'Intermediate Approaches',
    intermediateApproachesDescription: 'Since the data volume allows direct insertion into the prompt, you can use lightweight adaptation techniques that do not require complex model modifications. These approaches are efficient and computationally inexpensive.',
    intermediateApproachesTechniques: 'Key Techniques: Few-Shot Learning, Prompt Engineering, Chain of Thought (CoT), Agent-based Architectures',
    intermediateApproachesBenefits: 'Benefits: Low computational cost, fast implementation, flexibility, no need for re-training',
    
    fineTuningTitle: 'Fine-Tuning',
    fineTuningDescription: 'Recommended strategy for teaching new behaviors to the model through parametric adjustment. Fine-Tuning reconfigures the internal weights of the model based on the provided data, allowing learning of new response patterns.',
    fineTuningTechniques: 'Key Techniques: Full Fine-Tuning, LoRA (Low-Rank Adaptation), Prefix-Tuning, Adapters, BitFit',
    fineTuningBenefits: 'Benefits: Permanent learning of behaviors, deep personalization, high quality in specific domains',
    
    ragTitle: 'RAG (Retrieval-Augmented Generation)',
    ragDescription: 'Ideal approach for providing updated contextual information to the model without modifying its parameters. RAG combines text generation with external information retrieval in real time.',
    ragTechniques: 'Key Techniques: Vector Search, Semantic Embeddings, Document Indexing, Retrieval APIs, Vector Databases',
    ragBenefits: 'Benefits: Always updated information, no re-training, source flexibility, low maintenance cost',
    
    hybridApproachTitle: 'Fine-Tuning + RAG (Hybrid Approach)',
    hybridApproachDescription: 'Combination of the two main strategies for cases that require both learning new behaviors and access to updated contextual information. Fine-Tuning shapes general behavior while RAG provides dynamic data.',
    hybridApproachTechniques: 'Key Techniques: Fine-Tuning for behavior + RAG for context, Integrated pipeline, Modular architecture',
    hybridApproachBenefits: 'Benefits: Maximum adaptability, personalized behavior with updated data, complete solution',
    
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
    
    // Workflow Questions - Baseadas na metodologia do artigo
    question1: 'A quantidade de dados disponíveis inviabiliza sua inserção direta no prompt?',
    question1OptionA: 'Não (os dados podem ser inseridos diretamente no prompt)',
    question1OptionB: 'Sim (o volume de dados ultrapassa os limites de contexto do modelo)',
    
    question2: 'O objetivo da adaptação é ensinar novos comportamentos ao modelo ou apenas fornecer informações contextuais?',
    question2OptionA: 'Apenas fornecer informações como contexto',
    question2OptionB: 'Ensinar novos comportamentos ao modelo',
    question2OptionC: 'Ambos - fornecer contexto e ensinar novos comportamentos',
    
    question3: 'É viável construir ou integrar um mecanismo de recuperação externa (RAG) com os dados disponíveis?',
    question3OptionA: 'Sim, é possível implementar ou já existe um mecanismo de RAG',
    question3OptionB: 'Não, não é possível construir ou integrar um mecanismo de RAG',
    
    question4: 'Existe um conjunto de dados especializado, organizado e de qualidade suficiente para realizar o Fine-Tuning?',
    question4OptionA: 'Sim, os dados disponíveis atendem aos requisitos',
    question4OptionB: 'Não, os dados não são suficientes ou não estão preparados',
    
    question5: 'A latência do mecanismo de RAG é aceitável para o contexto de uso?',
    question5OptionA: 'Sim, a latência é compatível com os requisitos do sistema',
    question5OptionB: 'Não, a latência é alta demais para os requisitos operacionais',
    
    question6: 'Existe disponibilidade computacional e financeira para realizar o Fine-Tuning com os dados disponíveis?',
    question6OptionA: 'Sim, existem recursos suficientes (ou é possível aplicar uma abordagem eficiente)',
    question6OptionB: 'Não, não há recursos adequados para o Fine-Tuning',
    
    // Workflow Results - Baseados na metodologia do artigo
    intermediateApproachesTitle: 'Abordagens Intermediárias',
    intermediateApproachesDescription: 'Como o volume de dados permite inserção direta no prompt, você pode utilizar técnicas de adaptação leve que não requerem modificações complexas no modelo. Essas abordagens são eficientes e de baixo custo computacional.',
    intermediateApproachesTechniques: 'Técnicas Principais: Few-Shot Learning, Prompt Engineering, Chain of Thought (CoT), Arquiteturas baseadas em Agentes',
    intermediateApproachesBenefits: 'Benefícios: Baixo custo computacional, implementação rápida, flexibilidade, sem necessidade de re-treinamento',
    
    fineTuningTitle: 'Fine-Tuning',
    fineTuningDescription: 'Estratégia recomendada para ensinar novos comportamentos ao modelo através de ajuste paramétrico. O Fine-Tuning reconfigura os pesos internos do modelo com base nos dados fornecidos, permitindo aprendizado de novos padrões de resposta.',
    fineTuningTechniques: 'Técnicas Principais: Fine-Tuning Completo, LoRA (Low-Rank Adaptation), Prefix-Tuning, Adapters, BitFit',
    fineTuningBenefits: 'Benefícios: Aprendizado permanente de comportamentos, personalização profunda, alta qualidade em domínios específicos',
    
    ragTitle: 'RAG (Retrieval-Augmented Generation)',
    ragDescription: 'Abordagem ideal para fornecer informações contextuais atualizadas ao modelo sem modificar seus parâmetros. O RAG combina geração de texto com recuperação externa de informações em tempo real.',
    ragTechniques: 'Técnicas Principais: Busca Vetorial, Embeddings Semânticos, Indexação de Documentos, APIs de Recuperação, Bases Vetoriais',
    ragBenefits: 'Benefícios: Informações sempre atualizadas, sem re-treinamento, flexibilidade de fontes, baixo custo de manutenção',
    
    hybridApproachTitle: 'Fine-Tuning + RAG (Abordagem Híbrida)',
    hybridApproachDescription: 'Combinação das duas estratégias principais para casos que requerem tanto aprendizado de novos comportamentos quanto acesso a informações contextuais atualizadas. O Fine-Tuning molda o comportamento geral enquanto o RAG fornece dados dinâmicos.',
    hybridApproachTechniques: 'Técnicas Principais: Fine-Tuning para comportamento + RAG para contexto, Pipeline integrado, Arquitetura modular',
    hybridApproachBenefits: 'Benefícios: Máxima adaptabilidade, comportamento personalizado com dados atualizados, solução completa',
    
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