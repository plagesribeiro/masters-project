<script>
  import "../style.css";
  import { onMount } from 'svelte';
  import { initializeLanguage, t } from '$lib';
  
  onMount(() => {
    // Configuração inicial do tema
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
    
    // Inicializar sistema de idiomas
    initializeLanguage();
  });
</script>

<svelte:head>
  <title>{$t('masterDefense')} - {$t('llmTraining')}</title>
  <meta name="description" content="Pesquisa sobre treinamento de Large Language Models" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<main class="min-h-screen bg-base-100 text-base-content">
  <slot />
</main>