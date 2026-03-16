<script lang="ts">
  import {
    ChevronRight, Scale, ShieldAlert, Gavel, FileText, Paperclip,
    SendHorizonal, CheckCircle2, Check, Loader2, Clock
  } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';
  import { Textarea } from '$lib/components/ui/textarea';
  import { tick } from 'svelte';
  import { workflow } from '$lib/stores/workflow.svelte';
  import { prosecutionData, defenseData } from '$lib/data/mockData';

  import AnalysisTimeline from '$lib/components/AnalysisTimeline.svelte';
  import RedTeamSimulation from '$lib/components/RedTeamSimulation.svelte';
  import DocumentPreview from '$lib/components/DocumentPreview.svelte';
  import DecisionCard from '$lib/components/DecisionCard.svelte';
  import FactReview from '$lib/components/FactReview.svelte';

  let scrollContainer: HTMLDivElement | undefined = $state();

  async function scrollToBottom() {
    await tick();
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
    }
  }

  // ── Step labels ──────────────────────────────────────────────────────

  const stepLabels: Record<string, string> = {
    'role-select': 'Select Role',
    'p-init': 'Matter Initialization',
    'p-hold-notice-analysis': 'Litigation Hold Notice',
    'p-hold-notice-preview': 'Litigation Hold Notice',
    'p-demand-letter-analysis': 'Demand Letter',
    'p-demand-letter-preview': 'Demand Letter',
    'p-demand-decision': 'Demand Response',
    'p-complaint-analysis': 'Complaint',
    'p-complaint-draft': 'Complaint — Draft',
    'p-complaint-sim': 'Adversarial Simulation — Complaint',
    'p-complaint-final': 'Complaint — Final',
    'p-cover-sheet-analysis': 'Civil Cover Sheet',
    'p-cover-sheet-preview': 'Civil Cover Sheet',
    'p-file-serve': 'File & Serve',
    'p-wait-response': 'Awaiting Defense Response',
    'p-defense-response': 'Defense Response',
    'p-default-motion-analysis': 'Motion for Entry of Default',
    'p-default-motion-preview': 'Motion for Entry of Default',
    'p-default-end': 'Case Closed — Default Judgment',
    'p-receive-mtd': 'Received: Motion to Dismiss',
    'p-opp-mtd-analysis': 'Opposition to MTD',
    'p-opp-mtd-draft': 'Opposition to MTD — Draft',
    'p-opp-mtd-sim': 'Adversarial Simulation — Opposition',
    'p-opp-mtd-final': 'Opposition to MTD — Final',
    'p-hearing-end': 'Awaiting Hearing & Ruling',
    'p-receive-answer': 'Received: Answer',
    'p-cc-check': 'Counterclaim Check',
    'p-receive-counterclaim': 'Received: Counterclaim',
    'p-reply-cc-analysis': 'Reply to Counterclaim',
    'p-reply-cc-draft': 'Reply to Counterclaim — Draft',
    'p-reply-cc-sim': 'Adversarial Simulation — Reply',
    'p-reply-cc-final': 'Reply to Counterclaim — Final',
    'p-pleadings-closed': 'Pleadings Closed',
    'p-settlement-end': 'Case Closed — Settlement',
    'd-init': 'Matter Initialization',
    'd-hold-notice-analysis': 'Litigation Hold Notice',
    'd-hold-notice-preview': 'Litigation Hold Notice',
    'd-complaint-analysis': 'Complaint Analysis',
    'd-strategy': 'Defense Strategy',
    'd-fact-review': 'Fact Review Protocol',
    'd-answer-draft': 'Answer & Affirmative Defenses — Draft',
    'd-answer-sim': 'Adversarial Simulation — Answer',
    'd-answer-final': 'Answer — Final',
    'd-cc-decision': 'Counterclaim Decision',
    'd-cc-analysis': 'Counterclaim',
    'd-cc-draft': 'Counterclaim — Draft',
    'd-cc-sim': 'Adversarial Simulation — Counterclaim',
    'd-cc-final': 'Counterclaim — Final',
    'd-pleadings-closed': 'Pleadings Closed',
    'd-defect-scan': 'Legal Defect Scan',
    'd-ground-select': 'Ground Selection',
    'd-case-law': 'Case Law Research',
    'd-mtd-draft': 'Motion to Dismiss — Draft',
    'd-mtd-sim': 'Adversarial Simulation — MTD',
    'd-mtd-final': 'Motion to Dismiss — Final',
    'd-receive-opp': 'Received: Opposition to MTD',
    'd-reply-analysis': 'Reply in Support of MTD',
    'd-reply-draft': 'Reply in Support — Draft',
    'd-reply-sim': 'Adversarial Simulation — Reply',
    'd-reply-final': 'Reply in Support — Final',
    'd-hearing-prep': 'Hearing Preparation',
  };

  let stepLabel = $derived(stepLabels[workflow.step] ?? 'Workflow');

  // ── Max substep per step ─────────────────────────────────────────────

  function getMaxSubstep(step: string): number {
    switch (step) {
      case 'p-hold-notice-analysis': return prosecutionData.holdNotice.analysisSteps.length - 1;
      case 'p-demand-letter-analysis': return prosecutionData.demandLetter.analysisSteps.length - 1;
      case 'p-complaint-analysis': return prosecutionData.complaint.analysisSteps.length - 1;
      case 'p-complaint-sim': return prosecutionData.complaint.simulationLogs.length - 1;
      case 'p-cover-sheet-analysis': return prosecutionData.coverSheet.analysisSteps.length - 1;
      case 'p-opp-mtd-analysis': return prosecutionData.oppositionToMTD.analysisSteps.length - 1;
      case 'p-opp-mtd-sim': return prosecutionData.oppositionToMTD.simulationLogs.length - 1;
      case 'p-default-motion-analysis': return prosecutionData.motionForDefault.analysisSteps.length - 1;
      case 'p-reply-cc-analysis': return prosecutionData.replyToCounterclaim.analysisSteps.length - 1;
      case 'p-reply-cc-sim': return prosecutionData.replyToCounterclaim.simulationLogs.length - 1;
      case 'd-hold-notice-analysis': return defenseData.holdNotice.analysisSteps.length - 1;
      case 'd-complaint-analysis': return defenseData.complaintAnalysis.analysisSteps.length - 1;
      case 'd-fact-review': return defenseData.answer.factProcessSteps.length + defenseData.answer.facts.length - 1;
      case 'd-answer-sim': return defenseData.answer.simulationLogs.length - 1;
      case 'd-cc-analysis': return defenseData.counterclaim.analysisSteps.length - 1;
      case 'd-cc-sim': return defenseData.counterclaim.simulationLogs.length - 1;
      case 'd-defect-scan': return defenseData.mtd.defectScanSteps.length - 1;
      case 'd-case-law': return defenseData.mtd.caseLawResearchSteps.length - 1;
      case 'd-mtd-sim': return defenseData.mtd.simulationLogs.length - 1;
      case 'd-reply-analysis': return defenseData.replyInSupport.analysisSteps.length - 1;
      case 'd-reply-sim': return defenseData.replyInSupport.simulationLogs.length - 1;
      default: return 0;
    }
  }

  // ── Step transitions ─────────────────────────────────────────────────

  function getNextStep(step: string): string {
    switch (step) {
      // Prosecution flow
      case 'p-init': return 'p-hold-notice-analysis';
      case 'p-hold-notice-analysis': return 'p-hold-notice-preview';
      case 'p-hold-notice-preview': return 'p-demand-letter-analysis';
      case 'p-demand-letter-analysis': return 'p-demand-letter-preview';
      case 'p-demand-letter-preview': return 'p-demand-decision';
      case 'p-complaint-analysis': return 'p-complaint-draft';
      case 'p-complaint-draft': return 'p-complaint-sim';
      case 'p-complaint-sim': return 'p-complaint-final';
      case 'p-complaint-final': return 'p-cover-sheet-analysis';
      case 'p-cover-sheet-analysis': return 'p-cover-sheet-preview';
      case 'p-cover-sheet-preview': return 'p-file-serve';
      case 'p-file-serve': return 'p-wait-response';
      case 'p-wait-response': return 'p-defense-response';
      // Nothing branch
      case 'p-default-motion-analysis': return 'p-default-motion-preview';
      case 'p-default-motion-preview': return 'p-default-end';
      // MTD branch
      case 'p-receive-mtd': return 'p-opp-mtd-analysis';
      case 'p-opp-mtd-analysis': return 'p-opp-mtd-draft';
      case 'p-opp-mtd-draft': return 'p-opp-mtd-sim';
      case 'p-opp-mtd-sim': return 'p-opp-mtd-final';
      case 'p-opp-mtd-final': return 'p-hearing-end';
      // Answer branch
      case 'p-receive-answer': return 'p-cc-check';
      case 'p-receive-counterclaim': return 'p-reply-cc-analysis';
      case 'p-reply-cc-analysis': return 'p-reply-cc-draft';
      case 'p-reply-cc-draft': return 'p-reply-cc-sim';
      case 'p-reply-cc-sim': return 'p-reply-cc-final';
      case 'p-reply-cc-final': return 'p-pleadings-closed';

      // Defense flow
      case 'd-init': return 'd-hold-notice-analysis';
      case 'd-hold-notice-analysis': return 'd-hold-notice-preview';
      case 'd-hold-notice-preview': return 'd-complaint-analysis';
      case 'd-complaint-analysis': return 'd-strategy';
      // Answer path
      case 'd-fact-review': return 'd-answer-draft';
      case 'd-answer-draft': return 'd-answer-sim';
      case 'd-answer-sim': return 'd-answer-final';
      case 'd-answer-final': return 'd-cc-decision';
      case 'd-cc-analysis': return 'd-cc-draft';
      case 'd-cc-draft': return 'd-cc-sim';
      case 'd-cc-sim': return 'd-cc-final';
      case 'd-cc-final': return 'd-pleadings-closed';
      // MTD path
      case 'd-defect-scan': return 'd-ground-select';
      case 'd-ground-select': return 'd-case-law';
      case 'd-case-law': return 'd-mtd-draft';
      case 'd-mtd-draft': return 'd-mtd-sim';
      case 'd-mtd-sim': return 'd-mtd-final';
      case 'd-mtd-final': return 'd-receive-opp';
      case 'd-receive-opp': return 'd-reply-analysis';
      case 'd-reply-analysis': return 'd-reply-draft';
      case 'd-reply-draft': return 'd-reply-sim';
      case 'd-reply-sim': return 'd-reply-final';
      case 'd-reply-final': return 'd-hearing-prep';
      default: return step;
    }
  }

  // ── Document completion tracking ─────────────────────────────────────

  function trackCompletion(step: string) {
    const completionMap: Record<string, string> = {
      'p-hold-notice-preview': 'hold-notice',
      'p-demand-letter-preview': 'demand-letter',
      'p-complaint-final': 'complaint',
      'p-cover-sheet-preview': 'cover-sheet',
      'p-opp-mtd-final': 'opposition-mtd',
      'p-default-motion-preview': 'default-motion',
      'p-reply-cc-final': 'reply-counterclaim',
      'd-hold-notice-preview': 'hold-notice',
      'd-answer-final': 'answer',
      'd-cc-final': 'counterclaim',
      'd-mtd-final': 'mtd',
      'd-reply-final': 'reply-mtd',
    };
    const docId = completionMap[step];
    if (docId) workflow.markDocComplete(docId);
  }

  // ── Core navigation ──────────────────────────────────────────────────

  function nextPhase() {
    const max = getMaxSubstep(workflow.step);
    if (workflow.substep < max) {
      workflow.substep++;
      scrollToBottom();
    } else {
      trackCompletion(workflow.step);
      const next = getNextStep(workflow.step);
      workflow.stepHistory = [...workflow.stepHistory, workflow.step];
      workflow.step = next;
      workflow.substep = 0;
    }
  }

  function handleDecision(choice: string) {
    const step = workflow.step;
    workflow.stepHistory = [...workflow.stepHistory, step];
    workflow.substep = 0;

    if (step === 'p-demand-decision') {
      workflow.demandResponse = choice as 'settlement' | 'denied';
      workflow.step = choice === 'settlement' ? 'p-settlement-end' : 'p-complaint-analysis';
    } else if (step === 'p-defense-response') {
      workflow.defenseAction = choice as 'nothing' | 'mtd' | 'answer';
      if (choice === 'nothing') workflow.step = 'p-default-motion-analysis';
      else if (choice === 'mtd') workflow.step = 'p-receive-mtd';
      else workflow.step = 'p-receive-answer';
    } else if (step === 'p-cc-check') {
      workflow.hasCounterclaim = choice === 'yes';
      workflow.step = choice === 'yes' ? 'p-receive-counterclaim' : 'p-pleadings-closed';
    } else if (step === 'd-strategy') {
      workflow.defenseStrategy = choice as 'answer' | 'mtd';
      workflow.step = choice === 'answer' ? 'd-fact-review' : 'd-defect-scan';
    } else if (step === 'd-cc-decision') {
      workflow.hasCounterclaim = choice === 'yes';
      workflow.step = choice === 'yes' ? 'd-cc-analysis' : 'd-pleadings-closed';
    }
  }

  function selectRole(role: 'prosecution' | 'defense') {
    workflow.reset(role);
  }

  function prevStep() {
    workflow.back();
  }

  function toggleGround(rule: string) {
    if (workflow.selectedGrounds.includes(rule)) {
      workflow.selectedGrounds = workflow.selectedGrounds.filter(g => g !== rule);
    } else {
      workflow.selectedGrounds = [...workflow.selectedGrounds, rule];
    }
  }

  // ── Derived state ────────────────────────────────────────────────────

  let isEnd = $derived(
    workflow.step.endsWith('-end') ||
    workflow.step.endsWith('-closed') ||
    workflow.step === 'd-hearing-prep'
  );

  let isDecision = $derived(
    ['p-demand-decision', 'p-defense-response', 'p-cc-check', 'd-strategy', 'd-cc-decision'].includes(workflow.step)
  );

  let showNextButton = $derived(
    workflow.step !== 'role-select' &&
    !isEnd &&
    !isDecision &&
    workflow.step !== 'p-init' &&
    workflow.step !== 'd-init' &&
    workflow.step !== 'd-ground-select'
  );

  // ── Analysis data lookup ─────────────────────────────────────────────

  function getAnalysisSteps(step: string) {
    const map: Record<string, { text: string }[]> = {
      'p-hold-notice-analysis': prosecutionData.holdNotice.analysisSteps,
      'p-demand-letter-analysis': prosecutionData.demandLetter.analysisSteps,
      'p-complaint-analysis': prosecutionData.complaint.analysisSteps,
      'p-cover-sheet-analysis': prosecutionData.coverSheet.analysisSteps,
      'p-opp-mtd-analysis': prosecutionData.oppositionToMTD.analysisSteps,
      'p-default-motion-analysis': prosecutionData.motionForDefault.analysisSteps,
      'p-reply-cc-analysis': prosecutionData.replyToCounterclaim.analysisSteps,
      'd-hold-notice-analysis': defenseData.holdNotice.analysisSteps,
      'd-complaint-analysis': defenseData.complaintAnalysis.analysisSteps,
      'd-cc-analysis': defenseData.counterclaim.analysisSteps,
      'd-defect-scan': defenseData.mtd.defectScanSteps,
      'd-case-law': defenseData.mtd.caseLawResearchSteps,
      'd-reply-analysis': defenseData.replyInSupport.analysisSteps,
    };
    return map[step];
  }

  function getDocData(step: string): { title: string; content: string } | null {
    const map: Record<string, { title: string; content: string }> = {
      'p-hold-notice-preview': { title: 'Litigation Hold Notice', content: prosecutionData.holdNotice.draft },
      'p-demand-letter-preview': { title: 'Demand Letter', content: prosecutionData.demandLetter.draft },
      'p-complaint-draft': { title: 'Complaint', content: prosecutionData.complaint.draft },
      'p-complaint-final': { title: 'Complaint', content: prosecutionData.complaint.draft },
      'p-cover-sheet-preview': { title: 'Civil Cover Sheet', content: prosecutionData.coverSheet.draft },
      'p-opp-mtd-draft': { title: 'Opposition to MTD', content: prosecutionData.oppositionToMTD.draft },
      'p-opp-mtd-final': { title: 'Opposition to MTD', content: prosecutionData.oppositionToMTD.draft },
      'p-default-motion-preview': { title: 'Motion for Entry of Default', content: prosecutionData.motionForDefault.draft },
      'p-reply-cc-draft': { title: 'Reply to Counterclaim', content: prosecutionData.replyToCounterclaim.draft },
      'p-reply-cc-final': { title: 'Reply to Counterclaim', content: prosecutionData.replyToCounterclaim.draft },
      'p-receive-mtd': { title: "Defendant's Motion to Dismiss", content: prosecutionData.incoming.mtd },
      'p-receive-answer': { title: "Defendant's Answer", content: prosecutionData.incoming.answer },
      'p-receive-counterclaim': { title: "Defendant's Counterclaim", content: prosecutionData.incoming.counterclaim },
      'd-hold-notice-preview': { title: 'Litigation Hold Notice', content: defenseData.holdNotice.draft },
      'd-answer-draft': { title: 'Answer & Affirmative Defenses', content: defenseData.answer.draft },
      'd-answer-final': { title: 'Answer & Affirmative Defenses', content: defenseData.answer.draft },
      'd-cc-draft': { title: 'Counterclaim / Crossclaim', content: defenseData.counterclaim.draft },
      'd-cc-final': { title: 'Counterclaim / Crossclaim', content: defenseData.counterclaim.draft },
      'd-mtd-draft': { title: 'Motion to Dismiss', content: defenseData.mtd.draft },
      'd-mtd-final': { title: 'Motion to Dismiss', content: defenseData.mtd.draft },
      'd-receive-opp': { title: "Plaintiff's Opposition to MTD", content: defenseData.incoming.oppositionToMTD },
      'd-reply-draft': { title: 'Reply in Support of MTD', content: defenseData.replyInSupport.draft },
      'd-reply-final': { title: 'Reply in Support of MTD', content: defenseData.replyInSupport.draft },
    };
    return map[step] ?? null;
  }

  function getSimData(step: string): { logs: typeof prosecutionData.complaint.simulationLogs; label: string } | null {
    const map: Record<string, { logs: typeof prosecutionData.complaint.simulationLogs; label: string }> = {
      'p-complaint-sim': { logs: prosecutionData.complaint.simulationLogs, label: 'Defense' },
      'p-opp-mtd-sim': { logs: prosecutionData.oppositionToMTD.simulationLogs, label: 'Defense' },
      'p-reply-cc-sim': { logs: prosecutionData.replyToCounterclaim.simulationLogs, label: 'Defense' },
      'd-answer-sim': { logs: defenseData.answer.simulationLogs, label: 'Prosecution' },
      'd-mtd-sim': { logs: defenseData.mtd.simulationLogs, label: 'Prosecution' },
      'd-reply-sim': { logs: defenseData.replyInSupport.simulationLogs, label: 'Prosecution' },
      'd-cc-sim': { logs: defenseData.counterclaim.simulationLogs, label: 'Prosecution' },
    };
    return map[step] ?? null;
  }
</script>

<div class="h-full flex flex-col bg-white">
  <!-- ══════════════ Top bar ══════════════ -->
  {#if workflow.step !== 'role-select'}
    <div class="flex items-center justify-between px-10 py-8 border-b border-zinc-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shrink-0">
      <div class="flex items-center gap-4">
        <div class="w-1.5 h-1.5 rounded-full bg-zinc-900"></div>
        <h1 class="text-[11px] font-semibold text-zinc-900 uppercase tracking-[0.2em]">{stepLabel}</h1>
      </div>
      <div class="flex items-center gap-4">
        {#if workflow.stepHistory.length > 0 && !isEnd}
          <button onclick={prevStep} class="text-[11px] font-medium text-zinc-400 hover:text-zinc-900 uppercase tracking-[0.15em] transition-colors px-3 py-1.5">
            Back
          </button>
        {/if}
        {#if showNextButton}
          <button onclick={nextPhase} class="flex items-center gap-2 text-[10px] font-semibold bg-zinc-900 text-white px-5 py-2.5 rounded hover:bg-zinc-800 uppercase tracking-[0.2em] transition-all shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-[1px]">
            Next Phase <ChevronRight class="w-3.5 h-3.5" />
          </button>
        {/if}
      </div>
    </div>
  {/if}

  <!-- ══════════════ Content ══════════════ -->
  <div class="flex-1 overflow-y-auto bg-zinc-50/30" bind:this={scrollContainer}>

    <!-- ═══ ROLE SELECT ═══ -->
    {#if workflow.step === 'role-select'}
      <div class="h-full flex flex-col justify-center">
        <div class="w-full max-w-3xl mx-auto px-6 py-8 space-y-12">
          <div class="text-center space-y-5">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 mb-2 border border-zinc-200 shadow-sm">
              <Scale class="w-5 h-5 text-zinc-800" />
            </div>
            <h2 class="text-3xl font-medium tracking-tight text-zinc-900">Select your role.</h2>
            <p class="text-zinc-500 text-base max-w-xl mx-auto leading-relaxed">
              Choose which side of Doe v. TechCorp you'd like to simulate. SEER will draft documents and run adversarial red team simulations on each substantive filing.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-8">
            <button onclick={() => selectRole('prosecution')} class="group flex flex-col items-start gap-4 p-10 rounded-xl border border-zinc-200 bg-white hover:border-zinc-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 text-left">
              <div class="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-2 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                <Gavel class="w-6 h-6 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              <span class="text-xl font-semibold text-zinc-900">Prosecution</span>
              <span class="text-sm text-zinc-500 leading-relaxed">Represent <strong>John Doe</strong> (Plaintiff). Draft complaint, demand letter, and responsive pleadings. Red team simulates Defense attacks.</span>
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-[11px] font-medium text-zinc-900 uppercase tracking-widest mt-4">
                7 Documents · 3 Phases
              </div>
            </button>
            <button onclick={() => selectRole('defense')} class="group flex flex-col items-start gap-4 p-10 rounded-xl border border-zinc-200 bg-white hover:border-zinc-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 text-left">
              <div class="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-2 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                <ShieldAlert class="w-6 h-6 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              <span class="text-xl font-semibold text-zinc-900">Defense</span>
              <span class="text-sm text-zinc-500 leading-relaxed">Represent <strong>Tech Corp Inc.</strong> (Defendant). Draft answer or motion to dismiss, with optional counterclaim. Red team simulates Prosecution attacks.</span>
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-[11px] font-medium text-zinc-900 uppercase tracking-widest mt-4">
                5 Documents · 2 Paths
              </div>
            </button>
          </div>
        </div>
      </div>

    <!-- ═══ INIT SCREENS ═══ -->
    {:else if workflow.step === 'p-init'}
      <div class="h-full flex flex-col justify-center">
        <div class="w-full max-w-3xl mx-auto px-6 py-8 space-y-10">
          <div class="text-center space-y-5 pb-4">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 mb-2 border border-zinc-200 shadow-sm">
              <Gavel class="w-5 h-5 text-zinc-800" />
            </div>
            <h2 class="text-3xl font-medium tracking-tight text-zinc-900">Build your case from the ground up.</h2>
            <p class="text-zinc-500 text-base max-w-xl mx-auto leading-relaxed">
              SEER will draft all pre-suit and litigation filings. Defense AI will attack each substantive document before it reaches the courtroom.
            </p>
          </div>
          <div class="bg-white border border-zinc-200 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden focus-within:border-zinc-300 focus-within:ring-4 focus-within:ring-zinc-100 transition-all duration-300">
            <div class="p-6">
              <Textarea
                placeholder="Describe your case..."
                class="border-0 shadow-none focus-visible:ring-0 resize-none text-base p-0 min-h-[120px] placeholder:text-zinc-400 text-zinc-800"
                value="John Doe was terminated from Tech Corp Inc. on December 1, 2023 without cause. He is owed a $30,000 earned performance bonus under his employment agreement dated January 15, 2023. Draft all necessary pre-litigation and litigation documents."
              />
            </div>
            <div class="px-6 pb-4 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2 text-sm text-zinc-700">
                  <FileText class="w-4 h-4 text-zinc-400" />
                  <span>Employment_Agreement_Doe_TechCorp.pdf</span>
                </div>
                <button class="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-widest font-medium">
                  <Paperclip class="w-3.5 h-3.5" />
                  Attach
                </button>
              </div>
              <Button onclick={nextPhase} class="bg-black hover:bg-zinc-800 text-white rounded-sm pl-5 pr-4 py-2 gap-2 text-sm font-medium shadow-none">
                Commence <SendHorizonal class="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

    {:else if workflow.step === 'd-init'}
      <div class="h-full flex flex-col justify-center">
        <div class="w-full max-w-3xl mx-auto px-6 py-8 space-y-10">
          <div class="text-center space-y-5 pb-4">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 mb-2 border border-zinc-200 shadow-sm">
              <ShieldAlert class="w-5 h-5 text-zinc-800" />
            </div>
            <h2 class="text-3xl font-medium tracking-tight text-zinc-900">Battle-test your legal strategy.</h2>
            <p class="text-zinc-500 text-base max-w-xl mx-auto leading-relaxed">
              Simulate an entire defense with adversarial AI. SEER drafts, opposing counsel attacks, and your documents emerge impenetrable.
            </p>
          </div>
          <div class="bg-white border border-zinc-200 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden focus-within:border-zinc-300 focus-within:ring-4 focus-within:ring-zinc-100 transition-all duration-300">
            <div class="p-6">
              <Textarea
                placeholder="Describe your case..."
                class="border-0 shadow-none focus-visible:ring-0 resize-none text-base p-0 min-h-[120px] placeholder:text-zinc-400 text-zinc-800"
                value="Please analyze the attached complaint from John Doe. Recommend defense strategy for Tech Corp Inc. and draft the appropriate responsive pleading including affirmative defenses."
              />
            </div>
            <div class="px-6 pb-4 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2 text-sm text-zinc-700">
                  <FileText class="w-4 h-4 text-zinc-400" />
                  <span>Complaint_Doe_v_TechCorp.pdf</span>
                </div>
                <button class="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-widest font-medium">
                  <Paperclip class="w-3.5 h-3.5" />
                  Attach
                </button>
              </div>
              <Button onclick={nextPhase} class="bg-black hover:bg-zinc-800 text-white rounded-sm pl-5 pr-4 py-2 gap-2 text-sm font-medium shadow-none">
                Commence <SendHorizonal class="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

    <!-- ═══ ANALYSIS STEPS ═══ -->
    {:else if getAnalysisSteps(workflow.step)}
      {@const steps = getAnalysisSteps(workflow.step)!}
      <AnalysisTimeline {steps} currentStep={workflow.substep} />

      <!-- Show ground results after defect scan completes -->
      {#if workflow.step === 'd-defect-scan' && workflow.substep >= steps.length - 1}
        <div class="max-w-2xl mx-auto pb-16">
          <div class="pb-8 text-center">
            <p class="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.2em]">Rule 12(b) Ground Analysis</p>
          </div>
          <div class="space-y-4">
            {#each defenseData.mtd.grounds as ground}
              <div class="p-6 rounded-xl border border-zinc-200 bg-white flex items-center justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
                <div class="flex-1 pr-8">
                  <div class="text-sm font-semibold text-zinc-900">{ground.rule}: {ground.name}</div>
                  <div class="text-sm text-zinc-500 mt-1.5 leading-relaxed">{ground.rationale}</div>
                </div>
                <div class="text-right shrink-0">
                  <div class="text-2xl font-bold {ground.viability >= 50 ? 'text-zinc-900' : 'text-zinc-300'}">{ground.viability}%</div>
                  <div class="text-[10px] uppercase tracking-widest text-zinc-400 mt-0.5">viability</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Show case law after research completes -->
      {#if workflow.step === 'd-case-law' && workflow.substep >= steps.length - 1}
        <div class="max-w-2xl mx-auto pb-16">
          <div class="pb-8 text-center">
            <p class="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.2em]">Supporting Case Law</p>
          </div>
          <div class="space-y-4">
            {#each defenseData.mtd.caseLaw as caseItem}
              <div class="p-6 rounded-xl border border-zinc-200 bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
                <div class="flex items-center justify-between mb-2">
                  <div class="text-sm font-semibold text-zinc-900 italic">{caseItem.name}</div>
                  <div class="text-lg font-bold text-zinc-900">{caseItem.relevance}%</div>
                </div>
                <div class="text-[11px] font-mono text-zinc-400 mb-3">{caseItem.citation}</div>
                <div class="text-sm text-zinc-500 leading-relaxed">{caseItem.summary}</div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

    <!-- ═══ GROUND SELECTION (MTD) ═══ -->
    {:else if workflow.step === 'd-ground-select'}
      <div class="max-w-2xl mx-auto py-16 space-y-6">
        <div class="text-center pb-6">
          <p class="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.2em] mb-2">Select Grounds to Argue</p>
          <p class="text-sm text-zinc-500">Choose which Rule 12(b) grounds to include in the Motion to Dismiss.</p>
        </div>
        {#each defenseData.mtd.grounds as ground}
          <button onclick={() => toggleGround(ground.rule)} class="w-full p-6 rounded-xl border {workflow.selectedGrounds.includes(ground.rule) ? 'border-zinc-900 bg-zinc-50 shadow-sm' : 'border-zinc-200 bg-white hover:border-zinc-400'} flex items-center justify-between text-left transition-all duration-200">
            <div class="flex-1 pr-8">
              <div class="text-sm font-semibold text-zinc-900">{ground.rule}: {ground.name}</div>
              <div class="text-sm text-zinc-500 mt-1">{ground.rationale}</div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-lg font-bold {ground.viability >= 50 ? 'text-zinc-900' : 'text-zinc-300'}">{ground.viability}%</span>
              <div class="w-5 h-5 rounded-sm border-2 {workflow.selectedGrounds.includes(ground.rule) ? 'bg-zinc-900 border-zinc-900' : 'border-zinc-300'} flex items-center justify-center transition-colors">
                {#if workflow.selectedGrounds.includes(ground.rule)}
                  <Check class="w-3 h-3 text-white" />
                {/if}
              </div>
            </div>
          </button>
        {/each}
        <div class="pt-6 flex justify-end">
          <button onclick={nextPhase} class="flex items-center gap-2 text-[10px] font-semibold bg-zinc-900 text-white px-5 py-2.5 rounded hover:bg-zinc-800 uppercase tracking-[0.2em] transition-all shadow-[0_4px_14px_0_rgb(0,0,0,0.1)]">
            Continue with {workflow.selectedGrounds.length} ground{workflow.selectedGrounds.length !== 1 ? 's' : ''} <ChevronRight class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    <!-- ═══ FACT REVIEW (Answer path) ═══ -->
    {:else if workflow.step === 'd-fact-review'}
      <FactReview
        processSteps={defenseData.answer.factProcessSteps}
        facts={defenseData.answer.facts}
        currentStep={workflow.substep}
      />

    <!-- ═══ DOCUMENT PREVIEWS ═══ -->
    {:else if getDocData(workflow.step)}
      {@const doc = getDocData(workflow.step)!}
      {@const isFinal = workflow.step.endsWith('-final')}
      {@const isIncoming = workflow.step.includes('receive')}
      <DocumentPreview
        title={doc.title}
        content={doc.content}
        showExport={isFinal}
        {isIncoming}
        statusLabel={isFinal ? 'Final Draft' : isIncoming ? 'Received' : 'Draft'}
      />

    <!-- ═══ RED TEAM SIMULATION ═══ -->
    {:else if getSimData(workflow.step)}
      {@const sim = getSimData(workflow.step)!}
      <RedTeamSimulation
        logs={sim.logs}
        currentStep={workflow.substep}
        opponentLabel={sim.label}
      />

    <!-- ═══ DECISIONS ═══ -->
    {:else if workflow.step === 'p-demand-decision'}
      <DecisionCard
        title="Response to Demand Letter"
        options={[
          { id: 'settlement', title: 'Settlement Reached', description: 'Defendant agreed to settle. Draft settlement agreement and close the matter.', iconType: 'scale', tag: 'Case Closes' },
          { id: 'denied', title: 'Denied / Ignored', description: 'Defendant refused to pay or did not respond within 30 days. Proceed to file the Complaint.', iconType: 'gavel', tag: 'Proceed to Phase 1', recommended: true },
        ]}
        onselect={handleDecision}
      />

    {:else if workflow.step === 'p-defense-response'}
      <DecisionCard
        title="What Did the Defense Do?"
        options={[
          { id: 'nothing', title: 'Did Nothing', description: 'Defendant missed the 21-day response deadline. Proceed with default judgment.', iconType: 'clock', tag: 'Default Path' },
          { id: 'mtd', title: 'Filed Motion to Dismiss', description: 'Defendant filed a Rule 12(b) Motion to Dismiss. Draft your Opposition.', iconType: 'alert', tag: 'MTD Path' },
          { id: 'answer', title: 'Filed Answer', description: 'Defendant filed an Answer with Affirmative Defenses. Review and proceed.', iconType: 'file', tag: 'Answer Path' },
        ]}
        onselect={handleDecision}
      />

    {:else if workflow.step === 'p-cc-check'}
      <DecisionCard
        title="Did Defense File a Counterclaim?"
        options={[
          { id: 'no', title: 'No Counterclaim', description: 'Defendant did not file a counterclaim. Pleadings are closed — ready for discovery.', iconType: 'scale', tag: 'Pleadings Closed' },
          { id: 'yes', title: 'Counterclaim Filed', description: 'Defendant filed a counterclaim against the Plaintiff. Draft a Reply to Counterclaim.', iconType: 'alert', tag: 'Must Respond', recommended: true },
        ]}
        onselect={handleDecision}
      />

    {:else if workflow.step === 'd-strategy'}
      <DecisionCard
        title="Identified Strategies"
        options={[
          { id: 'answer', title: 'Draft Answer', description: 'Respond to each allegation with admissions, denials, and affirmative defenses.', iconType: 'file', tag: 'Recommended (65%)', recommended: true },
          { id: 'mtd', title: 'Draft Motion to Dismiss', description: 'Move to dismiss on grounds of failure to state a claim under Rule 12(b)(6).', iconType: 'shield', tag: 'Alternative' },
        ]}
        onselect={handleDecision}
      />

    {:else if workflow.step === 'd-cc-decision'}
      <DecisionCard
        title="File a Counterclaim?"
        options={[
          { id: 'no', title: 'No Counterclaim', description: 'Proceed without a counterclaim. Pleadings close and the case moves to discovery.', iconType: 'scale', tag: 'Pleadings Closed' },
          { id: 'yes', title: 'File Counterclaim', description: 'Assert claims against Plaintiff for breach of confidentiality and training cost reimbursement.', iconType: 'gavel', tag: 'Recommended', recommended: true },
        ]}
        onselect={handleDecision}
      />

    <!-- ═══ CONFIRMATION / STATUS SCREENS ═══ -->
    {:else if workflow.step === 'p-file-serve'}
      <div class="h-full flex flex-col justify-center">
        <div class="max-w-lg mx-auto text-center space-y-8 py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200">
            <SendHorizonal class="w-7 h-7 text-zinc-700" />
          </div>
          <h2 class="text-2xl font-medium tracking-tight text-zinc-900">Filed & Served</h2>
          <div class="space-y-3 text-sm text-zinc-500">
            <p>Complaint filed with the Northern District of California.</p>
            <p>Summons issued by the Clerk.</p>
            <p>Service of process completed on Defendant's registered agent.</p>
          </div>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 text-[11px] font-medium text-zinc-900 uppercase tracking-widest">
            <CheckCircle2 class="w-3.5 h-3.5" /> All filings complete
          </div>
        </div>
      </div>

    {:else if workflow.step === 'p-wait-response'}
      <div class="h-full flex flex-col justify-center">
        <div class="max-w-lg mx-auto text-center space-y-8 py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200">
            <Clock class="w-7 h-7 text-zinc-700" />
          </div>
          <h2 class="text-2xl font-medium tracking-tight text-zinc-900">Response Deadline Clock</h2>
          <p class="text-zinc-500 text-base">Defendant has <strong>21 days</strong> from service to respond to the Complaint under FRCP 12(a)(1)(A)(i).</p>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-[11px] font-medium text-zinc-500 uppercase tracking-widest">
            <Loader2 class="w-3.5 h-3.5 animate-spin" /> Awaiting response...
          </div>
        </div>
      </div>

    <!-- ═══ END SCREENS ═══ -->
    {:else if workflow.step === 'p-settlement-end'}
      <div class="h-full flex flex-col justify-center">
        <div class="max-w-lg mx-auto text-center space-y-8 py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <CheckCircle2 class="w-8 h-8 text-white" />
          </div>
          <h2 class="text-3xl font-medium tracking-tight text-zinc-900">Case Closed — Settlement</h2>
          <p class="text-zinc-500 text-base max-w-md mx-auto">Defendant agreed to settle. The matter is resolved without the need for further litigation.</p>
        </div>
      </div>

    {:else if workflow.step === 'p-default-end'}
      <div class="h-full flex flex-col justify-center">
        <div class="max-w-lg mx-auto text-center space-y-8 py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <CheckCircle2 class="w-8 h-8 text-white" />
          </div>
          <h2 class="text-3xl font-medium tracking-tight text-zinc-900">Case Closed — Default Judgment</h2>
          <p class="text-zinc-500 text-base max-w-md mx-auto">Defendant failed to respond. Default has been entered and judgment granted in Plaintiff's favor.</p>
        </div>
      </div>

    {:else if workflow.step === 'p-hearing-end'}
      <div class="h-full flex flex-col justify-center">
        <div class="max-w-lg mx-auto text-center space-y-8 py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200">
            <Scale class="w-7 h-7 text-zinc-700" />
          </div>
          <h2 class="text-2xl font-medium tracking-tight text-zinc-900">Awaiting Hearing & Ruling</h2>
          <p class="text-zinc-500 text-base max-w-md mx-auto">Opposition to MTD has been filed. The Court will schedule a hearing on Defendant's Motion to Dismiss.</p>
          <div class="text-sm text-zinc-400">Possible outcomes: Motion Granted (case dismissed) or Motion Denied (Defendant must file Answer).</div>
        </div>
      </div>

    {:else if workflow.step === 'p-pleadings-closed' || workflow.step === 'd-pleadings-closed'}
      <div class="h-full flex flex-col justify-center">
        <div class="max-w-lg mx-auto text-center space-y-8 py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <CheckCircle2 class="w-8 h-8 text-white" />
          </div>
          <h2 class="text-3xl font-medium tracking-tight text-zinc-900">Pleadings Closed</h2>
          <p class="text-zinc-500 text-base max-w-md mx-auto">All pleadings have been filed and served. The case is now ready for the discovery phase.</p>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 text-[11px] font-medium text-zinc-900 uppercase tracking-widest">
            {workflow.completedDocs.length} documents generated
          </div>
        </div>
      </div>

    {:else if workflow.step === 'd-hearing-prep'}
      <div class="h-full flex flex-col justify-center">
        <div class="max-w-lg mx-auto text-center space-y-8 py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <CheckCircle2 class="w-8 h-8 text-white" />
          </div>
          <h2 class="text-3xl font-medium tracking-tight text-zinc-900">Ready for Hearing</h2>
          <p class="text-zinc-500 text-base max-w-md mx-auto">
            Motion to Dismiss and Reply in Support have been filed and fortified through adversarial simulation. All documents are ready for the hearing.
          </p>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 text-[11px] font-medium text-zinc-900 uppercase tracking-widest">
            {workflow.completedDocs.length} documents generated
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
