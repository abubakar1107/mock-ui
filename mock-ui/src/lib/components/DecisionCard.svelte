<script lang="ts">
  import { FileText, ShieldAlert, Scale, Gavel, AlertTriangle, Clock } from 'lucide-svelte';

  type DecisionOption = {
    id: string;
    title: string;
    description: string;
    tag?: string;
    recommended?: boolean;
    iconType?: 'file' | 'shield' | 'scale' | 'gavel' | 'alert' | 'clock';
  };

  let { title = 'Choose a Path', options, onselect }: {
    title?: string;
    options: DecisionOption[];
    onselect: (id: string) => void;
  } = $props();

  const iconMap = { file: FileText, shield: ShieldAlert, scale: Scale, gavel: Gavel, alert: AlertTriangle, clock: Clock };
</script>

<div class="max-w-2xl mx-auto py-16">
  <div class="pb-8 text-center">
    <p class="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.2em]">{title}</p>
  </div>

  <div class="grid {options.length === 2 ? 'grid-cols-2' : options.length === 3 ? 'grid-cols-3' : 'grid-cols-1'} gap-6">
    {#each options as option}
      {@const Icon = iconMap[option.iconType ?? 'file'] ?? FileText}
      <button
        onclick={() => onselect(option.id)}
        class="group flex flex-col items-start gap-4 p-8 rounded-xl border border-zinc-200 bg-white hover:border-zinc-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 text-left"
      >
        <div class="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mb-2 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
          <Icon class="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
        </div>
        <span class="text-lg font-semibold text-zinc-900">{option.title}</span>
        <span class="text-sm text-zinc-500 leading-relaxed">{option.description}</span>
        {#if option.tag}
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full {option.recommended ? 'bg-zinc-100 text-zinc-900' : 'bg-transparent border border-zinc-200 text-zinc-500 group-hover:text-zinc-900 group-hover:border-zinc-300'} text-[11px] font-medium uppercase tracking-widest mt-auto transition-colors">
            {option.tag}
          </div>
        {/if}
      </button>
    {/each}
  </div>
</div>
