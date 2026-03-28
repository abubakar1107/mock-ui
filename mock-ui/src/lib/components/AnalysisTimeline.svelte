<script lang="ts">
  import { PenTool, Wrench, ChevronDown, Pause, Play, PauseCircle } from 'lucide-svelte';
  import ProcessingIndicator from './ProcessingIndicator.svelte';
  import type { AnalysisStep } from '$lib/data/mockData';
  import { workflow } from '$lib/stores/workflow.svelte';

  let { steps, currentStep }: { steps: AnalysisStep[]; currentStep: number } = $props();

  let isComplete = $derived(currentStep >= steps.length - 1);
  let expandedSteps = $state(new Set<number>());

  function toggleExpand(idx: number) {
    const next = new Set(expandedSteps);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    expandedSteps = next;
  }
</script>

<div class="max-w-4xl mx-auto py-16">
  {#each steps as step, i}
    {#if i <= currentStep}
      {@const showConnector = i < currentStep}
      {@const isActive = i === currentStep && !isComplete}
      {@const hasTools = step.tools && step.tools.length > 0}
      {@const isExpanded = expandedSteps.has(i)}
      <div class="flex gap-4">
        <!-- Dot + connector column -->
        <div class="flex flex-col items-center shrink-0 w-[30px]">
          <div class="flex items-center justify-center shrink-0 py-0.5">
            {#if i < currentStep || isComplete}
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
        <div class="flex-1 min-w-0 {showConnector ? 'pb-8' : ''} flex gap-6">
          <!-- Left: text + description -->
          <div class="flex-1 min-w-0 flex flex-col gap-1">
            <div class="flex items-center gap-2">
              <span class="text-[15px] font-medium tracking-wide {isActive ? 'text-ink' : 'text-ink-muted'} transition-colors duration-300">{step.text}</span>
              {#if isActive}
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
            {#if isActive && workflow.paused}
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
