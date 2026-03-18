<script lang="ts">
  import { Hourglass } from 'lucide-svelte';
  import type { AnalysisStep, FactItem } from '$lib/data/mockData';

  let { processSteps, facts, currentStep }: {
    processSteps: AnalysisStep[];
    facts: FactItem[];
    currentStep: number;
  } = $props();

  let totalSteps = $derived(processSteps.length + facts.length);
  let stepsComplete = $derived(currentStep >= processSteps.length);
</script>

<div class="max-w-2xl mx-auto space-y-6 py-16">
  <div class="relative pl-8 space-y-10 mb-16">
    <!-- Background line -->
    <div class="absolute inset-y-2 left-[11.5px] w-[1.5px] bg-zinc-300 z-0"></div>
    <!-- Dark completed line -->
    {#if currentStep > 0}
      <div
        class="absolute top-2 left-[11.5px] w-[1.5px] bg-zinc-800 z-[1] transition-all duration-500"
        style="height: calc({Math.min(currentStep / Math.max(processSteps.length - 1, 1), 1) * 100}% - 4px);"
      ></div>
    {/if}

    {#each processSteps as step, i}
      {#if i <= currentStep}
        <div class="relative z-10 flex items-center gap-6">
          <div class="absolute -left-[31px] p-1.5">
            {#if i < currentStep || stepsComplete}
              <div class="w-3 h-3 rounded-full bg-zinc-900 shadow-[0_0_0_3px_#f5f5f0,0_0_0_5px_rgb(39,39,42,0.2)]"></div>
            {:else}
              <Hourglass class="w-4 h-4 text-zinc-700 animate-hourglass -ml-[2px] -mt-[2px]" />
            {/if}
          </div>
          <span class="text-[15px] font-medium tracking-wide {i === currentStep && !stepsComplete ? 'text-zinc-900' : 'text-zinc-600'}">{step.text}</span>
        </div>
      {/if}
    {/each}

    <!-- Termination dot -->
    {#if stepsComplete}
      <div class="absolute bottom-0 left-[9.5px] w-[5px] h-[5px] rounded-full bg-zinc-800 z-[2]"></div>
    {/if}
  </div>

  {#if stepsComplete}
    <div class="pb-6 border-b border-zinc-300">
      <h3 class="text-sm font-semibold text-zinc-700 tracking-wide">Extracted Facts Review</h3>
    </div>

    <div class="space-y-6 pt-6">
      {#each facts as fact, i}
        {#if i <= currentStep - processSteps.length}
          {@const isLatest = i === currentStep - processSteps.length && currentStep < totalSteps - 1}
          <div class="group flex items-start justify-between gap-8 py-5 pl-5 border-l-[3px] transition-all duration-300 {isLatest ? 'border-zinc-900 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] -mr-5 pr-5 rounded-r-xl' : 'border-zinc-300 hover:border-zinc-500'}">
            <div class="flex-1">
              <span class="text-[10px] font-mono text-zinc-500 block mb-2 tracking-widest">FACT {fact.id}</span>
              <p class="text-[15px] text-zinc-800 leading-relaxed font-medium">{fact.text}</p>
            </div>
            <div class="flex flex-col gap-2 shrink-0 min-w-[85px] {isLatest ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300">
              <button class="w-full px-4 py-2 rounded-md text-[10px] uppercase tracking-[0.2em] font-semibold transition-all {fact.status === 'admit' ? 'bg-zinc-900 text-white shadow-md' : 'bg-white border border-zinc-200 hover:border-zinc-900 text-zinc-600 hover:text-zinc-900'}">
                Admit
              </button>
              <button class="w-full px-4 py-2 rounded-md text-[10px] uppercase tracking-[0.2em] font-semibold transition-all {fact.status === 'deny' ? 'bg-zinc-900 text-white shadow-md' : 'bg-white border border-zinc-200 hover:border-zinc-900 text-zinc-600 hover:text-zinc-900'}">
                Deny
              </button>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  {/if}

  {#if currentStep < totalSteps - 1 && stepsComplete}
    <div class="flex items-center justify-center py-12 gap-2">
      <Hourglass class="w-5 h-5 text-zinc-600 animate-hourglass" />
      <span class="text-sm text-zinc-500 font-medium">Processing facts...</span>
    </div>
  {/if}
</div>
