<script lang="ts">
  import { Hourglass } from 'lucide-svelte';
  import type { AnalysisStep } from '$lib/data/mockData';

  let { steps, currentStep }: { steps: AnalysisStep[]; currentStep: number } = $props();

  let isComplete = $derived(currentStep >= steps.length - 1);
</script>

<div class="max-w-2xl mx-auto space-y-8 py-16">
  <div class="relative pl-8 space-y-10">
    <!-- Background line (pending: light) -->
    <div class="absolute inset-y-2 left-[11.5px] w-[1.5px] bg-zinc-300 z-0"></div>
    <!-- Foreground line (completed: dark) — grows with progress -->
    {#if currentStep > 0}
      <div
        class="absolute top-2 left-[11.5px] w-[1.5px] bg-zinc-800 z-[1] transition-all duration-500"
        style="height: calc({Math.min(currentStep / Math.max(steps.length - 1, 1), 1) * 100}% - 4px);"
      ></div>
    {/if}

    {#each steps as step, i}
      {#if i <= currentStep}
        <div class="relative z-10 flex items-center gap-6 group">
          <div class="absolute -left-[31px] p-1.5">
            {#if i < currentStep || isComplete}
              <div class="w-3 h-3 rounded-full bg-zinc-900 shadow-[0_0_0_3px_#f5f5f0,0_0_0_5px_rgb(39,39,42,0.2)]"></div>
            {:else}
              <Hourglass class="w-4 h-4 text-zinc-700 animate-hourglass -ml-[2px] -mt-[2px]" />
            {/if}
          </div>
          <span class="text-[15px] font-medium tracking-wide {i === currentStep && !isComplete ? 'text-zinc-900' : 'text-zinc-600'} transition-colors duration-300">{step.text}</span>
        </div>
      {/if}
    {/each}

    {#if !isComplete}
      <div class="relative z-10 flex items-center gap-6">
        <div class="absolute -left-[31px] p-1.5">
          <Hourglass class="w-4 h-4 text-zinc-500 animate-hourglass -ml-[2px] -mt-[2px]" />
        </div>
        <span class="text-[15px] font-medium tracking-wide text-zinc-400">Analyzing...</span>
      </div>
    {/if}

    <!-- Termination dot at the end when complete -->
    {#if isComplete}
      <div class="absolute bottom-0 left-[9.5px] w-[5px] h-[5px] rounded-full bg-zinc-800 z-[2]"></div>
    {/if}
  </div>
</div>
