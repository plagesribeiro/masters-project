<script>
  import { ThemeToggle, LanguageToggle, t } from '$lib';
  
  export let currentPage = '';
  export let showClearChat = false;
  export let onClearChat = () => {};
</script>

<div class="navbar bg-base-100 shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a href="/explore" class="hover:text-primary">{$t('explore')}</a></li>
        <li><a href="/toy-examples" class="hover:text-primary">{$t('toyExamples')}</a></li>
        <li><a href="https://1drv.ms/f/c/7075a1ac85c5536d/EiVohgvkV0dHov3GEVlRzFEBhS56qSAs5Mbf3mSSk0PRmA?e=vied8c" target="_blank" class="hover:text-primary">{$t('paper')}</a></li>
      </ul>
    </div>
    <a href="/" class="btn btn-ghost text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      LLM Training Helper
    </a>
  </div>
  
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li>
        <a 
          href="/" 
          class="hover:text-primary transition-colors duration-300 {currentPage === 'home' ? 'text-primary font-semibold' : ''}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          {$t('home')}
        </a>
      </li>
      <li>
        <a 
          href="/explore" 
          class="hover:text-primary transition-colors duration-300 {currentPage === 'explore' ? 'text-primary font-semibold' : ''}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          {$t('explore')}
        </a>
      </li>
      <li>
        <a 
          href="/toy-examples" 
          class="hover:text-primary transition-colors duration-300 {currentPage === 'toy-examples' ? 'text-secondary font-semibold' : ''}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          </svg>
          {$t('toyExamples')}
        </a>
      </li>
      {#if currentPage !== 'chat'}
        <li>
          <a 
            href="https://1drv.ms/f/c/7075a1ac85c5536d/EiVohgvkV0dHov3GEVlRzFEBhS56qSAs5Mbf3mSSk0PRmA?e=vied8c" 
            target="_blank"
            class="hover:text-primary transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            {$t('paper')}
          </a>
        </li>
      {/if}
    </ul>
  </div>
  
  <div class="navbar-end gap-2">
    {#if showClearChat}
      <button 
        aria-label={$t('clearChat')}
        class="btn btn-ghost btn-sm" 
        on:click={onClearChat}
        title={$t('clearChat')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
    {/if}
    <LanguageToggle />
    <ThemeToggle />
  </div>
</div> 