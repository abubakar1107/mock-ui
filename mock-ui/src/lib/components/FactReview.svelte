<script lang="ts">
  import { Loader2 } from 'lucide-svelte';
  import type { AnalysisStep, FactItem } from '$lib/data/mockData';

  let { processSteps, facts, currentStep }: {
    processSteps: AnalysisStep[];
    facts: FactItem[];
    currentStep: number;
  } = $props();

  let totalSteps = $derived(processSteps.length + facts.length);
</script>

<div class="max-w-2xl mx-auto space-y-6 py-16">
  <!-- Process steps timeline -->
  <div class="relative pl-8 space-y-10 mb-16 before:absolute before:inset-y-2 before:left-[11.5px] before:w-[1px] before:bg-zinc-200 before:z-0">
    {#each processSteps as step, i}
      {#if i <= currentStep}
        <div class="relative z-10 flex items-center gap-6">
          <div class="absolute -left-[31px] bg-zinc-50/30 p-1.5">
            {#if i < currentStep || currentStep >= processSteps.length}
              <div class="w-2.5 h-2.5 rounded-full bg-zinc-800 shadow-[0_0_0_4px_rgba(250,250,250,1)]"></div>
            {:else}
              <Loader2 class="w-3.5 h-3.5 text-zinc-400 animate-spin -ml-[2px] -mt-[2px]" />
            {/if}
          </div>
          <span class="text-[15px] font-medium tracking-wide {i === currentStep && currentStep < processSteps.length ? 'text-zinc-900' : 'text-zinc-500'}">{step.text}</span>
        </div>
      {/if}
    {/each}
  </div>

  <!-- Facts -->
  {#if currentStep >= processSteps.length}
    <div class="pb-6 border-b border-zinc-200">
      <h3 class="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.2em]">Extracted Facts Review</h3>
    </div>

    <div class="space-y-6 pt-6">
      {#each facts as fact, i}
        {#if i <= currentStep - processSteps.length}
          {@const isLatest = i === currentStep - processSteps.length && currentStep < totalSteps - 1}
          <div class="group flex items-start justify-between gap-8 py-5 pl-5 border-l-[3px] transition-all duration-300 {isLatest ? 'border-zinc-900 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] -mr-5 pr-5 rounded-r-xl' : 'border-zinc-200 hover:border-zinc-400'}">
            <div class="flex-1">
              <span class="text-[10px] font-mono text-zinc-400 block mb-2 tracking-widest">FACT {fact.id}</span>
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

  {#if currentStep < totalSteps - 1 && currentStep >= processSteps.length}
    <div class="flex items-center justify-center py-12">
      <Loader2 class="w-5 h-5 text-zinc-300 animate-spin" />
    </div>
  {/if}
</div>
