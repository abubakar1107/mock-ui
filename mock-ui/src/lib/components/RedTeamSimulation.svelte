<script lang="ts">
  import { Loader2, CheckCircle2, Cpu, FileText, Swords, ShieldAlert } from 'lucide-svelte';
  import type { SimulationLog } from '$lib/data/mockData';

  let { logs, currentStep, opponentLabel = 'Opposing Counsel' }: {
    logs: SimulationLog[];
    currentStep: number;
    opponentLabel?: string;
  } = $props();

  function actorStyle(actor: string) {
    if (actor === 'opponent') return { dot: 'bg-zinc-800 text-white', bg: 'bg-white border-zinc-200', title: 'text-zinc-900', desc: 'text-zinc-500' };
    if (actor === 'agent') return { dot: 'bg-zinc-300 text-zinc-900', bg: 'bg-white border-zinc-200', title: 'text-zinc-900', desc: 'text-zinc-500' };
    return { dot: 'bg-zinc-100 text-zinc-600', bg: 'bg-white border-zinc-100', title: 'text-zinc-800', desc: 'text-zinc-400' };
  }

  function actorLabel(actor: string): string {
    if (actor === 'opponent') return opponentLabel;
    if (actor === 'agent') return 'Your Agent';
    return 'System';
  }
</script>

<div class="max-w-2xl mx-auto py-16">
  <div class="space-y-16 relative before:absolute before:inset-0 before:left-[19.5px] before:w-[1px] before:bg-zinc-200 before:z-0">
    {#each logs as log, i}
      {#if i <= currentStep}
        {@const style = actorStyle(log.actor)}
        <div class="flex items-start gap-8 relative z-10">
          <div class="w-10 h-10 rounded-full {style.dot} flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_0_4px_rgba(250,250,250,1)] z-10">
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

          <div class="flex-1 {style.bg} border rounded-xl p-8 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
            <div class="flex items-center justify-between mb-4 pb-4 border-b border-zinc-100">
              <h4 class="font-semibold text-[15px] {style.title} tracking-wide">{log.title}</h4>
              <div class="flex items-center gap-3">
                <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em]">{actorLabel(log.actor)}</span>
                <span class="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] bg-zinc-50/50 px-2.5 py-1 rounded-md border border-zinc-100">Step {log.step}</span>
              </div>
            </div>
            <p class="text-[14px] {style.desc} leading-relaxed font-medium">{log.description}</p>
          </div>
        </div>
      {/if}
    {/each}

    {#if currentStep < logs.length - 1}
      <div class="flex items-start gap-8 relative z-10">
        <div class="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_0_4px_rgba(250,250,250,1)]">
          <Loader2 class="w-4 h-4 text-zinc-300 animate-spin" />
        </div>
        <div class="flex-1 py-2.5">
          <span class="text-xs text-zinc-400 uppercase tracking-[0.2em] font-semibold">Processing next step...</span>
        </div>
      </div>
    {/if}
  </div>
</div>
