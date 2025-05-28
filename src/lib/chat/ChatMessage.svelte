<script>
  import { t } from '$lib';
  
  export let message;
  
  /** @param {Date} date */
  function formatTime(date) {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  
  /** @param {string} text */
  function parseMarkdown(text) {
    if (!text) return '';
    
    let html = text
      // Convert line breaks
      .replace(/\n/g, '<br>')
      // Convert bold text **text** or __text__
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      // Convert italic text *text* or _text_
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      // Convert inline code `code`
      .replace(/`(.*?)`/g, '<code class="bg-base-300 px-1 py-0.5 rounded text-sm">$1</code>')
      // Convert unordered lists - item
      .replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>')
      // Convert numbered lists 1. item
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>')
      // Convert headers ### Header
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-2 mb-1">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-3 mb-2">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-3">$1</h1>');
    
    // Wrap consecutive list items in ul tags
    html = html.replace(/(<li class="ml-4">.*?<\/li>)(\s*<li class="ml-4">.*?<\/li>)*/g, function(match) {
      return '<ul class="list-none space-y-1 my-2">' + match + '</ul>';
    });
    
    return html;
  }
</script>

<div class="chat {message.isUser ? 'chat-end' : 'chat-start'} text-sm md:text-base">
  <div class="chat-image avatar">
    <div class="w-6 md:w-10 rounded-full !flex !items-center !justify-center {message.isUser ? 'bg-secondary text-secondary-content' : 'bg-primary text-primary-content'}">
      {#if message.isUser}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 md:w-5 md:h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 md:w-5 md:h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      {/if}
    </div>
  </div>
  <div class="chat-header text-xs md:text-sm">
    {message.isUser ? $t('you') : $t('aiSpecialist')}
    <time class="text-xs opacity-50 ml-1">{formatTime(message.timestamp)}</time>
  </div>
  <div class="chat-bubble {message.isUser ? 'chat-bubble-secondary' : message.isError ? 'chat-bubble-error' : 'chat-bubble-primary'} text-sm md:text-base leading-relaxed">
    {@html parseMarkdown(message.text)}
  </div>
</div>

<style>
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
  
  /* Mobile-specific chat bubble adjustments */
  @media (max-width: 768px) {
    .chat-bubble {
      max-width: calc(100vw - 6rem);
      font-size: 0.875rem;
      line-height: 1.4;
      padding: 0.75rem;
    }
  }
  
  /* Markdown styling within chat bubbles */
  .chat-bubble :global(strong) {
    font-weight: 700;
  }
  
  .chat-bubble :global(em) {
    font-style: italic;
  }
  
  .chat-bubble :global(code) {
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }
  
  .chat-bubble :global(h1),
  .chat-bubble :global(h2),
  .chat-bubble :global(h3) {
    color: inherit;
  }
  
  .chat-bubble :global(ul) {
    margin: 0.5rem 0;
  }
  
  .chat-bubble :global(li) {
    margin: 0.25rem 0;
  }
</style> 