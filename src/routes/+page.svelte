<script>
  import { Footer, Navbar, t } from '$lib';
  import { onMount } from 'svelte';
  
  let isVisible = false;
  
  onMount(() => {
    setTimeout(() => {
      isVisible = true;
    }, 100);
  });
  
  
  function downloadPDF() {
    const link = 'https://1drv.ms/f/c/7075a1ac85c5536d/EiVohgvkV0dHov3GEVlRzFEBhS56qSAs5Mbf3mSSk0PRmA?e=vied8c'
    window.open(link, '_blank');
  }
  

</script>

<svelte:head>
  <title>{$t('masterDefense')} - {$t('llmTraining')} | Pedro Ribeiro</title>
  <meta name="description" content="Pesquisa sobre treinamento de Large Language Models" />
</svelte:head>

<Navbar currentPage="home" />

<!-- Hero Section -->
<div class="hero min-h-[90vh] bg-gradient-to-br from-base-200 to-base-300 relative overflow-hidden">
  <!-- Background Animation -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
    <div class="absolute top-40 right-20 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
    <div class="absolute bottom-20 left-1/2 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
  </div>
  
  <div class="hero-content text-center relative z-10">
    <div class="max-w-4xl">
      <div class="hero-title {isVisible ? 'animate-fade-in-up' : 'opacity-0'}">
        <h1 class="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
          {$t('masterDefense')}
        </h1>
        <h2 class="text-3xl lg:text-4xl font-semibold mb-8 text-base-content">
          {$t('llmTraining')}
        </h2>
      </div>
      
      <div class="subtitle {isVisible ? 'animate-fade-in-up animation-delay-500' : 'opacity-0'}">
        <p class="text-lg lg:text-xl mb-12 text-base-content/80 max-w-3xl mx-auto leading-relaxed">
          {$t('homeSubtitle')}
        </p>
      </div>
      
      <!-- Action Buttons -->
      <div class="action-buttons {isVisible ? 'animate-fade-in-up animation-delay-1000' : 'opacity-0'}">
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a 
            class="btn btn-primary btn-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
            href="/explore"
          >
            <svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            {$t('exploreResearch')}
          </a>
          
          <a 
            class="btn btn-secondary btn-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
            href="/toy-examples"
          >
            <svg class="w-5 h-5 mr-2 group-hover:bounce transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
            {$t('toyExamples')}
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Paper Section -->
<section id="paper" class="py-20 bg-base-100">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h3 class="text-3xl lg:text-4xl font-bold mb-4 text-base-content">
          {$t('academicPublication')}
        </h3>
        <p class="text-lg text-base-content/70">
          Acesse o artigo completo da pesquisa desenvolvida
        </p>
      </div>
      
      <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div class="card-body">
          <div class="flex flex-col lg:flex-row items-center gap-8">
            <div class="flex-1">
              <h4 class="card-title text-2xl mb-4 text-primary">
                "{$t('paperTitle')}"
              </h4>
              <p class="text-base-content/80 mb-6 leading-relaxed">
                {$t('paperDescription')}
              </p>
              
              <div class="flex flex-wrap gap-2 mb-6">
                <div class="badge badge-primary">{$t('machineLearning')}</div>
                <div class="badge badge-secondary">{$t('naturalLanguageProcessing')}</div>
                <div class="badge badge-accent">{$t('deepLearning')}</div>
                <div class="badge badge-info">{$t('llmTrainingTag')}</div>
              </div>
            </div>
            
            <div class="flex flex-col gap-4">
              <button 
                class="btn btn-primary btn-lg hover:scale-105 transition-all duration-300 shadow-lg group"
                onclick={downloadPDF}
              >
                <svg class="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                {$t('downloadPdf')}
              </button>
              
              <a 
                class="btn btn-outline btn-lg hover:scale-105 transition-all duration-300 group"
                href="https://1drv.ms/f/c/7075a1ac85c5536d/EiVohgvkV0dHov3GEVlRzFEBhS56qSAs5Mbf3mSSk0PRmA?e=vied8c"
                target="_blank"
              >
                <svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                {$t('viewOnline')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<Footer />

<style>
  .animation-delay-500 {
    animation-delay: 0.5s;
  }
  
  .animation-delay-1000 {
    animation-delay: 1s;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
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
  
  .hero-title h1 {
    background-size: 200% 200%;
    animation: gradient-shift 3s ease infinite;
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
</style>
