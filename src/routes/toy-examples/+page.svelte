<script>
  import { Footer, Navbar, t } from '$lib';
</script>

<svelte:head>
  <title>{$t('toyExamplesTitle')} - {$t('masterDefense')} | Pedro Ribeiro</title>
  <meta name="description" content="Exemplos práticos de treinamento de LLM" />
</svelte:head>

<Navbar currentPage="toy-examples" />

<!-- Hero Section -->
<div class="hero min-h-[60vh] bg-gradient-to-br from-secondary/10 to-accent/10">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold text-secondary mb-6">{$t('toyExamplesTitle')}</h1>
      <p class="text-lg mb-8 text-base-content/80">
        {$t('toyExamplesSubtitle')}
      </p>
      <div class="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <span>{$t('pageInDevelopment')}</span>
      </div>
    </div>
  </div>
</div>

<Footer /> 