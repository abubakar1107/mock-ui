<script lang="ts">
  import ProcessingIndicator from './ProcessingIndicator.svelte';
  import type { AnalysisStep } from '$lib/data/mockData';

  let { steps, currentStep }: { steps: AnalysisStep[]; currentStep: number } = $props();

  let isComplete = $derived(currentStep >= steps.length - 1);
</script>

<div class="max-w-2xl mx-auto py-16">
  {#each steps as step, i}
    {#if i <= currentStep}
      {@const showConnector = i < currentStep}
      <div class="flex gap-4">
        <div class="flex flex-col items-center shrink-0 w-[30px]">
          <div class="flex items-center justify-center shrink-0 py-0.5">
            {#if i < currentStep || isComplete}
              <div class="w-3 h-3 rounded-full bg-terra shadow-[0_0_0_3px_#fdf6f0,0_0_0_5px_rgba(196,83,58,0.2)]"></div>
            {:else}
              <ProcessingIndicator />
            {/if}
          </div>
          {#if showConnector}
            <div class="w-[1.5px] flex-1 min-h-6 bg-terra"></div>
          {/if}
        </div>
        <div class="flex-1 min-w-0 {showConnector ? 'pb-8' : ''} flex flex-col gap-1">
          <span class="text-[15px] font-medium tracking-wide {i === currentStep && !isComplete ? 'text-ink' : 'text-ink-muted'} transition-colors duration-300">{step.text}</span>
          {#if step.description}
            <p class="text-[13px] leading-relaxed text-ink-faint max-w-lg">{step.description}</p>
          {/if}
        </div>
      </div>
    {/if}
  {/each}
</div>
