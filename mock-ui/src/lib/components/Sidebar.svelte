<script lang="ts">
  import { Plus, CheckCircle2, Circle, ShieldAlert, Lock, Scale, Briefcase, ChevronDown } from 'lucide-svelte';
  import * as Select from "$lib/components/ui/select";
  import { workflow } from '$lib/stores/workflow.svelte';
  import { prosecutionDocs, defenseDocs, type WorkflowDoc } from '$lib/data/mockData';

  const dummySuits = [
    { id: 'doe-v-techcorp', name: 'Doe v. TechCorp', role: 'Plaintiff', status: 'Active', date: 'Mar 2024', docs: 4 },
    { id: 'smith-v-acme', name: 'Smith v. Acme Ltd.', role: 'Defendant', status: 'Closed', date: 'Jan 2024', docs: 7 },
    { id: 'rivera-v-globex', name: 'Rivera v. Globex', role: 'Plaintiff', status: 'Closed', date: 'Nov 2023', docs: 5 },
    { id: 'chen-v-initech', name: 'Chen v. Initech', role: 'Defendant', status: 'Settled', date: 'Sep 2023', docs: 3 },
  ];

  let selectedSuit = $state<string | null>(null);

  const activeSuits = dummySuits.filter(s => s.status === 'Active');
  let selectedActiveSuit = $state<string | null>(activeSuits.length === 1 ? activeSuits[0].id : null);
  let selectedActiveSuitData = $derived(dummySuits.find(s => s.id === selectedActiveSuit) ?? null);

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
  <div class="px-6 py-5 border-b border-ink-ghost/60">
    <h2 class="font-serif font-bold text-4xl tracking-wide text-ink leading-none">SEER</h2>
    <p class="text-xs text-ink-muted tracking-[0.2em] uppercase mt-1.5">by Protego AI</p>
  </div>

  <div class="p-4 flex-1 overflow-y-auto">
    <button onclick={() => workflow.reset()} class="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-terra text-white hover:bg-terra-dark px-4 py-2.5 rounded-full mb-5 transition-colors shadow-sm">
      <Plus class="w-4 h-4" />
      Start New Suit
    </button>

    <div class="mb-5">
      <h3 class="text-[10px] font-medium text-ink-faint uppercase tracking-widest mb-2.5 px-3">Recent Suits</h3>
      <div class="space-y-1">
        {#each dummySuits as suit}
          <button
            onclick={() => selectedSuit = suit.id}
            class="w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150 group {selectedSuit === suit.id ? 'bg-terra-muted border border-terra/20' : 'hover:bg-cream-hover border border-transparent'}"
          >
            <div class="flex items-center gap-2.5">
              <div class="w-7 h-7 rounded-md flex items-center justify-center shrink-0 {selectedSuit === suit.id ? 'bg-terra/10' : 'bg-cream-deep'}">
                {#if suit.role === 'Plaintiff'}
                  <Scale class="w-3.5 h-3.5 {selectedSuit === suit.id ? 'text-terra' : 'text-ink-faint'}" />
                {:else}
                  <Briefcase class="w-3.5 h-3.5 {selectedSuit === suit.id ? 'text-terra' : 'text-ink-faint'}" />
                {/if}
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-medium truncate {selectedSuit === suit.id ? 'text-terra' : 'text-ink'}">
                  {suit.name}
                </div>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <span class="text-[10px] text-ink-faint">{suit.role}</span>
                  <span class="text-[10px] text-ink-ghost">·</span>
                  <span class="text-[10px] {suit.status === 'Active' ? 'text-terra' : suit.status === 'Settled' ? 'text-ink-muted' : 'text-ink-faint'}">{suit.status}</span>
                  <span class="text-[10px] text-ink-ghost">·</span>
                  <span class="text-[10px] text-ink-faint">{suit.docs} docs</span>
                </div>
              </div>
            </div>
          </button>
        {/each}
      </div>
    </div>

    <div class="border-t border-ink-ghost/40 pt-4">
      <div class="px-3 mb-4">
        <h3 class="text-[10px] font-medium text-ink-faint uppercase tracking-widest mb-2">Active Suit</h3>
        <Select.Root
          type="single"
          value={selectedActiveSuit ?? undefined}
          onValueChange={(v) => { selectedActiveSuit = v ?? null; }}
        >
          <Select.Trigger class="w-full bg-white border-ink-ghost/60 text-xs font-medium text-ink rounded-lg h-8">
            {#if selectedActiveSuitData}
              <span class="flex items-center gap-2 text-ink">
                <div class="w-1.5 h-1.5 rounded-full bg-terra shrink-0"></div>
                {selectedActiveSuitData.name}
              </span>
            {:else}
              <span class="text-ink-faint">Select a suit...</span>
            {/if}
          </Select.Trigger>
          <Select.Content class="bg-white border-ink-ghost/60 rounded-xl">
            {#each activeSuits as suit}
              <Select.Item value={suit.id} label={suit.name}>
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-terra shrink-0"></div>
                  <span>{suit.name}</span>
                  <span class="text-ink-faint ml-auto text-[10px]">{suit.role}</span>
                </div>
              </Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>

      {#if selectedActiveSuit && workflow.role}
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
      {:else if selectedActiveSuit && !workflow.role}
        <div class="px-3 py-4 text-center">
          <p class="text-xs text-ink-faint">Select a role to begin</p>
        </div>
      {:else}
        <div class="px-3 py-3 text-center">
          <p class="text-xs text-ink-faint">Select an active suit to view status</p>
        </div>
      {/if}
    </div>
  </div>
</aside>
