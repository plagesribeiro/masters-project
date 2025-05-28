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
  
  // Scroll to bottom when new messages are added
  $effect(() => { if (messages.length > 0 && chatContainer) {
    setTimeout(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
  }});
  
  onMount(() => {
    // Add welcome message
    messages = [{
      id: Date.now(),
      text: $t('welcomeMessage'),
      isUser: false,
      timestamp: new Date()
    }];
    
    // Focus on input when page loads
    setTimeout(() => {
      if (chatInputComponent) {
        chatInputComponent.focusInput();
      }
    }, 100);
  });
  
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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          history: messages,
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
    messages = [{
      id: Date.now(),
      text: $t('chatCleared'),
      isUser: false,
      timestamp: new Date()
    }];
    
    // Focus on input after clearing chat
    setTimeout(() => {
      if (chatInputComponent) {
        chatInputComponent.focusInput();
      }
    }, 100);
  }
</script>

<svelte:head>
  <title>{$t('aiChatTitle')} - {$t('masterDefense')} | Pedro Ribeiro</title>
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

<div class="h-screen flex flex-col">
  <Navbar currentPage="chat" showClearChat={true} onClearChat={clearChat} />
  
  <ChatHeader />

  <!-- Chat Container -->
  <div class="flex-1 flex flex-col min-h-0">
    <!-- Messages Area -->
    <div class="flex-1 flex justify-center min-h-0">
      <div 
        class="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-4 flex flex-col-reverse max-w-4xl" 
        bind:this={chatContainer}
      >
       {#if isLoading}
          <div class="chat chat-start text-sm md:text-base">
            <div class="chat-image avatar">
              <div class="w-6 md:w-10 rounded-full bg-primary text-primary-content !flex !items-center !justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 md:w-5 md:h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
            </div>
            <div class="chat-header text-xs md:text-sm">
              {$t('aiSpecialist')}
            </div>
            <div class="chat-bubble chat-bubble-primary text-sm md:text-base">
              <span class="loading loading-dots loading-sm"></span>
            </div>
          </div>
        {/if}
        {#each messages as message (message.id)}
          <ChatMessage {message} />
        {/each}
      </div>
    </div>
    
    <!-- Input Area -->
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