<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  
  export let message = '';
  export let type = 'success'; // success, error, warning, info
  export let duration = 3000;
  export let visible = false;
  
  const dispatch = createEventDispatcher();
  
  let toastElement: HTMLDivElement;
  let timeoutId: number | undefined;
  
  $: if (visible) {
    showToast();
  }
  
  function showToast() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      hideToast();
    }, duration);
  }
  
  function hideToast() {
    visible = false;
    dispatch('hide');
  }
  
  function getToastClass() {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      case 'warning':
        return 'alert-warning';
      case 'info':
        return 'alert-info';
      default:
        return 'alert-success';
    }
  }
  
  function getIcon() {
    switch (type) {
      case 'success':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>`;
      case 'error':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>`;
      case 'warning':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"/>`;
      case 'info':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`;
      default:
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>`;
    }
  }
</script>

{#if visible}
  <div 
    bind:this={toastElement}
    class="toast toast-bottom toast-end z-[9999] transition-all duration-300 ease-out"
    class:toast-enter={visible}
  >
    <div class="alert {getToastClass()} shadow-lg max-w-sm">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        {@html getIcon()}
      </svg>
      <span class="text-sm font-medium">{message}</span>
      <button 
        class="btn btn-sm btn-circle btn-ghost ml-2 hover:bg-opacity-20"
        on:click={hideToast}
        aria-label="Fechar notificação"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
{/if}

<style>
  .toast-enter {
    animation: slideDown 0.3s ease-out;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(100px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    transform: none;
    pointer-events: all;
  }
  
  .alert {
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
</style> 