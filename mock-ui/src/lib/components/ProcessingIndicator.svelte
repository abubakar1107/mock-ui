<script lang="ts">
  import { Hourglass } from 'lucide-svelte';

  let { size = 'default', label = '' }: { size?: 'sm' | 'default' | 'lg'; label?: string } = $props();

  const sizeMap = {
    sm: { icon: 'w-3.5 h-3.5', dots: 'w-1 h-1', gap: 'gap-1', text: 'text-xs' },
    default: { icon: 'w-4 h-4', dots: 'w-1.5 h-1.5', gap: 'gap-1.5', text: 'text-sm' },
    lg: { icon: 'w-5 h-5', dots: 'w-2 h-2', gap: 'gap-2', text: 'text-base' },
  };

  let s = $derived(sizeMap[size]);
</script>

<span class="inline-flex items-center {s.gap} text-zinc-700">
  <Hourglass class="{s.icon} animate-hourglass" />
  {#if label}
    <span class="{s.text} font-medium">{label}</span>
  {/if}
</span>
