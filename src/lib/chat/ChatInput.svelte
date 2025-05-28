<script>
  import { t } from '$lib';
  
  export let inputMessage = '';
  export let isLoading = false;
  export let isRecording = false;
  export let onSendMessage = () => {};
  export let onStartRecording = () => {};
  export let onStopRecording = () => {};
  
  /** @type {HTMLTextAreaElement} */
  let textareaElement;
  
  /** @param {KeyboardEvent} event */
  function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSendMessage();
    }
  }
  
  /** @param {Event} event */
  function adjustTextareaHeight(event) {
    const textarea = /** @type {HTMLTextAreaElement} */ (event.target);
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px'; // Max height of 128px (8rem)
  }
  
  export function focusInput() {
    if (textareaElement) {
      textareaElement.focus();
    }
  }
</script>

<div class="border-t border-base-300 bg-base-100 sticky bottom-0">
  <div class="container mx-auto px-3 py-2 md:px-4 md:py-4">
    <div class="max-w-4xl mx-auto">
      <!-- Input Container -->
      <div class="relative">
        <div class="input-container flex items-end gap-2 md:gap-3 bg-base-200 rounded-2xl p-2 md:p-3 shadow-lg border border-base-300 focus-within:border-primary transition-colors duration-200">
          <!-- Voice Recording Button -->
          <button
            class="btn btn-circle btn-xs md:btn-sm {isRecording ? 'btn-error recording-pulse' : 'btn-ghost hover:btn-secondary'} flex-shrink-0"
            on:click={isRecording ? onStopRecording : onStartRecording}
            disabled={isLoading}
            title={isRecording ? $t('recording') : 'Gravar áudio'}
          >
            {#if isRecording}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3 md:w-4 md:h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
              </svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3 md:w-4 md:h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            {/if}
          </button>
          
          <!-- Text Input -->
          <div class="flex-1 relative">
            <textarea
              bind:value={inputMessage}
              on:keypress={handleKeyPress}
              on:input={adjustTextareaHeight}
              placeholder={$t('chatPlaceholder')}
              class="dynamic-textarea textarea textarea-ghost w-full resize-none overflow-hidden !bg-transparent border-none focus:outline-none placeholder:text-base-content/50 leading-5 md:leading-6 py-1.5 md:py-2 px-0 min-h-[2rem] md:min-h-[2.5rem] max-h-32 text-sm md:text-base"
              rows="1"
              disabled={isLoading}
              style="field-sizing: content;"
              bind:this={textareaElement}
            ></textarea>
          </div>
          
          <!-- Send Button -->
          <button
            class="btn btn-circle btn-xs md:btn-sm {inputMessage.trim() && !isLoading ? 'btn-primary' : 'btn-ghost'} flex-shrink-0 transition-all duration-200"
            on:click={onSendMessage}
            disabled={!inputMessage.trim() || isLoading}
          >
            {#if isLoading}
              <span class="loading loading-spinner loading-xs"></span>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3 md:w-4 md:h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            {/if}
          </button>
        </div>
        
        <!-- Recording Indicator -->
        {#if isRecording}
          <div class="absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2">
            <div class="bg-error text-error-content px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium flex items-center gap-1 md:gap-2 shadow-lg">
              <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-error-content rounded-full animate-pulse"></div>
              {$t('recording')}
            </div>
          </div>
        {/if}
      </div>
      
      <!-- Help Text -->
      <div class="text-center mt-2 md:mt-3">
        <p class="text-xs text-base-content/50 flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <span class="flex items-center gap-1">
            <kbd class="kbd kbd-xs">Enter</kbd>
            <span>{$t('send')}</span>
          </span>
          <span class="hidden sm:flex items-center gap-1">
            <kbd class="kbd kbd-xs">Shift</kbd>
            <span>+</span>
            <kbd class="kbd kbd-xs">Enter</kbd>
            <span>{$t('newLine')}</span>
          </span>
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .dynamic-textarea {
    transition: height 0.1s ease-out;
  }
  
  /* Input container focus effect */
  .input-container:focus-within {
    box-shadow: 0 0 0 2px hsl(var(--p) / 0.2);
  }
  
  /* Recording pulse effect */
  .recording-pulse {
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  /* Mobile-specific adjustments */
  @media (max-width: 768px) {
    .btn-circle.btn-xs {
      width: 2rem;
      height: 2rem;
      min-height: 2rem;
    }
  }
</style> 