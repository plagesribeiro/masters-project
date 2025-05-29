<script>
  import { t } from '$lib';
</script>

<div class="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-base-300/50 backdrop-blur-sm">
  <div class="container mx-auto px-3 py-2 md:px-4 md:py-4">
    <div class="flex items-center gap-2 md:gap-4 max-w-4xl mx-auto">
      <div class="avatar">
        <div class="w-8 md:w-12 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content !flex !items-center !justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 md:w-6 md:h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <h1 class="text-sm md:text-xl font-bold text-base-content truncate">{$t('aiSpecialist')}</h1>
        <p class="text-xs md:text-sm text-base-content/70 truncate">{$t('specialistDescription')}</p>
      </div>
      <div class="flex items-center gap-1 md:gap-3">
        <div class="badge badge-success gap-1 md:gap-2 shadow-sm text-xs">
          <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></div>
          <span class="hidden sm:inline">{$t('online')}</span>
        </div>
      </div>
    </div>
  </div>
</div> 