<script lang="ts">
  import { FileText, Download, CheckCircle2 } from 'lucide-svelte';

  let {
    title,
    content,
    showExport = false,
    isIncoming = false,
    statusLabel = 'Draft',
  }: {
    title: string;
    content: string;
    showExport?: boolean;
    isIncoming?: boolean;
    statusLabel?: string;
  } = $props();

  let contextMessage = $derived(
    showExport ? `${title} — Fortified Draft Ready`
    : isIncoming ? `Received: ${title}`
    : `${title} — Initial Draft Generated`
  );
</script>

<div class="max-w-4xl mx-auto space-y-6 py-16">
  <div class="text-center space-y-2 pb-2">
    <div class="inline-flex items-center justify-center w-10 h-10 rounded-full {isIncoming ? 'bg-zinc-200' : showExport ? 'bg-zinc-900' : 'bg-zinc-800'}">
      {#if showExport}
        <CheckCircle2 class="w-5 h-5 text-white" />
      {:else}
        <FileText class="w-5 h-5 text-white" />
      {/if}
    </div>
    <p class="text-sm font-semibold text-zinc-800 tracking-wide">{contextMessage}</p>
  </div>

  <div class="bg-white border border-zinc-300 shadow-[0_4px_20px_rgb(0,0,0,0.06)] rounded-xl overflow-hidden">
    <div class="py-4 px-8 border-b border-zinc-200 flex items-center justify-between bg-[#fafaf8]">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center">
          <FileText class="w-4 h-4 text-zinc-700" />
        </div>
        <span class="font-semibold text-sm text-zinc-900">{title}</span>
      </div>
      <div class="flex items-center gap-4">
        {#if showExport}
          <button class="flex items-center gap-2 text-xs text-zinc-900 font-semibold hover:bg-zinc-100 px-4 py-2 rounded-md transition-colors border border-zinc-300 shadow-sm">
            <Download class="w-3.5 h-3.5" />
            Export
          </button>
        {/if}
      </div>
    </div>
    <div class="p-16 max-h-[60vh] overflow-y-auto bg-[#fafaf8]/50">
      <div class="bg-white border border-zinc-200 shadow-sm max-w-3xl mx-auto p-16 min-h-[400px] relative">
        <div class="absolute top-0 bottom-0 left-12 w-[1px] bg-red-500/10"></div>
        <div class="absolute top-0 bottom-0 left-[52px] w-[1px] bg-red-500/10"></div>
        <div class="text-[15px] font-sans whitespace-pre-wrap text-zinc-800 leading-[2.2] pl-8 relative z-10">
          {content}
        </div>
      </div>
    </div>
  </div>
</div>
