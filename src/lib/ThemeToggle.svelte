<script>
  import { onMount } from 'svelte';
  import { t } from '$lib';
  
  let isDark = false;
  
  onMount(() => {
    // Recupera o tema salvo ou usa a preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    isDark = savedTheme ? savedTheme === 'dark' : systemDark;
    updateTheme();
  });
  
  function toggleTheme() {
    isDark = !isDark;
    updateTheme();
  }
  
  function updateTheme() {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
</script>

<div class="dropdown dropdown-end">
  <div tabindex="0" role="button" class="btn btn-ghost btn-circle hover:scale-110 transition-all duration-300">
    {#if isDark}
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.364A9 9 0 018.636 3.636 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.636z"/>
      </svg>
    {:else}
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    {/if}
  </div>
  
  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-base-300">
    <li>
      <button 
        class="flex items-center gap-3 {!isDark ? 'active bg-primary text-primary-content' : ''}"
        on:click={() => { isDark = false; updateTheme(); }}
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
        {$t('lightTheme')}
      </button>
    </li>
    <li>
      <button 
        class="flex items-center gap-3 {isDark ? 'active bg-primary text-primary-content' : ''}"
        on:click={() => { isDark = true; updateTheme(); }}
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.364A9 9 0 018.636 3.636 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.636z"/>
        </svg>
        {$t('darkTheme')}
      </button>
    </li>
  </ul>
</div>

<style>
  .dropdown-content {
    animation: fadeInScale 0.2s ease-out;
  }
  
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
</style> 