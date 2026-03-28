<script lang="ts">
  import { SendHorizonal, Paperclip, Pause, Play, ChevronUp, User } from 'lucide-svelte';
  import { workflow } from '$lib/stores/workflow.svelte';

  let inputText = $state('');
  let threadOpen = $state(false);
  let threadEl: HTMLDivElement | undefined = $state();

  function handleSend() {
    const text = inputText.trim();
    if (!text) return;
    workflow.sendMessage(text);
    inputText = '';
    threadOpen = true;
    scrollThread();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function togglePause() {
    if (workflow.paused) workflow.resume();
    else workflow.pause();
  }

  async function scrollThread() {
    await new Promise(r => setTimeout(r, 50));
    if (threadEl) threadEl.scrollTop = threadEl.scrollHeight;
  }

  function formatTime(d: Date) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
</script>

<div class="shrink-0 border-t border-ink-ghost/50 bg-gradient-to-t from-cream via-cream to-cream/80">
  {#if threadOpen && workflow.chatMessages.length > 0}
    <div
      bind:this={threadEl}
      class="max-h-40 overflow-y-auto px-6 pt-3 pb-1 space-y-2"
    >
      {#each workflow.chatMessages as msg}
        <div class="flex items-start gap-2.5 justify-end">
          <div class="bg-white border border-ink-ghost/40 rounded-xl rounded-br-sm px-3.5 py-2 max-w-md">
            <p class="text-[13px] text-ink leading-relaxed">{msg.text}</p>
            <span class="text-[10px] text-ink-faint mt-0.5 block text-right">{formatTime(msg.timestamp)}</span>
          </div>
          <div class="w-6 h-6 rounded-full bg-terra-muted flex items-center justify-center shrink-0 mt-0.5">
            <User class="w-3 h-3 text-terra" />
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <div class="px-4 py-3">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white border rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 {workflow.paused ? 'border-amber-400/70 ring-2 ring-amber-400/15' : 'border-ink-ghost/60'}">
        <div class="flex items-center gap-2 px-4 py-2.5">
          <!-- Status indicator -->
          <div class="flex items-center gap-2 shrink-0 pr-2 border-r border-ink-ghost/30 mr-1">
            {#if workflow.paused}
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span class="text-[10px] font-semibold text-amber-600 uppercase tracking-wider whitespace-nowrap">Paused</span>
            {:else}
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-terra opacity-60"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-terra"></span>
              </span>
              <span class="text-[10px] font-semibold text-ink-faint uppercase tracking-wider whitespace-nowrap">Working</span>
            {/if}
          </div>

          <!-- Thread toggle -->
          {#if workflow.chatMessages.length > 0}
            <button
              onclick={() => { threadOpen = !threadOpen; if (threadOpen) scrollThread(); }}
              class="flex items-center gap-1 text-[10px] font-medium text-ink-faint hover:text-ink-muted transition-colors shrink-0"
            >
              <ChevronUp class="w-3 h-3 transition-transform duration-200 {threadOpen ? 'rotate-180' : ''}" />
              {workflow.chatMessages.length}
            </button>
          {/if}

          <!-- Input -->
          <input
            type="text"
            bind:value={inputText}
            onkeydown={handleKeydown}
            placeholder="Send instructions to the agent..."
            class="flex-1 min-w-0 text-[13px] text-ink placeholder:text-ink-faint bg-transparent border-0 outline-none py-1"
          />

          <!-- Actions -->
          <div class="flex items-center gap-1.5 shrink-0">
            <button class="p-1.5 rounded-lg text-ink-faint hover:text-ink-muted hover:bg-cream-deep/60 transition-colors">
              <Paperclip class="w-3.5 h-3.5" />
            </button>
            <button
              onclick={togglePause}
              class="p-1.5 rounded-lg transition-colors {workflow.paused ? 'text-amber-600 hover:text-amber-700 hover:bg-amber-50' : 'text-ink-faint hover:text-ink-muted hover:bg-cream-deep/60'}"
              title={workflow.paused ? 'Resume agent' : 'Pause agent'}
            >
              {#if workflow.paused}
                <Play class="w-3.5 h-3.5" />
              {:else}
                <Pause class="w-3.5 h-3.5" />
              {/if}
            </button>
            <button
              onclick={handleSend}
              disabled={!inputText.trim()}
              class="p-1.5 rounded-lg transition-colors {inputText.trim() ? 'text-terra hover:bg-terra-muted' : 'text-ink-ghost cursor-not-allowed'}"
            >
              <SendHorizonal class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
