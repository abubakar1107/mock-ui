<script lang="ts">
  import { PenTool, Wrench, ChevronDown, Pause, Play, PauseCircle } from 'lucide-svelte';
  import ProcessingIndicator from './ProcessingIndicator.svelte';
  import type { AnalysisStep, FactItem } from '$lib/data/mockData';
  import { workflow } from '$lib/stores/workflow.svelte';

  let { processSteps, facts, currentStep }: {
    processSteps: AnalysisStep[]; facts: FactItem[]; currentStep: number;
  } = $props();

  let totalSteps = $derived(processSteps.length + facts.length);
  let stepsComplete = $derived(currentStep >= processSteps.length);
  let expandedSteps = $state(new Set<number>());

  function toggleExpand(idx: number) {
    const next = new Set(expandedSteps);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    expandedSteps = next;
  }
</script>

<div class="max-w-4xl mx-auto space-y-6 py-16">
  <div class="relative mb-16">
    {#each processSteps as step, i}
      {#if i <= currentStep}
        {@const showConnector = i < processSteps.length - 1 && i < currentStep}
        {@const isProcessing = i === currentStep && !stepsComplete}
        {@const hasTools = step.tools && step.tools.length > 0}
        {@const isExpanded = expandedSteps.has(i)}
        <div class="flex gap-4 relative z-10">
          <!-- Dot + connector column -->
          <div class="flex flex-col items-center shrink-0 w-[30px]">
            <div class="flex items-center justify-center shrink-0 py-1">
              {#if i < currentStep || stepsComplete}
                <div class="w-3 h-3 rounded-full bg-terra shadow-[0_0_0_3px_#fdf6f0,0_0_0_5px_rgba(196,83,58,0.2)]"></div>
              {:else if workflow.paused}
                <PauseCircle class="w-5 h-5 text-amber-500" />
              {:else}
                <ProcessingIndicator />
              {/if}
            </div>
            {#if showConnector}
              <div class="w-[1.5px] flex-1 min-h-6 bg-terra"></div>
            {/if}
          </div>

          <!-- Content row: text left, tools right -->
          <div class="flex-1 min-w-0 {showConnector ? 'pb-6' : ''} flex gap-6">
            <!-- Left: text + description -->
            <div class="flex-1 min-w-0 flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <span class="text-[15px] font-medium tracking-wide {isProcessing ? 'text-ink' : 'text-ink-muted'}">{step.text}</span>
                {#if isProcessing}
                  <button
                    onclick={() => workflow.paused ? workflow.resume() : workflow.pause()}
                    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all {workflow.paused ? 'bg-amber-50 text-amber-600 border border-amber-300/60 hover:bg-amber-100' : 'bg-cream-deep text-ink-faint border border-ink-ghost/40 hover:text-ink-muted hover:border-ink-ghost'}"
                  >
                    {#if workflow.paused}
                      <Play class="w-3 h-3" /> Resume
                    {:else}
                      <Pause class="w-3 h-3" /> Pause
                    {/if}
                  </button>
                {/if}
              </div>
              {#if isProcessing && workflow.paused}
                <span class="text-[11px] font-medium text-amber-600">Paused — use the chat bar below to send instructions</span>
              {/if}
              {#if step.description}
                <p class="text-[13px] leading-relaxed text-ink-faint">{step.description}</p>
              {/if}
            </div>

            <!-- Right: agent + tools -->
            {#if hasTools}
              <div class="shrink-0 w-[220px] flex flex-col gap-2 pt-0.5 overflow-hidden">
                {#if step.agentLabel}
                  <span class="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-terra-muted text-terra w-fit">
                    <PenTool class="w-3 h-3" />
                    {step.agentLabel}
                  </span>
                {/if}
                <div class="flex flex-wrap items-center gap-1.5">
                  <Wrench class="w-3 h-3 text-ink-faint shrink-0" />
                  {#each step.tools! as tc}
                    <span class="inline-flex items-center text-[10px] font-mono font-medium px-2 py-0.5 rounded border border-ink-ghost/40 bg-white/60 text-ink-muted">
                      {tc.tool}
                    </span>
                  {/each}
                </div>
                <button
                  onclick={() => toggleExpand(i)}
                  class="flex items-center gap-1 text-[11px] font-medium text-ink-faint hover:text-ink-muted transition-colors w-fit"
                >
                  <ChevronDown class="w-3 h-3 transition-transform duration-200 {isExpanded ? 'rotate-180' : ''}" />
                  {isExpanded ? 'Hide' : 'Show'} details
                </button>
                {#if isExpanded}
                  <div class="border border-ink-ghost/30 bg-cream-deep/40 rounded-lg p-3 space-y-2.5">
                    {#each step.tools! as tc}
                      <div class="space-y-1">
                        <div class="text-[11px] font-mono font-semibold text-ink-muted">{tc.tool}</div>
                        {#if tc.input}
                          <div class="flex gap-2 text-[11px]">
                            <span class="text-ink-faint font-medium shrink-0 w-12">input</span>
                            <span class="font-mono text-ink-muted break-words min-w-0">{tc.input}</span>
                          </div>
                        {/if}
                        {#if tc.source}
                          <div class="flex gap-2 text-[11px]">
                            <span class="text-ink-faint font-medium shrink-0 w-12">source</span>
                            <span class="font-mono text-ink-muted break-words min-w-0">{tc.source}</span>
                          </div>
                        {/if}
                        {#if tc.output}
                          <div class="flex gap-2 text-[11px]">
                            <span class="text-ink-faint font-medium shrink-0 w-12">output</span>
                            <span class="font-mono text-ink-muted leading-relaxed break-words min-w-0">{tc.output}</span>
                          </div>
                        {/if}
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            {/if}
          </div>
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
    <div class="flex items-center justify-center py-12 gap-3">
      {#if workflow.paused}
        <PauseCircle class="w-5 h-5 text-amber-500" />
        <span class="text-sm text-amber-600 font-medium">Paused</span>
      {:else}
        <ProcessingIndicator />
        <span class="text-sm text-ink-muted font-medium">Processing facts...</span>
      {/if}
      <button
        onclick={() => workflow.paused ? workflow.resume() : workflow.pause()}
        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all {workflow.paused ? 'bg-amber-50 text-amber-600 border border-amber-300/60 hover:bg-amber-100' : 'bg-cream-deep text-ink-faint border border-ink-ghost/40 hover:text-ink-muted hover:border-ink-ghost'}"
      >
        {#if workflow.paused}
          <Play class="w-3 h-3" /> Resume
        {:else}
          <Pause class="w-3 h-3" /> Pause
        {/if}
      </button>
    </div>
  {/if}
</div>
