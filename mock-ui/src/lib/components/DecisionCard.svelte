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

  let { title = 'Choose a Path', subtitle = '', options, onselect }: {
    title?: string;
    subtitle?: string;
    options: DecisionOption[];
    onselect: (id: string) => void;
  } = $props();

  const iconMap = { file: FileText, shield: ShieldAlert, scale: Scale, gavel: Gavel, alert: AlertTriangle, clock: Clock };
</script>

<div class="max-w-2xl mx-auto py-16">
  <div class="pb-8 text-center space-y-2">
    <p class="text-sm font-semibold text-zinc-800 tracking-wide">{title}</p>
    {#if subtitle}
      <p class="text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed">{subtitle}</p>
    {/if}
  </div>

  <div class="grid {options.length === 2 ? 'grid-cols-2' : options.length === 3 ? 'grid-cols-3' : 'grid-cols-1'} gap-6">
    {#each options as option}
      {@const Icon = iconMap[option.iconType ?? 'file'] ?? FileText}
      <button
        onclick={() => onselect(option.id)}
        class="group flex flex-col items-start gap-4 p-8 rounded-xl border transition-all duration-300 text-left
          {option.recommended
            ? 'border-zinc-900 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.08)] ring-1 ring-zinc-900/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
            : 'border-zinc-200 bg-white/60 hover:border-zinc-400 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]'}"
      >
        <div class="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors
          {option.recommended
            ? 'bg-zinc-900 text-white'
            : 'bg-zinc-100 text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white'}">
          <Icon class="w-5 h-5" />
        </div>
        <span class="text-lg font-semibold text-zinc-900">{option.title}</span>
        <span class="text-sm text-zinc-500 leading-relaxed">{option.description}</span>
        {#if option.tag}
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest mt-auto transition-colors
            {option.recommended
              ? 'bg-zinc-900 text-white'
              : 'bg-zinc-100 border border-zinc-200 text-zinc-500 group-hover:text-zinc-700 group-hover:border-zinc-300'}">
            {option.tag}
          </div>
        {/if}
      </button>
    {/each}
  </div>
</div>
