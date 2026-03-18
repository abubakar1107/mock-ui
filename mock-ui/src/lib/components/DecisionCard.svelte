<script lang="ts">
  import { FileText, ShieldAlert, Scale, Gavel, AlertTriangle, Clock } from 'lucide-svelte';

  type DecisionOption = {
    id: string; title: string; description: string;
    tag?: string; recommended?: boolean;
    iconType?: 'file' | 'shield' | 'scale' | 'gavel' | 'alert' | 'clock';
  };

  let { title = 'Choose a Path', subtitle = '', options, onselect }: {
    title?: string; subtitle?: string; options: DecisionOption[]; onselect: (id: string) => void;
  } = $props();

  const iconMap = { file: FileText, shield: ShieldAlert, scale: Scale, gavel: Gavel, alert: AlertTriangle, clock: Clock };
</script>

<div class="max-w-2xl mx-auto py-16">
  <div class="pb-8 text-center space-y-2">
    <p class="font-serif text-xl font-bold text-ink italic">{title}</p>
    {#if subtitle}
      <p class="text-sm text-ink-muted max-w-lg mx-auto leading-relaxed">{subtitle}</p>
    {/if}
  </div>

  <div class="grid {options.length === 2 ? 'grid-cols-2' : options.length === 3 ? 'grid-cols-3' : 'grid-cols-1'} gap-5">
    {#each options as option}
      {@const Icon = iconMap[option.iconType ?? 'file'] ?? FileText}
      <button
        onclick={() => onselect(option.id)}
        class="group flex flex-col items-start gap-4 p-7 rounded-xl border transition-all duration-300 text-left
          {option.recommended
            ? 'border-terra bg-white shadow-sm hover:shadow-md'
            : 'border-ink-ghost/60 bg-white hover:border-ink-ghost hover:shadow-sm'}"
      >
        <div class="w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors
          {option.recommended
            ? 'bg-terra text-white'
            : 'bg-cream-deep text-ink-muted group-hover:bg-terra group-hover:text-white'}">
          <Icon class="w-5 h-5" />
        </div>
        <span class="text-lg font-semibold text-ink">{option.title}</span>
        <span class="text-sm text-ink-muted leading-relaxed">{option.description}</span>
        {#if option.tag}
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest mt-auto transition-colors
            {option.recommended
              ? 'bg-terra text-white'
              : 'bg-cream-deep text-ink-faint border border-ink-ghost/40 group-hover:text-ink-muted'}">
            {option.tag}
          </div>
        {/if}
      </button>
    {/each}
  </div>
</div>
