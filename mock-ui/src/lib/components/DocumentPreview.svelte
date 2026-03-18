<script lang="ts">
  import { FileText, Download, CheckCircle2 } from 'lucide-svelte';

  let {
    title, content, showExport = false, isIncoming = false, statusLabel = 'Draft',
  }: {
    title: string; content: string; showExport?: boolean; isIncoming?: boolean; statusLabel?: string;
  } = $props();

  let contextMessage = $derived(
    showExport ? `${title} — Fortified Draft Ready`
    : isIncoming ? `Received: ${title}`
    : `${title} — Initial Draft Generated`
  );
</script>

<div class="max-w-4xl mx-auto space-y-4 py-6">
  <div class="bg-white border border-ink-ghost/60 shadow-sm rounded-xl overflow-hidden">
    <div class="py-4 px-8 border-b border-ink-ghost/40 flex items-center justify-between bg-cream-deep/50">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-white border border-ink-ghost/50 flex items-center justify-center">
          {#if showExport}
            <CheckCircle2 class="w-4 h-4 text-terra" />
          {:else}
            <FileText class="w-4 h-4 text-ink-muted" />
          {/if}
        </div>
        <div class="flex flex-col">
          <span class="font-semibold text-sm text-ink">{title}</span>
          <span class="text-[11px] text-ink-faint">{contextMessage}</span>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full {showExport ? 'bg-terra-muted text-terra' : 'bg-cream-deep text-ink-muted'}">{statusLabel}</span>
        {#if showExport}
          <button class="flex items-center gap-2 text-xs text-terra font-semibold hover:bg-terra-muted px-4 py-2 rounded-full transition-colors border border-terra/30">
            <Download class="w-3.5 h-3.5" /> Export
          </button>
        {/if}
      </div>
    </div>
    <div class="p-10 max-h-[70vh] overflow-y-auto bg-cream/30">
      <div class="bg-white border border-ink-ghost/40 max-w-3xl mx-auto p-16 min-h-[400px] relative rounded shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div class="absolute top-0 bottom-0 left-12 w-[1px] bg-terra/8"></div>
        <div class="absolute top-0 bottom-0 left-[52px] w-[1px] bg-terra/8"></div>
        <div class="text-[15px] whitespace-pre-wrap text-ink-light leading-[2.2] pl-8 relative z-10">{content}</div>
      </div>
    </div>
  </div>
</div>
