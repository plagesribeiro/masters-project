<script>
  import { onMount } from 'svelte';
  import { Navbar, ChatHeader, ChatMessage, ChatInput, t, currentLanguage } from '$lib';
  
  /** @type {Array<{id: number, text: string, isUser: boolean, timestamp: Date, isError?: boolean}>} */
  let messages = $state([]);
  let inputMessage = $state('');
  let isLoading = $state(false);
  let isRecording = $state(false);
  /** @type {MediaRecorder | null} */
  let mediaRecorder = $state(null);
  /** @type {Blob[]} */
  let audioChunks = $state([]);
  /** @type {HTMLElement} */
  let chatContainer;
  /** @type {ChatInput} */
  let chatInputComponent;
  
  // Chave para localStorage
  const STORAGE_KEY = 'rag-electronics-messages';
  
  // Scroll to bottom when new messages are added
  $effect(() => { if (messages.length > 0 && chatContainer) {
    setTimeout(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
  }});

  // Salvar mensagens no localStorage sempre que mudarem
  $effect(() => {
    if (messages.length > 0) {
      saveMessagesToStorage();
    }
  });
  
  onMount(() => {
    loadMessagesFromStorage();
    
    // Focus on input when page loads
    setTimeout(() => {
      if (chatInputComponent) {
        chatInputComponent.focusInput();
      }
    }, 100);
  });

  function saveMessagesToStorage() {
    try {
      const messagesToSave = messages.map(msg => ({
        id: msg.id,
        text: msg.text,
        isUser: msg.isUser,
        timestamp: msg.timestamp.toISOString(),
        isError: msg.isError || false
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messagesToSave));
      console.log('RAG messages saved to localStorage:', messagesToSave.length);
    } catch (error) {
      console.error('Error saving RAG messages to localStorage:', error);
    }
  }

  function loadMessagesFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedMessages = JSON.parse(stored);
        messages = [];
        for (const storedMsg of parsedMessages) {
          messages.push({
            ...storedMsg,
            timestamp: new Date(storedMsg.timestamp)
          });
        }
        console.log('RAG messages loaded from localStorage:', messages.length);
        return;
      }
    } catch (error) {
      console.error('Error loading RAG messages from localStorage:', error);
    }
    
    // Se não há mensagens salvas ou erro, adicionar mensagem de boas-vindas
    addWelcomeMessage();
  }

  function addWelcomeMessage() {
    messages = [{
      id: Date.now(),
      text: 'Olá! Bem-vindo à TechStore! 🖥️ Sou seu assistente especializado em eletrônicos e componentes tecnológicos. Posso te ajudar a encontrar o produto ideal - notebooks, smartphones, placas de vídeo, periféricos e muito mais! Tenho acesso a um catálogo atualizado em tempo real com milhares de produtos. Qual tipo de dispositivo você está procurando?',
      isUser: false,
      timestamp: new Date()
    }];
  }
  
  async function sendMessage() {
    if (!inputMessage.trim() || isLoading) return;
    
    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    messages.unshift(userMessage);
    const currentInput = inputMessage;
    inputMessage = '';
    isLoading = true;
    
    try {
      // Preparar histórico para envio (últimas 20 mensagens, excluindo a atual)
      const historyForAPI = messages.slice(1, 21).reverse().map(msg => ({
        text: msg.text,
        isUser: msg.isUser,
        timestamp: msg.timestamp
      }));

      const response = await fetch('/api/toy-examples/rag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          history: historyForAPI,
          language: $currentLanguage
        })
      });
      
      if (!response.ok) {
        throw new Error($t('communicationError'));
      }
      
      const data = await response.json();
      
      const aiMessage = {
        id: Date.now() + 1,
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };
      
      messages.unshift(aiMessage);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: $t('errorProcessing'),
        isUser: false,
        timestamp: new Date(),
        isError: true
      };
      messages.unshift(errorMessage);
    } finally {
      isLoading = false;
      // Focus back on input after sending message
      setTimeout(() => {
        if (chatInputComponent) {
          chatInputComponent.focusInput();
        }
      }, 100);
    }
  }
  
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      isRecording = true;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert($t('microphoneError'));
    }
  }
  
  function stopRecording() {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      isRecording = false;
    }
  }
  
  /** @param {Blob} audioBlob */
  async function transcribeAudio(audioBlob) {
    isLoading = true;
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');
      
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error($t('transcriptionError'));
      }
      
      const data = await response.json();
      inputMessage = data.text;
      
      // Auto-send the transcribed message
      if (inputMessage.trim()) {
        await sendMessage();
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
      alert($t('transcriptionErrorMessage'));
      // Focus on input even if transcription fails
      setTimeout(() => {
        if (chatInputComponent) {
          chatInputComponent.focusInput();
        }
      }, 100);
    } finally {
      isLoading = false;
    }
  }
  
  function clearChat() {
    // Limpar mensagens da memória
    messages = [];
    
    // Limpar localStorage
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('RAG chat history cleared from localStorage');
    } catch (error) {
      console.error('Error clearing RAG localStorage:', error);
    }
    
    // Adicionar nova mensagem de boas-vindas
    addWelcomeMessage();
    
    // Focus on input after clearing chat
    setTimeout(() => {
      if (chatInputComponent) {
        chatInputComponent.focusInput();
      }
    }, 100);
  }
</script>

<svelte:head>
  <title>TechStore - Loja de Eletrônicos com RAG - {$t('masterDefense')} | Pedro Ribeiro</title>
  <style>
    /* Chat bubble animations */
    .chat {
      animation: fadeInUp 0.3s ease-out;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
</svelte:head>

<div class="h-screen flex flex-col overflow-hidden">
  <Navbar currentPage="toy-examples" showClearChat={true} onClearChat={clearChat} />
  
  <!-- Custom Header for TechStore - Fixed -->
  <div class="bg-info text-info-content py-3 px-4 shadow-lg flex-shrink-0">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-info-content/20 rounded-full">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-lg md:text-xl font-bold">TechStore - Eletrônicos</h1>
          <p class="text-xs md:text-sm opacity-90">Assistente com RAG e Busca Vetorial</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <a 
          href="/toy-examples/rag/dados"
          class="btn btn-xs md:btn-sm btn-ghost text-info-content border-info-content/30 hover:bg-info-content/20"
        >
          <svg class="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
          </svg>
          <span class="hidden md:inline">Ver Banco de Dados</span>
          <span class="md:hidden">DB</span>
        </a>
        <a 
          href="/toy-examples/rag/about" 
          class="btn btn-xs md:btn-sm btn-ghost text-info-content border-info-content/30 hover:bg-info-content/20"
        >
          <svg class="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="hidden md:inline">{$t('aboutExample')}</span>
          <span class="md:hidden">Info</span>
        </a>
        <a 
          href="/toy-examples" 
          class="btn btn-xs md:btn-sm btn-ghost text-info-content border-info-content/30 hover:bg-info-content/20"
        >
          <svg class="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span class="hidden md:inline">{$t('toyExamples')}</span>
          <span class="md:hidden">Voltar</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Chat Container - Flexible with proper overflow -->
  <div class="flex-1 flex flex-col min-h-0 overflow-hidden">
    <!-- Messages Area - Scrollable -->
    <div class="flex-1 flex justify-center overflow-hidden">
      <div 
        class="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-4 flex flex-col-reverse max-w-4xl" 
        bind:this={chatContainer}
        style="height: 100%;"
      >
       {#if isLoading}
          <div class="chat chat-start text-sm md:text-base">
            <div class="chat-image avatar">
              <div class="w-6 md:w-10 rounded-full bg-info text-info-content !flex !items-center !justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 md:w-5 md:h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div class="chat-header text-xs md:text-sm">
              TechStore - Assistente RAG
            </div>
            <div class="chat-bubble chat-bubble-info text-sm md:text-base">
              <span class="loading loading-dots loading-sm"></span>
            </div>
          </div>
        {/if}
        {#each messages as message (message.id)}
          <ChatMessage {message} />
        {/each}
      </div>
    </div>
    
    <!-- Input Area - Fixed at bottom -->
    <div class="flex-shrink-0">
      <ChatInput 
        bind:inputMessage
        {isLoading}
        {isRecording}
        onSendMessage={sendMessage}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        bind:this={chatInputComponent}
      />
    </div>
  </div>
</div> 