<script lang="ts">
  import { Hourglass, CheckCircle2, Cpu, FileText, Swords, ShieldAlert } from 'lucide-svelte';
  import type { SimulationLog } from '$lib/data/mockData';

  let { logs, currentStep, opponentLabel = 'Opposing Counsel' }: {
    logs: SimulationLog[];
    currentStep: number;
    opponentLabel?: string;
  } = $props();

  let isComplete = $derived(currentStep >= logs.length - 1);

  function actorStyle(actor: string) {
    if (actor === 'opponent') return {
      dot: 'bg-red-700 text-white',
      bg: 'bg-red-50/40 border-red-200',
      accent: 'border-l-4 border-l-red-400',
      title: 'text-red-900',
      desc: 'text-red-700/70',
      label: 'bg-red-100 text-red-800',
    };
    if (actor === 'agent') return {
      dot: 'bg-zinc-900 text-white',
      bg: 'bg-white border-zinc-200',
      accent: 'border-l-4 border-l-zinc-900',
      title: 'text-zinc-900',
      desc: 'text-zinc-600',
      label: 'bg-zinc-100 text-zinc-800',
    };
    return {
      dot: 'bg-zinc-200 text-zinc-600',
      bg: 'bg-zinc-50/50 border-zinc-200/60',
      accent: 'border-l-4 border-l-zinc-300',
      title: 'text-zinc-700',
      desc: 'text-zinc-500',
      label: 'bg-zinc-100 text-zinc-500',
    };
  }

  function actorLabel(actor: string): string {
    if (actor === 'opponent') return opponentLabel;
    if (actor === 'agent') return 'Your Agent';
    return 'System';
  }
</script>

<div class="max-w-2xl mx-auto py-16">
  <div class="space-y-12 relative">
    <!-- Background line -->
    <div class="absolute top-0 bottom-0 left-[19.5px] w-[1.5px] bg-zinc-300 z-0"></div>
    <!-- Dark completed line -->
    {#if currentStep > 0}
      <div
        class="absolute top-0 left-[19.5px] w-[1.5px] bg-zinc-800 z-[1] transition-all duration-500"
        style="height: calc({Math.min(currentStep / Math.max(logs.length - 1, 1), 1) * 100}%);"
      ></div>
    {/if}

    {#each logs as log, i}
      {#if i <= currentStep}
        {@const style = actorStyle(log.actor)}
        <div class="flex items-start gap-6 relative z-10">
          <div class="w-10 h-10 rounded-full {style.dot} flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_0_3px_#f5f5f0,0_0_0_5px_rgba(0,0,0,0.08)] z-10">
            {#if log.icon === 'cpu'}
              <Cpu class="w-4 h-4" />
            {:else if log.icon === 'file'}
              <FileText class="w-4 h-4" />
            {:else if log.icon === 'swords'}
              <Swords class="w-4 h-4" />
            {:else if log.icon === 'shield'}
              <ShieldAlert class="w-4 h-4" />
            {:else}
              <CheckCircle2 class="w-4 h-4" />
            {/if}
          </div>

          <div class="flex-1 {style.bg} {style.accent} border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div class="flex items-center justify-between mb-3 pb-3 border-b border-zinc-100">
              <h4 class="font-semibold text-[15px] {style.title} tracking-wide">{log.title}</h4>
              <div class="flex items-center gap-3">
                <span class="text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-md {style.label}">{actorLabel(log.actor)}</span>
                <span class="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] bg-zinc-100 px-2.5 py-1 rounded-md border border-zinc-200">Step {log.step}</span>
              </div>
            </div>
            <p class="text-[14px] {style.desc} leading-relaxed font-medium">{log.description}</p>
          </div>
        </div>
      {/if}
    {/each}

    {#if !isComplete}
      <div class="flex items-start gap-6 relative z-10">
        <div class="w-10 h-10 rounded-full bg-white border-2 border-zinc-300 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_0_3px_#f5f5f0]">
          <Hourglass class="w-4 h-4 text-zinc-600 animate-hourglass" />
        </div>
        <div class="flex-1 py-2.5">
          <span class="text-xs text-zinc-500 font-semibold tracking-wide">Processing next step...</span>
        </div>
      </div>
    {/if}

    <!-- Termination dot -->
    {#if isComplete}
      <div class="absolute bottom-0 left-[17.5px] w-[5px] h-[5px] rounded-full bg-zinc-800 z-[2]"></div>
    {/if}
  </div>
</div>
