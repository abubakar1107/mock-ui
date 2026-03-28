<script lang="ts">
  import {
    Archive, ArrowLeft, FileText, ShieldAlert, CheckCircle2,
    Swords, Download, Scale, Clock, X, Gavel,
    ScrollText, Briefcase, FileSearch, Shield
  } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { workflow } from '$lib/stores/workflow.svelte';
  import {
    prosecutionData, defenseData,
    prosecutionDocs, defenseDocs,
  } from '$lib/data/mockData';

  onMount(() => {
    try {
      const raw = localStorage.getItem('seer-workflow');
      if (!raw) return;
      const s = JSON.parse(raw);
      if (s.role) workflow.role = s.role;
      if (s.step) workflow.step = s.step;
      if (s.substep != null) workflow.substep = s.substep;
      if (s.completedDocs) workflow.completedDocs = s.completedDocs;
      if (s.defenseStrategy) workflow.defenseStrategy = s.defenseStrategy;
      if (s.defenseAction) workflow.defenseAction = s.defenseAction;
      if (s.hasCounterclaim != null) workflow.hasCounterclaim = s.hasCounterclaim;
      if (s.demandResponse) workflow.demandResponse = s.demandResponse;
    } catch {}
  });

  let role = $derived(workflow.role);

  type VaultDoc = {
    id: string;
    title: string;
    content: string;
    status: 'final' | 'draft' | 'received';
    type: 'administrative' | 'substantive';
    date: string;
  };

  type SimReport = { id: string; title: string; opponent: string; rounds: number; date: string };

  type VaultCategory = {
    id: string;
    label: string;
    icon: typeof FileText;
    accent: string;
    docs: VaultDoc[];
  };

  type SimCategory = {
    id: string;
    label: string;
    icon: typeof Swords;
    accent: string;
    sims: SimReport[];
  };

  let categories = $derived.by((): VaultCategory[] => {
    if (!role) return [];
    if (role === 'prosecution') {
      const preSuit: VaultDoc[] = [
        { id: 'p-hold', title: 'Litigation Hold Notice', content: prosecutionData.holdNotice.draft, status: workflow.completedDocs.includes('hold-notice') ? 'final' : 'draft', type: 'administrative', date: 'Mar 15, 2024' },
        { id: 'p-demand', title: 'Demand Letter', content: prosecutionData.demandLetter.draft, status: workflow.completedDocs.includes('demand-letter') ? 'final' : 'draft', type: 'administrative', date: 'Mar 16, 2024' },
      ];
      const initiating: VaultDoc[] = [
        { id: 'p-complaint', title: 'Complaint for Breach of Contract', content: prosecutionData.complaint.draft, status: workflow.completedDocs.includes('complaint') ? 'final' : 'draft', type: 'substantive', date: 'Mar 18, 2024' },
        { id: 'p-cover', title: 'Civil Cover Sheet (JS-44)', content: prosecutionData.coverSheet.draft, status: workflow.completedDocs.includes('cover-sheet') ? 'final' : 'draft', type: 'administrative', date: 'Mar 18, 2024' },
      ];
      const responsive: VaultDoc[] = [];
      if (workflow.defenseAction === 'mtd') {
        responsive.push({ id: 'p-opp', title: 'Opposition to Motion to Dismiss', content: prosecutionData.oppositionToMTD.draft, status: workflow.completedDocs.includes('opposition-mtd') ? 'final' : 'draft', type: 'substantive', date: 'Apr 8, 2024' });
      }
      if (workflow.defenseAction === 'nothing') {
        responsive.push({ id: 'p-default', title: 'Motion for Entry of Default', content: prosecutionData.motionForDefault.draft, status: workflow.completedDocs.includes('default-motion') ? 'final' : 'draft', type: 'administrative', date: 'Apr 12, 2024' });
      }
      if (workflow.hasCounterclaim) {
        responsive.push({ id: 'p-reply-cc', title: 'Reply to Counterclaim', content: prosecutionData.replyToCounterclaim.draft, status: workflow.completedDocs.includes('reply-counterclaim') ? 'final' : 'draft', type: 'substantive', date: 'Apr 15, 2024' });
      }
      const incoming: VaultDoc[] = [];
      if (workflow.defenseAction === 'mtd') {
        incoming.push({ id: 'inc-mtd', title: "Defendant's Motion to Dismiss", content: prosecutionData.incoming.mtd, status: 'received', type: 'substantive', date: 'Apr 2, 2024' });
      }
      if (workflow.defenseAction === 'answer') {
        incoming.push({ id: 'inc-answer', title: "Defendant's Answer & Affirmative Defenses", content: prosecutionData.incoming.answer, status: 'received', type: 'substantive', date: 'Apr 2, 2024' });
      }
      if (workflow.hasCounterclaim) {
        incoming.push({ id: 'inc-cc', title: "Defendant's Counterclaim", content: prosecutionData.incoming.counterclaim, status: 'received', type: 'substantive', date: 'Apr 2, 2024' });
      }

      const result: VaultCategory[] = [
        { id: 'pre-suit', label: 'Pre-Suit Documents', icon: ScrollText, accent: 'text-terra', docs: preSuit },
        { id: 'initiating', label: 'Initiating Pleadings', icon: Gavel, accent: 'text-terra', docs: initiating },
      ];
      if (responsive.length > 0) result.push({ id: 'responsive', label: 'Responsive Pleadings & Motions', icon: Shield, accent: 'text-terra', docs: responsive });
      if (incoming.length > 0) result.push({ id: 'incoming', label: 'Opposing Party Documents', icon: ShieldAlert, accent: 'text-rival-deep', docs: incoming });
      return result;
    } else {
      const preservation: VaultDoc[] = [
        { id: 'd-hold', title: 'Litigation Hold Notice', content: defenseData.holdNotice.draft, status: workflow.completedDocs.includes('hold-notice') ? 'final' : 'draft', type: 'administrative', date: 'Mar 20, 2024' },
      ];
      const responsive: VaultDoc[] = [];
      if (workflow.defenseStrategy === 'answer') {
        responsive.push({ id: 'd-answer', title: 'Answer & Affirmative Defenses', content: defenseData.answer.draft, status: workflow.completedDocs.includes('answer') ? 'final' : 'draft', type: 'substantive', date: 'Mar 25, 2024' });
        if (workflow.hasCounterclaim) {
          responsive.push({ id: 'd-cc', title: 'Counterclaim / Crossclaim', content: defenseData.counterclaim.draft, status: workflow.completedDocs.includes('counterclaim') ? 'final' : 'draft', type: 'substantive', date: 'Mar 28, 2024' });
        }
      }
      const motions: VaultDoc[] = [];
      if (workflow.defenseStrategy === 'mtd') {
        motions.push(
          { id: 'd-mtd', title: 'Motion to Dismiss (Rule 12(b))', content: defenseData.mtd.draft, status: workflow.completedDocs.includes('mtd') ? 'final' : 'draft', type: 'substantive', date: 'Mar 26, 2024' },
          { id: 'd-reply', title: 'Reply in Support of Motion to Dismiss', content: defenseData.replyInSupport.draft, status: workflow.completedDocs.includes('reply-mtd') ? 'final' : 'draft', type: 'substantive', date: 'Apr 10, 2024' },
        );
      }
      const incoming: VaultDoc[] = [
        { id: 'inc-complaint', title: "Plaintiff's Complaint", content: defenseData.incoming.complaint, status: 'received', type: 'substantive', date: 'Mar 19, 2024' },
      ];
      if (workflow.defenseStrategy === 'mtd') {
        incoming.push({ id: 'inc-opp', title: "Plaintiff's Opposition to Motion to Dismiss", content: defenseData.incoming.oppositionToMTD, status: 'received', type: 'substantive', date: 'Apr 5, 2024' });
      }

      const result: VaultCategory[] = [
        { id: 'preservation', label: 'Preservation & Hold', icon: ScrollText, accent: 'text-terra', docs: preservation },
      ];
      if (responsive.length > 0) result.push({ id: 'responsive', label: 'Responsive Pleadings', icon: FileText, accent: 'text-terra', docs: responsive });
      if (motions.length > 0) result.push({ id: 'motions', label: 'Motions Practice', icon: Briefcase, accent: 'text-terra', docs: motions });
      result.push({ id: 'incoming', label: 'Opposing Party Documents', icon: ShieldAlert, accent: 'text-rival-deep', docs: incoming });
      return result;
    }
  });

  let simCategory = $derived.by((): SimReport[] => {
    if (!role) return [];
    const items: SimReport[] = [];
    if (role === 'prosecution') {
      items.push({ id: 'sim-complaint', title: 'Complaint — Adversarial Simulation', opponent: 'Defense Counsel', rounds: prosecutionData.complaint.simulationLogs.length, date: 'Mar 18, 2024' });
      if (workflow.defenseAction === 'mtd') items.push({ id: 'sim-opp', title: 'Opposition to MTD — Adversarial Simulation', opponent: 'Defense Counsel', rounds: prosecutionData.oppositionToMTD.simulationLogs.length, date: 'Apr 9, 2024' });
      if (workflow.hasCounterclaim) items.push({ id: 'sim-reply-cc', title: 'Reply to Counterclaim — Adversarial Simulation', opponent: 'Defense Counsel', rounds: prosecutionData.replyToCounterclaim.simulationLogs.length, date: 'Apr 16, 2024' });
    } else {
      if (workflow.defenseStrategy === 'answer') {
        items.push({ id: 'sim-answer', title: 'Answer — Adversarial Simulation', opponent: 'Plaintiff Counsel', rounds: defenseData.answer.simulationLogs.length, date: 'Mar 26, 2024' });
        if (workflow.hasCounterclaim) items.push({ id: 'sim-cc', title: 'Counterclaim — Adversarial Simulation', opponent: 'Plaintiff Counsel', rounds: defenseData.counterclaim.simulationLogs.length, date: 'Mar 29, 2024' });
      }
      if (workflow.defenseStrategy === 'mtd') {
        items.push(
          { id: 'sim-mtd', title: 'Motion to Dismiss — Adversarial Simulation', opponent: 'Plaintiff Counsel', rounds: defenseData.mtd.simulationLogs.length, date: 'Mar 27, 2024' },
          { id: 'sim-reply', title: 'Reply in Support — Adversarial Simulation', opponent: 'Plaintiff Counsel', rounds: defenseData.replyInSupport.simulationLogs.length, date: 'Apr 11, 2024' },
        );
      }
    }
    return items;
  });

  let totalDocs = $derived(categories.reduce((sum, c) => sum + c.docs.length, 0));

  let openDoc = $state<VaultDoc | null>(null);

  function statusColor(status: string) {
    switch (status) {
      case 'final': return 'bg-terra-muted text-terra';
      case 'draft': return 'bg-cream-deep text-ink-muted';
      case 'received': return 'bg-rival-light text-rival-deep';
      default: return 'bg-cream-deep text-ink-faint';
    }
  }
</script>

<!-- Document viewer overlay -->
{#if openDoc}
  <div class="fixed inset-0 z-50 flex">
    <!-- Backdrop -->
    <button class="absolute inset-0 bg-ink/40 backdrop-blur-sm" onclick={() => openDoc = null}></button>
    <!-- Panel -->
    <div class="relative ml-auto w-full max-w-3xl bg-cream flex flex-col shadow-2xl animate-slide-in">
      <div class="shrink-0 px-8 py-5 border-b border-ink-ghost/50 bg-white/80 flex items-center justify-between">
        <div>
          <h2 class="text-base font-semibold text-ink">{openDoc.title}</h2>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full {statusColor(openDoc.status)}">{openDoc.status}</span>
            <span class="text-[10px] text-ink-faint">{openDoc.type}</span>
            <span class="text-[10px] text-ink-ghost">·</span>
            <span class="text-[10px] text-ink-faint">{openDoc.date}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          {#if openDoc.status === 'final'}
            <button class="flex items-center gap-1.5 text-xs font-semibold text-terra hover:bg-terra-muted px-4 py-2 rounded-full transition-colors border border-terra/30">
              <Download class="w-3.5 h-3.5" /> Export
            </button>
          {/if}
          <button onclick={() => openDoc = null} class="p-2 rounded-lg hover:bg-cream-deep text-ink-muted hover:text-ink transition-colors">
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto p-8">
        <div class="bg-white border border-ink-ghost/40 max-w-2xl mx-auto p-12 min-h-[500px] rounded shadow-[0_1px_4px_rgba(0,0,0,0.04)] relative">
          <div class="absolute top-0 bottom-0 left-10 w-[1px] bg-terra/8"></div>
          <div class="absolute top-0 bottom-0 left-[44px] w-[1px] bg-terra/8"></div>
          <div class="text-[14px] whitespace-pre-wrap text-ink-light leading-[2.1] pl-6 relative z-10">{openDoc.content}</div>
        </div>
      </div>
    </div>
  </div>
{/if}

<div class="h-full flex flex-col">
  <!-- Header -->
  <header class="shrink-0 border-b border-ink-ghost/60 bg-white/80 backdrop-blur-sm px-8 py-4 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 rounded-xl bg-terra-muted flex items-center justify-center">
        <Archive class="w-5 h-5 text-terra" />
      </div>
      <div>
        <h1 class="font-serif text-xl font-bold text-ink tracking-tight">Dungeon</h1>
        <p class="text-[11px] text-ink-faint uppercase tracking-widest">Document Vault</p>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2.5">
        <span class="text-sm font-medium text-ink">Doe v. TechCorp</span>
        {#if role}
          <span class="text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full {role === 'prosecution' ? 'bg-terra text-white' : 'bg-cream-deep text-ink-light border border-ink-ghost/60'}">
            {role === 'prosecution' ? 'Plaintiff' : 'Defendant'}
          </span>
        {/if}
      </div>
      <a href="/" class="flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-terra transition-colors">
        <ArrowLeft class="w-3.5 h-3.5" />
        Back to Case
      </a>
    </div>
  </header>

  <!-- Content -->
  <div class="flex-1 overflow-y-auto px-8 py-8">
    <div class="max-w-6xl mx-auto space-y-10">

      {#if !role}
        <div class="text-center py-24">
          <Archive class="w-12 h-12 text-ink-ghost mx-auto mb-4" />
          <h2 class="font-serif text-xl font-bold text-ink-muted italic">No Active Case</h2>
          <p class="text-sm text-ink-faint mt-2">Start a suit to populate the vault.</p>
        </div>
      {:else}

        <!-- Stats bar -->
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-white border border-ink-ghost/50 rounded-xl p-5 flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-terra-muted flex items-center justify-center">
              <FileText class="w-5 h-5 text-terra" />
            </div>
            <div>
              <div class="text-2xl font-bold font-serif text-ink">{totalDocs}</div>
              <div class="text-[11px] text-ink-faint uppercase tracking-wider">Total Docs</div>
            </div>
          </div>
          <div class="bg-white border border-ink-ghost/50 rounded-xl p-5 flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-terra/10 flex items-center justify-center">
              <CheckCircle2 class="w-5 h-5 text-terra" />
            </div>
            <div>
              <div class="text-2xl font-bold font-serif text-ink">{workflow.completedDocs.length}</div>
              <div class="text-[11px] text-ink-faint uppercase tracking-wider">Finalized</div>
            </div>
          </div>
          <div class="bg-white border border-ink-ghost/50 rounded-xl p-5 flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-rival-light flex items-center justify-center">
              <ShieldAlert class="w-5 h-5 text-rival-deep" />
            </div>
            <div>
              <div class="text-2xl font-bold font-serif text-ink">{categories.find(c => c.id === 'incoming')?.docs.length ?? 0}</div>
              <div class="text-[11px] text-ink-faint uppercase tracking-wider">Incoming</div>
            </div>
          </div>
          <div class="bg-white border border-ink-ghost/50 rounded-xl p-5 flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-ally-light flex items-center justify-center">
              <Swords class="w-5 h-5 text-ally-deep" />
            </div>
            <div>
              <div class="text-2xl font-bold font-serif text-ink">{simCategory.length}</div>
              <div class="text-[11px] text-ink-faint uppercase tracking-wider">Simulations</div>
            </div>
          </div>
        </div>

        <!-- Document categories -->
        {#each categories as cat}
          <section>
            <div class="flex items-center gap-3 mb-5">
              <cat.icon class="w-4.5 h-4.5 {cat.accent}" />
              <h2 class="text-sm font-semibold text-ink uppercase tracking-wider">{cat.label}</h2>
              <span class="text-[10px] font-medium text-ink-faint bg-cream-deep px-2 py-0.5 rounded-full">{cat.docs.length}</span>
              <div class="flex-1 h-px bg-ink-ghost/40"></div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              {#each cat.docs as doc}
                <button
                  onclick={() => openDoc = doc}
                  class="bg-white border border-ink-ghost/50 rounded-xl p-5 text-left hover:shadow-lg hover:border-terra/30 transition-all duration-200 group cursor-pointer"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex-1 min-w-0">
                      <h3 class="text-sm font-semibold text-ink group-hover:text-terra transition-colors">{doc.title}</h3>
                      <div class="flex items-center gap-2 mt-2">
                        <span class="text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full {statusColor(doc.status)}">{doc.status}</span>
                        <span class="text-[10px] text-ink-faint">{doc.type}</span>
                        <span class="text-[10px] text-ink-ghost">·</span>
                        <span class="text-[10px] text-ink-faint flex items-center gap-1"><Clock class="w-2.5 h-2.5" />{doc.date}</span>
                      </div>
                    </div>
                    <div class="shrink-0 flex items-center gap-2">
                      {#if doc.status === 'final'}
                        <CheckCircle2 class="w-5 h-5 text-terra" />
                      {:else if doc.status === 'received'}
                        <ShieldAlert class="w-5 h-5 text-rival" />
                      {:else}
                        <FileText class="w-5 h-5 text-ink-ghost group-hover:text-terra/50 transition-colors" />
                      {/if}
                    </div>
                  </div>
                  <div class="mt-3 text-[12px] text-ink-faint line-clamp-2 leading-relaxed">{doc.content.slice(0, 180)}...</div>
                </button>
              {/each}
            </div>
          </section>
        {/each}

        <!-- Adversarial Simulations -->
        {#if simCategory.length > 0}
          <section>
            <div class="flex items-center gap-3 mb-5">
              <Swords class="w-4.5 h-4.5 text-ally-deep" />
              <h2 class="text-sm font-semibold text-ink uppercase tracking-wider">Adversarial Simulations</h2>
              <span class="text-[10px] font-medium text-ink-faint bg-cream-deep px-2 py-0.5 rounded-full">{simCategory.length}</span>
              <div class="flex-1 h-px bg-ink-ghost/40"></div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              {#each simCategory as sim}
                <div class="bg-white border border-ink-ghost/50 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-8 h-8 rounded-lg bg-ally-light flex items-center justify-center">
                      <Swords class="w-4 h-4 text-ally-deep" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="text-[13px] font-semibold text-ink">{sim.title}</h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center gap-2.5">
                      <span class="text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full bg-ally-light text-ally-deep">{sim.rounds} rounds</span>
                      <span class="text-[10px] text-ink-faint">vs. {sim.opponent}</span>
                    </div>
                    <span class="text-[10px] text-ink-faint flex items-center gap-1"><Clock class="w-2.5 h-2.5" />{sim.date}</span>
                  </div>
                </div>
              {/each}
            </div>
          </section>
        {/if}

      {/if}
    </div>
  </div>
</div>

<style>
  @keyframes slide-in {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  .animate-slide-in {
    animation: slide-in 0.25s ease-out;
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
