<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Textarea } from "$lib/components/ui/textarea";
  import {
    UploadCloud, FileText, ChevronRight, Loader2, CheckCircle2, Cpu,
    ShieldAlert, Swords, Search, Globe, Library, Download, Paperclip,
    SendHorizonal, Sparkles, ArrowRight, Zap, Scale
  } from "lucide-svelte";
  import { mockData } from "$lib/data/mockData";
  import { tick } from "svelte";

  let currentState = $state(1);
  let selectedDraftType = $state<'answer' | 'mtd'>('answer');

  // State 2: analysis logs then path cards
  let analysisStep = $state(0);
  const totalAnalysisSteps = mockData.analysisSteps.length;

  // State 3: process steps + facts
  let factStep = $state(0);
  const totalFactSteps = mockData.factProcessSteps.length + mockData.facts.length;

  // State 4: simulation steps
  let simStep = $state(0);

  let scrollContainer: HTMLDivElement | undefined = $state();

  async function scrollToBottom() {
    await tick();
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
    }
  }

  function nextState() {
    if (currentState === 2) {
      if (analysisStep < totalAnalysisSteps - 1) {
        analysisStep++;
        scrollToBottom();
      } else {
        // analysis logs done, but cards are now visible — next click advances state
        currentState++;
      }
    } else if (currentState === 3) {
      if (factStep < totalFactSteps - 1) {
        factStep++;
        scrollToBottom();
      } else {
        currentState++;
      }
    } else if (currentState === 4) {
      if (simStep < mockData.simulationLogs.length - 1) {
        simStep++;
        scrollToBottom();
      } else {
        currentState++;
      }
    } else if (currentState < 5) {
      currentState++;
    }
  }

  function selectPath(type: 'answer' | 'mtd') {
    selectedDraftType = type;
    currentState = 3;
  }

  function prevState() {
    if (currentState > 1) currentState--;
  }

  function actorStyle(actor: string) {
    if (actor === 'opponent') return { dot: 'bg-red-500', bg: 'bg-red-50 border-red-200', title: 'text-red-900', desc: 'text-red-700' };
    if (actor === 'agent') return { dot: 'bg-emerald-500', bg: 'bg-emerald-50 border-emerald-200', title: 'text-emerald-900', desc: 'text-emerald-700' };
    return { dot: 'bg-slate-400', bg: 'bg-slate-50 border-slate-200', title: 'text-slate-900', desc: 'text-slate-600' };
  }
</script>

<div class="h-full flex flex-col">
  <!-- Top bar -->
  <div class="flex items-center justify-between mb-4 shrink-0">
    <h1 class="text-xl font-semibold tracking-tight">
      {#if currentState === 1}Start New LAW SUIT
      {:else if currentState === 2}Analyzing Documents
      {:else if currentState === 3}Fact Review
      {:else if currentState === 4}Agent Simulation
      {:else}Final Draft Ready
      {/if}
    </h1>
    <div class="flex items-center gap-2">
      {#if currentState > 1}
        <Button variant="outline" size="sm" onclick={prevState}>Back</Button>
      {/if}
      {#if currentState < 5}
        <Button size="sm" onclick={nextState} class="bg-[#0f172a] hover:bg-[#1e293b] text-white">
          Next Step <ChevronRight class="w-4 h-4 ml-1" />
        </Button>
      {/if}
    </div>
  </div>

  <!-- Canvas -->
  <div class="flex-1 overflow-y-auto" bind:this={scrollContainer}>

    <!-- ========== STATE 1 ========== -->
    {#if currentState === 1}
      <div class="h-full flex flex-col justify-between">
        <!-- Hero -->
        <div class="flex-1 flex flex-col items-center justify-center px-6 py-8">
          <div class="w-full max-w-4xl space-y-6">
            <!-- Tagline -->
            <div class="text-center space-y-3 mb-4">
              <div class="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-1.5 text-xs font-medium text-primary mx-auto">
                <Zap class="w-3.5 h-3.5" />
                Draft &rarr; Attack &rarr; Fortify
              </div>
              <h2 class="text-4xl font-bold tracking-tight leading-tight">
                Battle-test your legal strategy<br/>before the courtroom does.
              </h2>
              <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
                Simulate an entire lawsuit with adversarial AI. SEER drafts, opposing counsel attacks, and your document comes out stronger.
              </p>
            </div>

            <!-- Input box -->
            <div class="bg-background border rounded-2xl shadow-lg overflow-hidden">
              <div class="p-6">
                <Textarea
                  placeholder="Describe your case and what SEER should do..."
                  class="border-0 shadow-none focus-visible:ring-0 resize-none text-base p-0 min-h-[140px] placeholder:text-muted-foreground/50"
                  value="Please analyze the attached complaint from John Doe. Draft an Answer on behalf of Tech Corp Inc. Include appropriate affirmative defenses based on the employment agreement."
                />
              </div>

              <div class="px-6 pb-5 flex items-center justify-between border-t pt-4">
                <div class="flex items-center gap-3 flex-wrap">
                  <div class="flex items-center gap-2 bg-slate-100 rounded-full pl-2.5 pr-3 py-1.5 text-sm">
                    <FileText class="w-4 h-4 text-blue-600" />
                    <span class="font-medium text-foreground">Complaint_Doe_v_TechCorp.pdf</span>
                    <CheckCircle2 class="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <button class="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Paperclip class="w-4 h-4" />
                    Attach more
                  </button>
                </div>

                <Button onclick={nextState} class="bg-[#0f172a] hover:bg-[#1e293b] rounded-full pl-6 pr-5 py-2.5 gap-2 text-base">
                  Start Agent
                  <SendHorizonal class="w-4 h-4" />
                </Button>
              </div>
            </div>

            <!-- Tools & capabilities -->
            <div class="flex items-center justify-center gap-4 flex-wrap pt-2">
              <div class="flex items-center gap-2 bg-background border rounded-full px-4 py-2 text-sm shadow-sm">
                <Library class="w-4 h-4 text-indigo-500" />
                <span>Search corpus</span>
              </div>
              <div class="flex items-center gap-2 bg-background border rounded-full px-4 py-2 text-sm shadow-sm">
                <Globe class="w-4 h-4 text-blue-500" />
                <span>Google Search</span>
              </div>
              <div class="flex items-center gap-2 bg-background border rounded-full px-4 py-2 text-sm shadow-sm">
                <Search class="w-4 h-4 text-amber-600" />
                <span>Case movements</span>
              </div>
              <div class="flex items-center gap-2 bg-background border rounded-full px-4 py-2 text-sm shadow-sm">
                <Scale class="w-4 h-4 text-red-500" />
                <span>Adversarial simulation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- ========== STATE 2: Analysis logs then path cards ========== -->
    {#if currentState === 2}
      <div class="max-w-3xl mx-auto space-y-3 py-4">
        <!-- Analysis process steps -->
        {#each mockData.analysisSteps as step, i}
          {#if i <= analysisStep}
            <div class="flex items-center gap-3 py-2.5 px-4 rounded-lg bg-slate-50 border border-slate-200 text-sm">
              {#if i < analysisStep || analysisStep >= totalAnalysisSteps - 1}
                <CheckCircle2 class="w-4 h-4 text-emerald-500 shrink-0" />
              {:else}
                <Loader2 class="w-4 h-4 text-primary animate-spin shrink-0" />
              {/if}
              <span class="text-slate-700">{step.text}</span>
            </div>
          {/if}
        {/each}

        <!-- Processing indicator (while logs still revealing) -->
        {#if analysisStep < totalAnalysisSteps - 1}
          <div class="flex items-center gap-3 py-3 px-4 text-sm text-muted-foreground">
            <Loader2 class="w-4 h-4 animate-spin" />
            <span>Analyzing...</span>
          </div>
        {/if}

        <!-- Path selection cards (only after all logs are done) -->
        {#if analysisStep >= totalAnalysisSteps - 1}
          <div class="pt-6 pb-2 text-center">
            <p class="text-muted-foreground text-sm">
              SEER identified two viable strategies. Select a path to proceed:
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button onclick={() => selectPath('answer')} class="group flex flex-col items-start gap-3 p-6 rounded-xl border-2 border-transparent bg-background shadow-sm hover:border-emerald-500 hover:shadow-md transition-all text-left">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <FileText class="w-5 h-5 text-emerald-700" />
                </div>
                <span class="text-lg font-semibold">Draft Answer</span>
              </div>
              <span class="text-sm text-muted-foreground leading-relaxed">Respond to each allegation with admissions, denials, and affirmative defenses.</span>
              <div class="flex items-center gap-1.5 text-sm text-emerald-600 font-medium mt-auto">
                <Sparkles class="w-4 h-4" />
                Recommended (65%)
              </div>
            </button>

            <button onclick={() => selectPath('mtd')} class="group flex flex-col items-start gap-3 p-6 rounded-xl border-2 border-transparent bg-background shadow-sm hover:border-blue-500 hover:shadow-md transition-all text-left">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <FileText class="w-5 h-5 text-blue-700" />
                </div>
                <span class="text-lg font-semibold">Draft MTD</span>
              </div>
              <span class="text-sm text-muted-foreground leading-relaxed">Move to dismiss on grounds of failure to state a claim under Rule 12(b)(6).</span>
              <div class="flex items-center gap-1.5 text-sm text-blue-600 font-medium mt-auto">
                <ArrowRight class="w-4 h-4" />
                Motion to Dismiss
              </div>
            </button>
          </div>
        {/if}
      </div>
    {/if}

    <!-- ========== STATE 3: Fact Review ========== -->
    {#if currentState === 3}
      <div class="max-w-3xl mx-auto space-y-3 py-4">
        {#each mockData.factProcessSteps as step, i}
          {#if i <= factStep}
            <div class="flex items-center gap-3 py-2.5 px-4 rounded-lg bg-slate-50 border border-slate-200 text-sm">
              {#if i < factStep || factStep >= mockData.factProcessSteps.length}
                <CheckCircle2 class="w-4 h-4 text-emerald-500 shrink-0" />
              {:else}
                <Loader2 class="w-4 h-4 text-primary animate-spin shrink-0" />
              {/if}
              <span class="text-slate-700">{step.text}</span>
            </div>
          {/if}
        {/each}

        {#if factStep >= mockData.factProcessSteps.length}
          <div class="pt-5 pb-2">
            <h3 class="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Extracted Facts &mdash; Review each</h3>
          </div>
          {#each mockData.facts as fact, i}
            {#if i <= factStep - mockData.factProcessSteps.length}
              {@const isLatest = i === factStep - mockData.factProcessSteps.length && factStep < totalFactSteps - 1}
              <div class="flex items-start justify-between gap-4 p-4 rounded-xl border bg-background {isLatest ? 'ring-2 ring-primary/30 border-primary/40' : ''}">
                <div class="flex items-start gap-3 flex-1">
                  <span class="text-xs font-mono bg-muted rounded-md px-2 py-1 text-muted-foreground shrink-0 mt-0.5">F{fact.id}</span>
                  <p class="text-sm font-medium leading-relaxed">{fact.text}</p>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <button class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors {fact.status === 'admit' ? 'bg-[#0f172a] text-white' : 'bg-muted hover:bg-muted/80 text-foreground'}">
                    Admit
                  </button>
                  <button class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors {fact.status === 'deny' ? 'bg-red-600 text-white' : 'bg-muted hover:bg-muted/80 text-foreground'}">
                    Deny
                  </button>
                  <button class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground transition-colors">
                    Substitute
                  </button>
                </div>
              </div>
            {/if}
          {/each}
        {/if}

        {#if factStep < totalFactSteps - 1}
          <div class="flex items-center gap-3 py-3 px-4 text-sm text-muted-foreground">
            <Loader2 class="w-4 h-4 animate-spin" />
            <span>Processing...</span>
          </div>
        {/if}
      </div>
    {/if}

    <!-- ========== STATE 4: Simulation Stepper ========== -->
    {#if currentState === 4}
      <div class="max-w-3xl mx-auto py-4">
        {#each mockData.simulationLogs as log, i}
          {#if i <= simStep}
            {@const style = actorStyle(log.actor)}
            <div class="flex items-stretch gap-4 relative">
              <div class="flex flex-col items-center w-10 shrink-0">
                <div class="w-10 h-10 rounded-full {style.dot} flex items-center justify-center text-white shadow-sm shrink-0">
                  {#if log.icon === 'cpu'}
                    <Cpu class="w-4 h-4" />
                  {:else if log.icon === 'file'}
                    <FileText class="w-4 h-4" />
                  {:else if log.icon === 'swords'}
                    <Swords class="w-4 h-4" />
                  {:else if log.icon === 'shield'}
                    <ShieldAlert class="w-4 h-4" />
                  {:else}
                    <CheckCircle2 class="w-4 h-4" />
                  {/if}
                </div>
                {#if i < simStep || (i === simStep && simStep < mockData.simulationLogs.length - 1)}
                  <div class="w-0.5 flex-1 {style.dot} opacity-30"></div>
                {/if}
              </div>

              <div class="flex-1 pb-6">
                <div class="rounded-xl border p-4 {style.bg}">
                  <div class="flex items-center justify-between mb-1">
                    <h4 class="font-semibold text-sm {style.title}">{log.title}</h4>
                    <span class="text-[11px] font-mono text-muted-foreground bg-white/60 rounded px-1.5 py-0.5">Step {log.step}</span>
                  </div>
                  <p class="text-sm {style.desc}">{log.description}</p>
                </div>
              </div>
            </div>
          {/if}
        {/each}

        {#if simStep < mockData.simulationLogs.length - 1}
          <div class="flex items-stretch gap-4">
            <div class="flex flex-col items-center w-10 shrink-0">
              <div class="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <Loader2 class="w-4 h-4 animate-spin" />
              </div>
            </div>
            <div class="flex-1 pb-6">
              <div class="rounded-xl border border-dashed p-4 bg-muted/20">
                <span class="text-sm text-muted-foreground">Processing next step...</span>
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/if}

    <!-- ========== STATE 5: Final Draft ========== -->
    {#if currentState === 5}
      <div class="max-w-4xl mx-auto space-y-6 py-4">
        <div class="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
          <CheckCircle2 class="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <h3 class="font-semibold text-emerald-900">Simulation Complete</h3>
            <p class="text-sm text-emerald-700">Your {selectedDraftType === 'answer' ? 'Answer to Complaint' : 'Motion to Dismiss'} is ready for review.</p>
          </div>
        </div>

        <div class="bg-white border rounded-xl shadow-sm overflow-hidden">
          <div class="py-3 px-5 border-b bg-slate-50 flex items-center justify-between">
            <span class="font-semibold text-sm">{selectedDraftType === 'answer' ? 'Answer to Complaint' : 'Motion to Dismiss'} &mdash; Final Draft</span>
            <div class="flex items-center gap-2">
              <span class="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-medium">Ready</span>
              <Button variant="outline" size="sm" class="gap-1.5 text-xs">
                <Download class="w-3.5 h-3.5" />
                Export DOCX
              </Button>
            </div>
          </div>
          <div class="p-8 max-h-[60vh] overflow-y-auto">
            <div class="text-sm font-serif whitespace-pre-wrap text-foreground/80 leading-relaxed">
              {selectedDraftType === 'answer' ? mockData.answerDraft : mockData.mtdDraft}
            </div>
          </div>
        </div>

        <Button variant="outline" class="w-full gap-2 py-3">
          <FileText class="w-4 h-4" />
          Open editable canvas
        </Button>
      </div>
    {/if}
  </div>
</div>
