<script lang="ts">
  import { Hourglass } from 'lucide-svelte';
  import type { AnalysisStep, FactItem } from '$lib/data/mockData';

  let { processSteps, facts, currentStep }: {
    processSteps: AnalysisStep[]; facts: FactItem[]; currentStep: number;
  } = $props();

  let totalSteps = $derived(processSteps.length + facts.length);
  let stepsComplete = $derived(currentStep >= processSteps.length);
</script>

<div class="max-w-2xl mx-auto space-y-6 py-16">
  <div class="relative pl-8 space-y-10 mb-16">
    <div class="absolute inset-y-2 left-[11.5px] w-[1.5px] bg-ink-ghost/50 z-0"></div>
    {#if currentStep > 0}
      <div
        class="absolute top-2 left-[11.5px] w-[1.5px] bg-terra z-[1] transition-all duration-500"
        style="height: calc({Math.min(currentStep / Math.max(processSteps.length - 1, 1), 1) * 100}% - 4px);"
      ></div>
    {/if}

    {#each processSteps as step, i}
      {#if i <= currentStep}
        <div class="relative z-10 flex items-center gap-6">
          <div class="absolute -left-[31px] p-1.5">
            {#if i < currentStep || stepsComplete}
              <div class="w-3 h-3 rounded-full bg-terra shadow-[0_0_0_3px_#fdf6f0,0_0_0_5px_rgba(196,83,58,0.2)]"></div>
            {:else}
              <Hourglass class="w-4 h-4 text-terra animate-hourglass -ml-[2px] -mt-[2px]" />
            {/if}
          </div>
          <span class="text-[15px] font-medium tracking-wide {i === currentStep && !stepsComplete ? 'text-ink' : 'text-ink-muted'}">{step.text}</span>
        </div>
      {/if}
    {/each}
  </div>

  {#if stepsComplete}
    <div class="pb-6 border-b border-ink-ghost/60">
      <h3 class="text-sm font-semibold text-ink-muted tracking-wide">Extracted Facts Review</h3>
    </div>

    <div class="space-y-5 pt-6">
      {#each facts as fact, i}
        {#if i <= currentStep - processSteps.length}
          {@const isLatest = i === currentStep - processSteps.length && currentStep < totalSteps - 1}
          <div class="group flex items-start justify-between gap-8 py-5 pl-5 border-l-[3px] transition-all duration-300 {isLatest ? 'border-terra bg-white shadow-sm -mr-5 pr-5 rounded-r-xl' : 'border-ink-ghost/50 hover:border-ink-ghost'}">
            <div class="flex-1">
              <span class="text-[10px] font-mono text-ink-faint block mb-2 tracking-widest">FACT {fact.id}</span>
              <p class="text-[15px] text-ink leading-relaxed font-medium">{fact.text}</p>
            </div>
            <div class="flex flex-col gap-2 shrink-0 min-w-[85px] {isLatest ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300">
              <button class="w-full px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold transition-all {fact.status === 'admit' ? 'bg-terra text-white' : 'bg-white border border-ink-ghost/60 hover:border-terra text-ink-muted hover:text-terra'}">
                Admit
              </button>
              <button class="w-full px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold transition-all {fact.status === 'deny' ? 'bg-terra text-white' : 'bg-white border border-ink-ghost/60 hover:border-terra text-ink-muted hover:text-terra'}">
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
      <Hourglass class="w-5 h-5 text-terra animate-hourglass" />
      <span class="text-sm text-ink-muted font-medium">Processing facts...</span>
    </div>
  {/if}
</div>
