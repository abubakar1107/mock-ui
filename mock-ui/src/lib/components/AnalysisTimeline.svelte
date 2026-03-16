<script lang="ts">
  import { Loader2 } from 'lucide-svelte';
  import type { AnalysisStep } from '$lib/data/mockData';

  let { steps, currentStep }: { steps: AnalysisStep[]; currentStep: number } = $props();
</script>

<div class="max-w-2xl mx-auto space-y-8 py-16">
  <div class="relative pl-8 space-y-10 before:absolute before:inset-y-2 before:left-[11.5px] before:w-[1px] before:bg-zinc-200 before:z-0">
    {#each steps as step, i}
      {#if i <= currentStep}
        <div class="relative z-10 flex items-center gap-6 group">
          <div class="absolute -left-[31px] bg-zinc-50/30 p-1.5 transition-transform duration-500 ease-out">
            {#if i < currentStep || currentStep >= steps.length - 1}
              <div class="w-2.5 h-2.5 rounded-full bg-zinc-800 shadow-[0_0_0_4px_rgba(250,250,250,1)]"></div>
            {:else}
              <Loader2 class="w-3.5 h-3.5 text-zinc-400 animate-spin -ml-[2px] -mt-[2px]" />
            {/if}
          </div>
          <span class="text-[15px] font-medium tracking-wide {i === currentStep && currentStep < steps.length - 1 ? 'text-zinc-900' : 'text-zinc-500'} transition-colors duration-300">{step.text}</span>
        </div>
      {/if}
    {/each}

    {#if currentStep < steps.length - 1}
      <div class="relative z-10 flex items-center gap-6">
        <div class="absolute -left-[31px] bg-zinc-50/30 p-1.5">
          <Loader2 class="w-3.5 h-3.5 text-zinc-300 animate-spin -ml-[2px] -mt-[2px]" />
        </div>
        <span class="text-[15px] font-medium tracking-wide text-zinc-400">Analyzing...</span>
      </div>
    {/if}
  </div>
</div>
