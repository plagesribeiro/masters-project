<script lang="ts">
  import { onMount } from 'svelte';
  import { Navbar, t } from '$lib';
  import { workflowResults, type WorkflowState, type WorkflowQuestion, type AnswerValue } from '$lib/workflow';
  
  /** @type {WorkflowState} */
  let workflowState = $state({
    currentQuestionId: 'q1',
    answers: [],
    results: [],
    isComplete: false
  });
  
  /** @type {WorkflowQuestion | null} */
  let currentQuestion: WorkflowQuestion | null = $state(null);
  let canGoBack = $state(false);
  let isLoading = $state(false);
  
  onMount(() => {
    initializeWorkflow();
  });
  
  async function initializeWorkflow() {
    isLoading = true;
    try {
      const response = await fetch('/api/workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getState' })
      });
      
      const data = await response.json();
      if (data.success) {
        workflowState = data.state;
        currentQuestion = data.currentQuestion;
        canGoBack = data.canGoBack;
      }
    } catch (error) {
      console.error('Error initializing workflow:', error);
    } finally {
      isLoading = false;
    }
  }
  
  async function answerQuestion(answer: AnswerValue) {
    if (!currentQuestion || isLoading) return;
    
    isLoading = true;
    try {
      const response = await fetch('/api/workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'answer',
          questionId: currentQuestion.id,
          answer,
          currentState: workflowState
        })
      });
      
      const data = await response.json();
      if (data.success) {
        workflowState = data.state;
        currentQuestion = data.currentQuestion;
        canGoBack = data.canGoBack;
      }
    } catch (error) {
      console.error('Error answering question:', error);
    } finally {
      isLoading = false;
    }
  }
  
  async function goBack() {
    if (!canGoBack || isLoading) return;
    
    isLoading = true;
    try {
      const response = await fetch('/api/workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'back',
          currentState: workflowState
        })
      });
      
      const data = await response.json();
      if (data.success) {
        workflowState = data.state;
        currentQuestion = data.currentQuestion;
        canGoBack = data.canGoBack;
      }
    } catch (error) {
      console.error('Error going back:', error);
    } finally {
      isLoading = false;
    }
  }
  
  async function restartWorkflow() {
    isLoading = true;
    try {
      const response = await fetch('/api/workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restart' })
      });
      
      const data = await response.json();
      if (data.success) {
        workflowState = data.state;
        currentQuestion = data.currentQuestion;
        canGoBack = data.canGoBack;
      }
    } catch (error) {
      console.error('Error restarting workflow:', error);
    } finally {
      isLoading = false;
    }
  }
  
  function getQuestionNumber() {
    if (!currentQuestion) return 0;
    return parseInt(currentQuestion.id.replace('q', ''));
  }
  
  function getProgressPercentage() {
    const totalQuestions = 4; // Máximo de perguntas possíveis
    const answeredQuestions = workflowState.answers.length;
    return Math.min((answeredQuestions / totalQuestions) * 100, 100);
  }
</script>

<svelte:head>
  <title>{$t('workflowTitle')} - {$t('masterDefense')} | Pedro Ribeiro</title>
  <meta name="description" content="Workflow interativo para encontrar a metodologia ideal de treinamento de LLM" />
</svelte:head>

<div class="h-screen flex flex-col">
  <Navbar currentPage="explore" />
  
  <!-- Header -->
  <div class="bg-gradient-to-r from-secondary/10 to-primary/10 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-bold text-primary mb-4">{$t('workflowTitle')}</h1>
        <p class="text-lg text-base-content/80">{$t('workflowSubtitle')}</p>
        
        <!-- Progress Bar -->
        <div class="mt-6 max-w-md mx-auto">
          <div class="flex justify-between text-sm text-base-content/60 mb-2">
            <span>{$t('progress')}</span>
            <span>{Math.round(getProgressPercentage())}%</span>
          </div>
          <progress class="progress progress-primary w-full" value={getProgressPercentage()} max="100"></progress>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Main Content -->
  <div class="flex-1 flex items-center justify-center p-4">
    <div class="w-full max-w-2xl">
      
      {#if isLoading}
        <div class="text-center">
          <span class="loading loading-spinner loading-lg text-primary"></span>
          <p class="mt-4 text-base-content/60">Processando...</p>
        </div>
        
      {:else if workflowState.isComplete}
        <!-- Results -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body text-center">
            <div class="mb-6">
              <div class="w-20 h-20 mx-auto bg-success text-success-content rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 class="text-3xl font-bold text-success mb-2">{$t('workflowComplete')}</h2>
              <p class="text-base-content/70">{$t('recommendedMethodology')}</p>
            </div>
            
            <!-- Results -->
            <div class="space-y-4">
              {#each workflowState.results as resultId}
                {@const result = workflowResults.find(r => r.id === resultId)}
                {#if result}
                  <div class="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <div class="text-left">
                      <h3 class="font-bold">{$t(result.titleKey as any)}</h3>
                      <p class="text-sm">{$t(result.descriptionKey as any)}</p>
                    </div>
                  </div>
                {/if}
              {/each}
            </div>
            
            <!-- Your Answers Summary -->
            <div class="mt-8 p-4 bg-base-200 rounded-lg">
              <h3 class="font-bold mb-3">{$t('yourAnswers')}</h3>
              <div class="space-y-2 text-sm">
                {#each workflowState.answers as answer, index}
                  <div class="flex justify-between">
                    <span class="text-base-content/70">{$t('question')} {index + 1}:</span>
                    <span class="font-medium">
                      {#if (answer as any).answer === 'yes'}{$t('yes')}
                      {:else if (answer as any).answer === 'no'}{$t('no')}
                      {:else if (answer as any).answer === 'both'}{$t('both')}
                      {:else if (answer as any).answer === 'option-a'}{$t('question2OptionA')}
                      {:else if (answer as any).answer === 'option-b'}{$t('question2OptionB')}
                      {/if}
                    </span>
                  </div>
                {/each}
              </div>
            </div>
            
            <!-- Actions -->
            <div class="card-actions justify-center mt-6">
              <button class="btn btn-primary" onclick={restartWorkflow}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                {$t('restart')}
              </button>
              <a href="/explore" class="btn btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Voltar ao Explorar
              </a>
            </div>
          </div>
        </div>
        
      {:else if currentQuestion}
        <!-- Question -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="text-center mb-6">
              <div class="badge badge-primary badge-lg mb-4">
                {$t('question')} {getQuestionNumber()}
              </div>
              <h2 class="text-2xl font-bold mb-4">{$t(currentQuestion.textKey as any)}</h2>
            </div>
            
            <!-- Answer Options -->
            <div class="space-y-3">
              {#if currentQuestion.type === 'yes-no'}
                <button 
                  class="btn btn-outline btn-lg w-full justify-start"
                  onclick={() => answerQuestion('yes')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {$t('yes')}
                </button>
                
                <button 
                  class="btn btn-outline btn-lg w-full justify-start"
                  onclick={() => answerQuestion('no')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {$t('no')}
                </button>
                
              {:else if currentQuestion.type === 'multiple-choice' && currentQuestion.options}
                {#each currentQuestion.options as option}
                  <button 
                    class="btn btn-outline btn-lg w-full justify-start text-left"
                    onclick={() => answerQuestion(option.value)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-3 flex-shrink-0">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    <span class="flex-1">{$t(option.key as any)}</span>
                  </button>
                {/each}
              {/if}
            </div>
            
            <!-- Navigation -->
            <div class="card-actions justify-between mt-8">
              <button 
                class="btn btn-ghost"
                onclick={goBack}
                disabled={!canGoBack}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                {$t('previous')}
              </button>
              
              <button 
                class="btn btn-ghost"
                onclick={restartWorkflow}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                {$t('restart')}
              </button>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div> 