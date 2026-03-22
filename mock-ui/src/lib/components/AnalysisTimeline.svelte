<script lang="ts">
  import ProcessingIndicator from './ProcessingIndicator.svelte';
  import type { AnalysisStep } from '$lib/data/mockData';

  let { steps, currentStep }: { steps: AnalysisStep[]; currentStep: number } = $props();

  let isComplete = $derived(currentStep >= steps.length - 1);
</script>

<div class="max-w-2xl mx-auto space-y-8 py-16">
  <div class="relative space-y-10">
    <!-- Background ghost line -->
    <div class="absolute inset-y-0 left-[15px] w-[1.5px] -translate-x-1/2 bg-ink-ghost/50 z-0"></div>

    <!-- Terra progress line -->
    {#if currentStep > 0}
      <div
        class="absolute top-0 left-[15px] w-[1.5px] -translate-x-1/2 bg-terra z-[1] transition-all duration-500"
        style="height: calc(100% - 16px);"
      ></div>
    {/if}

    {#each steps as step, i}
      {#if i <= currentStep}
        <div class="relative z-10 flex items-center gap-4">
          <div class="w-[30px] shrink-0 flex items-center justify-center">
            {#if i < currentStep || isComplete}
              <div class="w-3 h-3 rounded-full bg-terra shadow-[0_0_0_3px_#fdf6f0,0_0_0_5px_rgba(196,83,58,0.2)]"></div>
            {:else}
              <ProcessingIndicator />
            {/if}
          </div>
          <span class="text-[15px] font-medium tracking-wide {i === currentStep && !isComplete ? 'text-ink' : 'text-ink-muted'} transition-colors duration-300">{step.text}</span>
        </div>
      {/if}
    {/each}
  </div>
</div>
