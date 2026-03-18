<script lang="ts">
  import { Plus, FileText, CheckCircle2, Circle, ShieldAlert, Lock } from 'lucide-svelte';
  import { workflow } from '$lib/stores/workflow.svelte';
  import { prosecutionDocs, defenseDocs, type WorkflowDoc } from '$lib/data/mockData';

  let docs = $derived(workflow.role === 'prosecution' ? prosecutionDocs : workflow.role === 'defense' ? defenseDocs : []);

  function getPhaseLabel(phase: number): string {
    if (workflow.role === 'prosecution') {
      return ['Phase 0 · Pre-Suit', 'Phase 1 · Initiation', 'Phase 2 · Pleadings'][phase] ?? '';
    }
    return ['Phase 0 · Preserve', 'Phase 1 · Respond', 'Phase 2 · Pleadings'][phase] ?? '';
  }

  function isDocVisible(doc: WorkflowDoc): boolean {
    if (!doc.branch) return true;
    if (workflow.role === 'prosecution') {
      if (doc.branch === 'mtd') return workflow.defenseAction === 'mtd';
      if (doc.branch === 'nothing') return workflow.defenseAction === 'nothing';
      if (doc.branch === 'answer-cc') return workflow.defenseAction === 'answer' && workflow.hasCounterclaim === true;
    } else {
      if (doc.branch === 'answer') return workflow.defenseStrategy === 'answer';
      if (doc.branch === 'answer-cc') return workflow.defenseStrategy === 'answer' && workflow.hasCounterclaim === true;
      if (doc.branch === 'mtd') return workflow.defenseStrategy === 'mtd';
    }
    return false;
  }

  function isBranchUnresolved(doc: WorkflowDoc): boolean {
    if (!doc.branch) return false;
    if (workflow.role === 'prosecution') {
      if (['mtd', 'nothing', 'answer-cc'].includes(doc.branch)) return workflow.defenseAction === null;
    } else {
      if (['answer', 'answer-cc', 'mtd'].includes(doc.branch)) return workflow.defenseStrategy === null;
    }
    return false;
  }

  function isDocComplete(doc: WorkflowDoc): boolean {
    return workflow.completedDocs.includes(doc.id);
  }

  function isDocActive(doc: WorkflowDoc): boolean {
    const step = workflow.step;
    const id = doc.id;
    if (id === 'hold-notice') return step.includes('hold-notice');
    if (id === 'demand-letter') return step.includes('demand-letter');
    if (id === 'complaint') return step.includes('complaint') && !step.includes('analysis') || step === 'p-complaint-analysis' || step.startsWith('p-complaint');
    if (id === 'cover-sheet') return step.includes('cover-sheet');
    if (id === 'opposition-mtd') return step.includes('opp-mtd');
    if (id === 'default-motion') return step.includes('default-motion');
    if (id === 'reply-counterclaim') return step.includes('reply-cc');
    if (id === 'answer') return step.includes('answer') || step === 'd-fact-review';
    if (id === 'counterclaim') return step.includes('d-cc-') && !step.includes('decision');
    if (id === 'mtd') return step.includes('mtd') && !step.includes('opp') && !step.includes('reply') || step === 'd-defect-scan' || step === 'd-ground-select' || step === 'd-case-law';
    if (id === 'reply-mtd') return step.includes('d-reply-');
    return false;
  }

  const phases = $derived([...new Set(docs.map(d => d.phase))].sort());
</script>

<aside class="w-72 border-r border-ink-ghost/60 bg-cream-sidebar flex flex-col h-full z-10 relative">
  <div class="p-6 border-b border-ink-ghost/60">
    <h2 class="font-serif font-bold text-xl tracking-wide text-ink">SEER</h2>
    <p class="text-[10px] text-ink-muted tracking-widest uppercase mt-1">by Protego AI</p>
  </div>

  <div class="p-4 flex-1 overflow-y-auto">
    <button onclick={() => workflow.reset()} class="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-terra text-white hover:bg-terra-dark px-4 py-2.5 rounded-full mb-6 transition-colors shadow-sm">
      <Plus class="w-4 h-4" />
      Start New Suit
    </button>

    {#if workflow.role}
      <div class="space-y-6">
        {#each phases as phase}
          <div>
            <h3 class="text-[10px] font-medium text-ink-faint uppercase tracking-widest mb-3 px-3">{getPhaseLabel(phase)}</h3>
            <div class="space-y-0.5">
              {#each docs.filter(d => d.phase === phase) as doc}
                {#if isBranchUnresolved(doc)}
                  <div class="flex items-center gap-3 text-sm px-3 py-2 text-ink-ghost">
                    <Lock class="w-3.5 h-3.5" />
                    <span class="text-xs">{doc.name}</span>
                  </div>
                {:else if isDocVisible(doc)}
                  <div class="flex items-center gap-3 text-sm px-3 py-2 rounded-lg transition-colors {isDocActive(doc) ? 'bg-terra-muted text-terra font-medium' : isDocComplete(doc) ? 'text-ink-muted' : 'text-ink-faint'}">
                    {#if isDocComplete(doc)}
                      <CheckCircle2 class="w-3.5 h-3.5 text-terra shrink-0" />
                    {:else if isDocActive(doc)}
                      <div class="w-3.5 h-3.5 rounded-full border-2 border-terra shrink-0 flex items-center justify-center">
                        <div class="w-1.5 h-1.5 rounded-full bg-terra"></div>
                      </div>
                    {:else}
                      <Circle class="w-3.5 h-3.5 text-ink-ghost shrink-0" />
                    {/if}
                    <span class="text-xs">{doc.name}</span>
                    {#if doc.type === 'substantive'}
                      <ShieldAlert class="w-3 h-3 text-ink-ghost ml-auto shrink-0" />
                    {/if}
                  </div>
                {/if}
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="px-3 py-8 text-center">
        <p class="text-xs text-ink-faint">Select a role to begin</p>
      </div>
    {/if}
  </div>
</aside>
