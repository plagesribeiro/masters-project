<script>
  import { Navbar, Footer, t } from '$lib';
</script>

<svelte:head>
  <title>{$t('toyExample2Title')} - {$t('aboutExample')} | Pedro Ribeiro</title>
</svelte:head>

<Navbar currentPage="toy-examples" />

<!-- Hero Section -->
<div class="hero min-h-[40vh] bg-gradient-to-br from-secondary/10 to-secondary/5">
  <div class="hero-content text-center">
    <div class="max-w-4xl">
      <div class="flex justify-center mb-6">
        <div class="p-4 bg-secondary/20 rounded-full">
          <svg class="w-12 h-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>
      <h1 class="text-4xl lg:text-5xl font-bold mb-4 text-secondary">
        {$t('toyExample2Title')}
      </h1>
      <p class="text-lg mb-8 text-base-content/80 max-w-3xl mx-auto">
        {$t('aboutExample')}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="/toy-examples/rag" 
          class="btn btn-secondary btn-lg"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          {$t('backToExample')}
        </a>
        <a 
          href="/toy-examples" 
          class="btn btn-outline btn-lg"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          {$t('toyExamples')}
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Content Section -->
<section class="py-16 bg-base-100">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto space-y-12">
      
      <!-- Description -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-4 text-secondary">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Descrição do Exemplo
          </h2>
          <p class="text-base-content/80 leading-relaxed">
            Este exemplo demonstra um sistema RAG completo com capacidades de busca vetorial e recuperação semântica. O RAG permite integrar conhecimento externo em tempo real sem modificar os parâmetros do modelo.
          </p>
        </div>
      </div>

      <!-- Implementation -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-4 text-accent">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
            {$t('implementation')}
          </h2>
          <p class="text-base-content/80 leading-relaxed mb-6">
            A implementação usa embeddings vetoriais, busca semântica, indexação de documentos e recuperação de informações em tempo real para fornecer contexto relevante ao modelo.
          </p>
          
          <!-- Key Techniques -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-base-300 rounded-lg">
              <h3 class="font-semibold mb-2 text-secondary">Vector Embeddings</h3>
              <p class="text-sm text-base-content/70">Representação vetorial de documentos para busca semântica eficiente.</p>
            </div>
            <div class="p-4 bg-base-300 rounded-lg">
              <h3 class="font-semibold mb-2 text-secondary">Semantic Search</h3>
              <p class="text-sm text-base-content/70">Busca baseada em similaridade semântica em vez de palavras-chave.</p>
            </div>
            <div class="p-4 bg-base-300 rounded-lg">
              <h3 class="font-semibold mb-2 text-secondary">Document Indexing</h3>
              <p class="text-sm text-base-content/70">Indexação eficiente de grandes volumes de documentos para recuperação rápida.</p>
            </div>
            <div class="p-4 bg-base-300 rounded-lg">
              <h3 class="font-semibold mb-2 text-secondary">Real-time Retrieval</h3>
              <p class="text-sm text-base-content/70">Recuperação de informações em tempo real durante a geração de respostas.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Requirements -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-4 text-info">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
            {$t('requirements')}
          </h2>
          <p class="text-base-content/80 leading-relaxed">
            Volume grande de dados, mecanismo de recuperação externa viável, foco em fornecer informações contextuais atualizadas sem necessidade de re-treinamento do modelo.
          </p>
        </div>
      </div>

      <!-- Methodology Answers -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-6 text-warning">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {$t('methodologyAnswers')}
          </h2>
          
          <div class="space-y-4">
            <!-- Question 1 -->
            <div class="collapse collapse-plus bg-base-300">
              <input type="checkbox" /> 
              <div class="collapse-title text-lg font-medium">
                {$t('question1')}
              </div>
              <div class="collapse-content"> 
                <div class="alert alert-warning">
                  <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                  <span><strong>Resposta:</strong> {$t('question1OptionB')}</span>
                </div>
              </div>
            </div>

            <!-- Question 2 -->
            <div class="collapse collapse-plus bg-base-300">
              <input type="checkbox" /> 
              <div class="collapse-title text-lg font-medium">
                {$t('question2')}
              </div>
              <div class="collapse-content"> 
                <div class="alert alert-info">
                  <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span><strong>Resposta:</strong> {$t('question2OptionA')}</span>
                </div>
              </div>
            </div>

            <!-- Question 3 -->
            <div class="collapse collapse-plus bg-base-300">
              <input type="checkbox" /> 
              <div class="collapse-title text-lg font-medium">
                {$t('question3')}
              </div>
              <div class="collapse-content"> 
                <div class="alert alert-success">
                  <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span><strong>Resposta:</strong> {$t('question3OptionA')}</span>
                </div>
              </div>
            </div>

            <!-- Question 5 -->
            <div class="collapse collapse-plus bg-base-300">
              <input type="checkbox" /> 
              <div class="collapse-title text-lg font-medium">
                {$t('question5')}
              </div>
              <div class="collapse-content"> 
                <div class="alert alert-success">
                  <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span><strong>Resposta:</strong> {$t('question5OptionA')}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Result -->
          <div class="mt-8 p-6 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg border border-secondary/20">
            <h3 class="text-xl font-bold mb-4 text-secondary">Resultado da Metodologia</h3>
            <div class="flex items-start gap-4">
              <div class="p-2 bg-secondary/20 rounded-full flex-shrink-0">
                <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-lg mb-2">{$t('ragTitle')}</h4>
                <p class="text-base-content/80 leading-relaxed">
                  {$t('ragDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<Footer /> 