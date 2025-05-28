<script>
  import { currentLanguage, setLanguage } from './i18n';
  
  function toggleLanguage() {
    const newLang = $currentLanguage === 'en' ? 'pt' : 'en';
    setLanguage(newLang);
  }
</script>

<div class="dropdown dropdown-end">
  <div tabindex="0" role="button" class="btn btn-ghost btn-circle" title="Change Language / Mudar Idioma">
    {#if $currentLanguage === 'en'}
      <!-- US Flag -->
      <svg class="w-6 h-6" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="16" fill="#B22234"/>
        <rect y="1.23" width="24" height="1.23" fill="white"/>
        <rect y="3.69" width="24" height="1.23" fill="white"/>
        <rect y="6.15" width="24" height="1.23" fill="white"/>
        <rect y="8.62" width="24" height="1.23" fill="white"/>
        <rect y="11.08" width="24" height="1.23" fill="white"/>
        <rect y="13.54" width="24" height="1.23" fill="white"/>
        <rect width="9.6" height="8.62" fill="#3C3B6E"/>
        <g fill="white">
          <circle cx="1.6" cy="1.23" r="0.31"/>
          <circle cx="3.2" cy="1.23" r="0.31"/>
          <circle cx="4.8" cy="1.23" r="0.31"/>
          <circle cx="6.4" cy="1.23" r="0.31"/>
          <circle cx="8" cy="1.23" r="0.31"/>
          <circle cx="2.4" cy="2.46" r="0.31"/>
          <circle cx="4" cy="2.46" r="0.31"/>
          <circle cx="5.6" cy="2.46" r="0.31"/>
          <circle cx="7.2" cy="2.46" r="0.31"/>
          <circle cx="1.6" cy="3.69" r="0.31"/>
          <circle cx="3.2" cy="3.69" r="0.31"/>
          <circle cx="4.8" cy="3.69" r="0.31"/>
          <circle cx="6.4" cy="3.69" r="0.31"/>
          <circle cx="8" cy="3.69" r="0.31"/>
          <circle cx="2.4" cy="4.92" r="0.31"/>
          <circle cx="4" cy="4.92" r="0.31"/>
          <circle cx="5.6" cy="4.92" r="0.31"/>
          <circle cx="7.2" cy="4.92" r="0.31"/>
          <circle cx="1.6" cy="6.15" r="0.31"/>
          <circle cx="3.2" cy="6.15" r="0.31"/>
          <circle cx="4.8" cy="6.15" r="0.31"/>
          <circle cx="6.4" cy="6.15" r="0.31"/>
          <circle cx="8" cy="6.15" r="0.31"/>
          <circle cx="2.4" cy="7.38" r="0.31"/>
          <circle cx="4" cy="7.38" r="0.31"/>
          <circle cx="5.6" cy="7.38" r="0.31"/>
          <circle cx="7.2" cy="7.38" r="0.31"/>
        </g>
      </svg>
    {:else}
      <!-- Brazil Flag -->
      <svg class="w-6 h-6" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="16" fill="#009739"/>
        <path d="M12 2L20 8L12 14L4 8L12 2Z" fill="#FEDD00"/>
        <circle cx="12" cy="8" r="3.5" fill="#012169"/>
        <path d="M9 7.5C9 7.5 10.5 6.5 12 7.5C13.5 6.5 15 7.5 15 7.5C15 8.5 13.5 9.5 12 8.5C10.5 9.5 9 8.5 9 7.5Z" fill="white"/>
      </svg>
    {/if}
  </div>
  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
    <li>
      <button 
        class="flex items-center gap-2 {$currentLanguage === 'en' ? 'active' : ''}" 
        on:click={() => setLanguage('en')}
      >
        <svg class="w-4 h-4" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="16" fill="#B22234"/>
          <rect y="1.23" width="24" height="1.23" fill="white"/>
          <rect y="3.69" width="24" height="1.23" fill="white"/>
          <rect y="6.15" width="24" height="1.23" fill="white"/>
          <rect y="8.62" width="24" height="1.23" fill="white"/>
          <rect y="11.08" width="24" height="1.23" fill="white"/>
          <rect y="13.54" width="24" height="1.23" fill="white"/>
          <rect width="9.6" height="8.62" fill="#3C3B6E"/>
        </svg>
        English
      </button>
    </li>
    <li>
      <button 
        class="flex items-center gap-2 {$currentLanguage === 'pt' ? 'active' : ''}" 
        on:click={() => setLanguage('pt')}
      >
        <svg class="w-4 h-4" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="16" fill="#009739"/>
          <path d="M12 2L20 8L12 14L4 8L12 2Z" fill="#FEDD00"/>
          <circle cx="12" cy="8" r="3.5" fill="#012169"/>
        </svg>
        Português
      </button>
    </li>
  </ul>
</div>

<style>
  .active {
    background-color: hsl(var(--p) / 0.1);
    color: hsl(var(--p));
  }
</style> 