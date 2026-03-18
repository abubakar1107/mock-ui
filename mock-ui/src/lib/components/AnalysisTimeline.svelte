<script lang="ts">
  import { Hourglass } from 'lucide-svelte';
  import type { AnalysisStep } from '$lib/data/mockData';

  let { steps, currentStep }: { steps: AnalysisStep[]; currentStep: number } = $props();

  let isComplete = $derived(currentStep >= steps.length - 1);
</script>

<div class="max-w-2xl mx-auto space-y-8 py-16">
  <div class="relative pl-8 space-y-10">
    <div class="absolute inset-y-2 left-[11.5px] w-[1.5px] bg-ink-ghost/50 z-0"></div>
    {#if currentStep > 0}
      <div
        class="absolute top-2 left-[11.5px] w-[1.5px] bg-terra z-[1] transition-all duration-500"
        style="height: calc({Math.min(currentStep / Math.max(steps.length - 1, 1), 1) * 100}% - 4px);"
      ></div>
    {/if}

    {#each steps as step, i}
      {#if i <= currentStep}
        <div class="relative z-10 flex items-center gap-6 group">
          <div class="absolute -left-[31px] p-1.5">
            {#if i < currentStep || isComplete}
              <div class="w-3 h-3 rounded-full bg-terra shadow-[0_0_0_3px_#fdf6f0,0_0_0_5px_rgba(196,83,58,0.2)]"></div>
            {:else}
              <Hourglass class="w-4 h-4 text-terra animate-hourglass -ml-[2px] -mt-[2px]" />
            {/if}
          </div>
          <span class="text-[15px] font-medium tracking-wide {i === currentStep && !isComplete ? 'text-ink' : 'text-ink-muted'} transition-colors duration-300">{step.text}</span>
        </div>
      {/if}
    {/each}
  </div>
</div>
