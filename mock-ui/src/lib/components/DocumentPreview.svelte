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
</script>

<div class="max-w-4xl mx-auto space-y-8 py-16">
  {#if isIncoming}
    <div class="text-center space-y-3 pb-4">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 border border-zinc-200">
        <FileText class="w-5 h-5 text-zinc-600" />
      </div>
      <p class="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.2em]">Received Document</p>
    </div>
  {/if}

  <div class="bg-white border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-xl overflow-hidden">
    <div class="py-5 px-10 border-b border-zinc-100 flex items-center justify-between bg-[#fafafa]">
      <div class="flex items-center gap-4">
        <div class="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center">
          <FileText class="w-4 h-4 text-zinc-700" />
        </div>
        <span class="font-semibold text-sm text-zinc-900 uppercase tracking-[0.1em]">{title}</span>
      </div>
      <div class="flex items-center gap-6">
        <span class="text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-medium flex items-center gap-2">
          {#if showExport}
            <CheckCircle2 class="w-3.5 h-3.5 text-zinc-900" />
          {:else}
            <span class="w-1.5 h-1.5 rounded-full {isIncoming ? 'bg-zinc-400' : 'bg-zinc-900'}"></span>
          {/if}
          {statusLabel}
        </span>
        {#if showExport}
          <button class="flex items-center gap-2 text-[11px] text-zinc-900 font-semibold uppercase tracking-[0.2em] hover:bg-zinc-100 px-4 py-2 rounded-md transition-colors border border-zinc-200 shadow-sm">
            <Download class="w-3.5 h-3.5" />
            Export
          </button>
        {/if}
      </div>
    </div>
    <div class="p-16 max-h-[60vh] overflow-y-auto bg-zinc-50/50">
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
