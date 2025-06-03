<script>
  import { Footer, Navbar, t } from '$lib';
  import { onMount } from 'svelte';
  
  let isVisible = false;
  
  onMount(() => {
    setTimeout(() => {
      isVisible = true;
    }, 100);
  });

  const toyExamples = [
    {
      id: 1,
      available: true,
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
      </svg>`,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      href: '/toy-examples/alternative-approaches'
    },
    {
      id: 2,
      available: true,
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>`,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      href: '/toy-examples/rag'
    },
    {
      id: 3,
      available: false,
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>`,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
      href: '#'
    },
    {
      id: 4,
      available: false,
      icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>`,
      color: 'text-info',
      bgColor: 'bg-info/10',
      borderColor: 'border-info/20',
      href: '#'
    }
  ];
</script>

<svelte:head>
  <title>{$t('toyExamplesTitle')} - {$t('masterDefense')} | Pedro Ribeiro</title>
  <meta name="description" content="Exemplos práticos de treinamento de LLM" />
</svelte:head>

<Navbar currentPage="toy-examples" />

<!-- Hero Section -->
<div class="hero min-h-[60vh] bg-gradient-to-br from-secondary/10 to-accent/10 relative overflow-hidden">
  <!-- Background Animation -->
  <div class="absolute inset-0 opacity-5">
    <div class="absolute top-20 left-20 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
    <div class="absolute bottom-20 right-10 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-3000"></div>
  </div>
  
  <div class="hero-content text-center relative z-10">
    <div class="max-w-4xl">
      <div class="hero-title {isVisible ? 'animate-fade-in-up' : 'opacity-0'}">
        <h1 class="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
          {$t('toyExamplesTitle')}
        </h1>
        <p class="text-lg lg:text-xl mb-8 text-base-content/80 max-w-3xl mx-auto leading-relaxed">
          {$t('toyExamplesSubtitle')}
        </p>
      </div>
    </div>
  </div>
</div>

<!-- Examples Grid Section -->
<section class="py-20 bg-base-100">
  <div class="container mx-auto px-4">
    <div class="max-w-7xl mx-auto">
      
      <!-- Grid of Examples -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {#each toyExamples as example, index}
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 {isVisible ? 'animate-fade-in-up' : 'opacity-0'}" 
               style="animation-delay: {index * 200}ms">
            
            <div class="card-body relative">
              <!-- Status Badge -->
              <div class="absolute top-4 right-4">
                {#if example.available}
                  <div class="badge badge-success gap-2 !flex !justify-center !items-center">
                    <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    {$t('available')}
                  </div>
                {:else}
                  <div class="badge badge-warning gap-2">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {$t('comingSoon')}
                  </div>
                {/if}
              </div>
              
              <!-- Icon -->
              <div class="flex justify-center mb-6">
                <div class="p-4 rounded-full {example.bgColor} {example.color}">
                  {@html example.icon}
                </div>
              </div>
              
              <!-- Title -->
              <h3 class="card-title text-2xl mb-4 text-center justify-center {example.color}">
                {#if example.id === 1}
                  {$t('toyExample1Title')}
                {:else if example.id === 2}
                  {$t('toyExample2Title')}
                {:else if example.id === 3}
                  {$t('toyExample3Title')}
                {:else if example.id === 4}
                  {$t('toyExample4Title')}
                {/if}
              </h3>
              
              <!-- Description -->
              <p class="text-base-content/80 mb-6 text-center leading-relaxed">
                {#if example.id === 1}
                  {$t('toyExample1Description')}
                {:else if example.id === 2}
                  {$t('toyExample2Description')}
                {:else if example.id === 3}
                  {$t('toyExample3Description')}
                {:else if example.id === 4}
                  {$t('toyExample4Description')}
                {/if}
              </p>
              
              <!-- Features -->
              <div class="mb-6">
                <h4 class="font-semibold mb-3 text-sm uppercase tracking-wide text-base-content/60">
                  {$t('features')}
                </h4>
                <p class="text-sm text-base-content/70 leading-relaxed">
                  {#if example.id === 1}
                    {$t('toyExample1Features')}
                  {:else if example.id === 2}
                    {$t('toyExample2Features')}
                  {:else if example.id === 3}
                    {$t('toyExample3Features')}
                  {:else if example.id === 4}
                    {$t('toyExample4Features')}
                  {/if}
                </p>
              </div>
              
              <!-- Action Button -->
              <div class="card-actions justify-center">
                {#if example.available}
                  <a 
                    href={example.href}
                    class="btn btn-primary btn-wide hover:scale-105 transition-all duration-300 shadow-lg group"
                  >
                    <svg class="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                    {$t('tryNow')}
                  </a>
                {:else}
                  <button 
                    class="btn btn-outline btn-wide cursor-not-allowed opacity-50"
                    disabled
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {$t('inDevelopment')}
                  </button>
                {/if}
              </div>
              
              <!-- Progress indicator for coming soon items -->
              {#if !example.available}
                <div class="mt-4">
                  <div class="text-xs text-base-content/50 mb-2 text-center">
                    {$t('developmentInProgress')}
                  </div>
                  <div class="w-full bg-base-300 rounded-full h-1">
                    <div class="bg-gradient-to-r from-warning to-success h-1 rounded-full" style="width: {example.id === 3 ? '65%' : '25%'}"></div>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Coming Soon Info -->
      <div class="text-center">
        <div class="alert alert-info max-w-2xl mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div>
            <h3 class="font-bold">{$t('newExamplesInDevelopment')}</h3>
            <div class="text-sm">{$t('examplesComingSoonMessage')}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<Footer />

<style>
  .animation-delay-3000 {
    animation-delay: 3s;
  }
  
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  
  .hero-title h1 {
    background-size: 200% 200%;
    animation: gradient-shift 4s ease infinite;
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
</style> 