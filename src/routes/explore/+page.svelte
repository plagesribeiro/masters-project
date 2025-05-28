<script>
  import { Footer, Navbar, t } from '$lib';
</script>

<svelte:head>
  <title>{$t('exploreTitle')} - {$t('masterDefense')} | Pedro Ribeiro</title>
  <meta name="description" content="Explore ferramentas interativas para LLM training" />
</svelte:head>

<Navbar currentPage="explore" />

<!-- Hero Section -->
<div class="hero min-h-[40vh] bg-gradient-to-br from-primary/10 to-secondary/10">
  <div class="hero-content text-center">
    <div class="max-w-4xl">
      <h1 class="text-5xl font-bold text-primary mb-6">{$t('exploreTitle')}</h1>
      <p class="text-xl mb-8 text-base-content/80 max-w-2xl mx-auto">
        {$t('exploreSubtitle')}
      </p>
    </div>
  </div>
</div>

<!-- Main Content -->
<div class="container mx-auto px-4 py-16">
  <!-- Options Grid -->
  <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
    
    <!-- AI Chat Option -->
    <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <figure class="px-10 pt-10">
        <div class="avatar">
          <div class="w-24 rounded-full bg-primary text-primary-content !flex !items-center !justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
        </div>
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title text-2xl mb-4 text-primary">{$t('aiChatTitle')}</h2>
        <p class="text-base-content/80 mb-6 leading-relaxed">
          {$t('aiChatDescription')}
        </p>
        
        <!-- Features List -->
        <div class="w-full mb-6">
          <div class="flex items-center gap-3 mb-2">
            <div class="badge badge-primary badge-sm"></div>
            <span class="text-sm">{$t('articleBasedResponses')}</span>
          </div>
          <div class="flex items-center gap-3 mb-2">
            <div class="badge badge-primary badge-sm"></div>
            <span class="text-sm">{$t('detailedExplanations')}</span>
          </div>
          <div class="flex items-center gap-3 mb-2">
            <div class="badge badge-primary badge-sm"></div>
            <span class="text-sm">{$t('academicContext')}</span>
          </div>
        </div>
        
        <div class="card-actions">
          <a href="/explore/chat" class="btn btn-primary btn-wide">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.691 1.342 3.06 3 3.06h.75l3.75 3.75 3.75-3.75h.75c1.658 0 3-1.369 3-3.06V5.69c0-1.691-1.342-3.06-3-3.06H5.25c-1.658 0-3 1.369-3 3.06v6.75z" />
            </svg>
            {$t('startChat')}
          </a>
        </div>
        
        <div class="badge badge-success badge-outline mt-2">{$t('available')}</div>
      </div>
    </div>

    <!-- Methodology Execution Option -->
    <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <figure class="px-10 pt-10">
        <div class="avatar">
          <div class="w-24 rounded-full bg-secondary text-secondary-content !flex !items-center !justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title text-2xl mb-4 text-secondary">{$t('methodologyTitle')}</h2>
        <p class="text-base-content/80 mb-6 leading-relaxed">
          {$t('methodologyDescription')}
        </p>
        
        <!-- Features List -->
        <div class="w-full mb-6">
          <div class="flex items-center gap-3 mb-2">
            <div class="badge badge-secondary badge-sm"></div>
            <span class="text-sm">{$t('guidedWorkflow')}</span>
          </div>
          <div class="flex items-center gap-3 mb-2">
            <div class="badge badge-secondary badge-sm"></div>
            <span class="text-sm">{$t('sequentialQuestions')}</span>
          </div>
          <div class="flex items-center gap-3 mb-2">
            <div class="badge badge-secondary badge-sm"></div>
            <span class="text-sm">{$t('personalizedResults')}</span>
          </div>
        </div>
        
        <div class="card-actions">
          <a href="/explore/workflow" class="btn btn-secondary btn-wide">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
            {$t('startWorkflow')}
          </a>
        </div>
        
        <div class="badge badge-success badge-outline mt-2">{$t('available')}</div>
      </div>
    </div>
  </div>

  <!-- Additional Information Section -->
  <div class="mt-16 max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-base-content mb-4">{$t('howItWorks')}</h2>
      <p class="text-lg text-base-content/70">
        {$t('howItWorksSubtitle')}
      </p>
    </div>
    
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Chat Process -->
      <div class="card bg-base-200">
        <div class="card-body">
          <h3 class="card-title text-primary mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            {$t('aiChatTitle')}
          </h3>
          <div class="steps steps-vertical">
            <div class="step step-primary">{$t('askQuestion')}</div>
            <div class="step step-primary">{$t('aiAnalyzes')}</div>
            <div class="step step-primary">{$t('receiveResponse')}</div>
          </div>
        </div>
      </div>
      
      <!-- Methodology Process -->
      <div class="card bg-base-200">
        <div class="card-body">
          <h3 class="card-title text-secondary mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {$t('methodologyTitle')}
          </h3>
          <div class="steps steps-vertical">
            <div class="step step-secondary">{$t('answerInitial')}</div>
            <div class="step step-secondary">{$t('systemDirects')}</div>
            <div class="step step-secondary">{$t('receiveMethodology')}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<Footer />
