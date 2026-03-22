<script lang="ts">
  import {
    CheckCircle2, Cpu, FileText, Swords, ShieldAlert,
    Search, Brain, Users, ScanLine, Scale, ChevronDown, Wrench, Database
  } from 'lucide-svelte';
  import ProcessingIndicator from './ProcessingIndicator.svelte';
  import type { SimulationLog, AgentRole } from '$lib/data/mockData';
  import { agentRoster } from '$lib/data/mockData';

  let { logs, currentStep, opponentLabel = 'Opposing Counsel' }: {
    logs: SimulationLog[]; currentStep: number; opponentLabel?: string;
  } = $props();

  let isComplete = $derived(currentStep >= logs.length - 1);
  let expandedSteps = $state(new Set<number>());

  function toggleExpand(step: number) {
    const next = new Set(expandedSteps);
    if (next.has(step)) next.delete(step);
    else next.add(step);
    expandedSteps = next;
  }

  let activeAgents = $derived(() => {
    const agents = new Set<string>();
    for (let i = 0; i <= Math.min(currentStep, logs.length - 1); i++) {
      const log = logs[i];
      if (log.agent) agents.add(`${log.team}-${log.agent}`);
    }
    return agents;
  });

  function teamStyle(team: string) {
    if (team === 'red') return {
      dot: 'bg-rival text-white',
      bg: 'bg-rival-light/60 border-rival-muted/40',
      title: 'text-rival-deep',
      desc: 'text-rival-deep/60',
      label: 'bg-rival-light text-rival-deep',
      agentBg: 'bg-rival-light text-rival-deep',
      toolBg: 'bg-white/60 text-rival-deep/80 border-rival-muted/30',
      detailBg: 'bg-rival-light/50 border-rival-muted/30',
    };
    if (team === 'blue') return {
      dot: 'bg-ally text-white',
      bg: 'bg-ally-light/60 border-ally-muted/40',
      title: 'text-ally-deep',
      desc: 'text-ally-deep/60',
      label: 'bg-ally-light text-ally-deep',
      agentBg: 'bg-ally-light text-ally-deep',
      toolBg: 'bg-white/60 text-ally-deep/80 border-ally-muted/30',
      detailBg: 'bg-ally-light/50 border-ally-muted/30',
    };
    return {
      dot: 'bg-cream-deep text-ink-muted',
      bg: 'bg-white/80 border-ink-ghost/40',
      title: 'text-ink',
      desc: 'text-ink-muted',
      label: 'bg-cream-deep text-ink-faint',
      agentBg: 'bg-cream-deep text-ink-muted',
      toolBg: 'bg-cream-deep/80 text-ink-faint border-ink-ghost/40',
      detailBg: 'bg-cream-deep/40 border-ink-ghost/30',
    };
  }

  function teamLabel(team: string): string {
    if (team === 'red') return opponentLabel;
    if (team === 'blue') return 'Your Team';
    return 'System';
  }

  function agentIcon(agent: AgentRole | undefined) {
    switch (agent) {
      case 'extraction': return ScanLine;
      case 'lead-counsel': return Brain;
      case 'discovery': return Users;
      case 'research': return Search;
      case 'adversarial': return Swords;
      default: return Cpu;
    }
  }

  function logIcon(icon: string) {
    switch (icon) {
      case 'cpu': return Cpu;
      case 'file': return FileText;
      case 'swords': return Swords;
      case 'shield': return ShieldAlert;
      case 'search': return Search;
      case 'brain': return Brain;
      case 'users': return Users;
      case 'scan': return ScanLine;
      case 'scale': return Scale;
      default: return CheckCircle2;
    }
  }
</script>

<div class="max-w-3xl mx-auto py-8">
  <!-- Team Roster Header -->
  <div class="mb-10 grid grid-cols-2 gap-4">
    {#each [
      { key: 'blue', label: 'Your Team', isAlly: true },
      { key: 'red', label: opponentLabel, isAlly: false },
    ] as teamInfo}
      <div class="rounded-xl border {teamInfo.isAlly ? 'border-ally-muted/50 bg-ally-light/40' : 'border-rival-muted/50 bg-rival-light/40'} p-4">
        <div class="flex items-center gap-2.5 mb-3">
          <div class="w-2 h-2 rounded-full {teamInfo.isAlly ? 'bg-ally' : 'bg-rival'}"></div>
          <span class="text-[11px] font-semibold uppercase tracking-[0.15em] {teamInfo.isAlly ? 'text-ally-deep' : 'text-rival-deep'}">{teamInfo.label}</span>
        </div>
        <div class="flex flex-wrap gap-1.5">
          {#each agentRoster as agent}
            {@const isActive = activeAgents().has(`${teamInfo.key}-${agent.role}`)}
            {@const AgentIconComp = agentIcon(agent.role)}
            <div
              class="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-medium transition-all duration-300 {
                isActive
                  ? (teamInfo.isAlly ? 'bg-ally-light text-ally-deep' : 'bg-rival-light text-rival-deep')
                  : 'bg-white/60 text-ink-faint'
              }"
              title={agent.description}
            >
              <AgentIconComp class="w-3 h-3" />
              {agent.label}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <!-- Timeline -->
  <div class="relative">
    {#each logs as log, i}
      {#if i <= currentStep}
        {@const style = teamStyle(log.team)}
        {@const IconComp = logIcon(log.icon)}
        {@const hasExpandable = (log.tools && log.tools.length > 0) || log.detail}
        {@const isExpanded = expandedSteps.has(i)}
        {@const showConnector = i < currentStep || (i === currentStep && !isComplete)}

        <div class="flex gap-5 relative z-10">
          <div class="flex flex-col items-center shrink-0 w-10">
            <div class="w-10 h-10 rounded-full {style.dot} flex items-center justify-center shrink-0 shadow-[0_0_0_3px_#fdf6f0] z-10">
              <IconComp class="w-4 h-4" />
            </div>
            {#if showConnector}
              <div class="w-[1.5px] flex-1 min-h-6 {i < currentStep ? 'bg-terra' : 'bg-ink-ghost/40'}"></div>
            {/if}
          </div>
          <div class="flex-1 min-w-0 {showConnector ? 'pb-6' : ''}">
            <div class="{style.bg} border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <div class="p-5">
                <div class="flex items-center gap-2 mb-2.5">
                  {#if log.agent && log.agentLabel}
                    {@const AgentBadgeIcon = agentIcon(log.agent)}
                    <span class="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-md {style.agentBg}">
                      <AgentBadgeIcon class="w-3 h-3" />
                      {log.agentLabel}
                    </span>
                  {/if}
                  <span class="text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full {style.label}">{teamLabel(log.team)}</span>
                </div>

                <h4 class="font-semibold text-[14px] {style.title} mb-1.5">{log.title}</h4>
                <p class="text-[13px] {style.desc} leading-relaxed">{log.description}</p>

                {#if log.tools && log.tools.length > 0}
                  <div class="flex flex-wrap items-center gap-1.5 mt-3">
                    <Wrench class="w-3 h-3 text-ink-faint" />
                    {#each log.tools as tc}
                      <span class="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded border {style.toolBg}">
                        {tc.tool}
                        {#if tc.source}
                          <Database class="w-2.5 h-2.5 opacity-60" />
                          <span class="opacity-70">{tc.source}</span>
                        {/if}
                      </span>
                    {/each}
                  </div>
                {/if}

                {#if hasExpandable}
                  <button
                    onclick={() => toggleExpand(i)}
                    class="mt-3 flex items-center gap-1 text-[11px] font-medium text-ink-faint hover:text-ink-muted transition-colors"
                  >
                    <ChevronDown class="w-3 h-3 transition-transform duration-200 {isExpanded ? 'rotate-180' : ''}" />
                    {isExpanded ? 'Hide' : 'Show'} details
                  </button>
                {/if}
              </div>

              {#if hasExpandable && isExpanded}
                <div class="px-5 pb-5 pt-0">
                  <div class="border-t {style.detailBg} border rounded-lg p-3.5 space-y-3">
                    {#if log.tools}
                      {#each log.tools as tc}
                        <div class="space-y-1">
                          <div class="text-[11px] font-mono font-semibold text-ink-muted">{tc.tool}</div>
                          {#if tc.input}
                            <div class="flex gap-2 text-[11px]">
                              <span class="text-ink-faint font-medium shrink-0 w-12">input</span>
                              <span class="font-mono text-ink-muted">{tc.input}</span>
                            </div>
                          {/if}
                          {#if tc.source}
                            <div class="flex gap-2 text-[11px]">
                              <span class="text-ink-faint font-medium shrink-0 w-12">source</span>
                              <span class="font-mono text-ink-muted">{tc.source}</span>
                            </div>
                          {/if}
                          {#if tc.output}
                            <div class="flex gap-2 text-[11px]">
                              <span class="text-ink-faint font-medium shrink-0 w-12">output</span>
                              <span class="font-mono text-ink-muted leading-relaxed">{tc.output}</span>
                            </div>
                          {/if}
                        </div>
                      {/each}
                    {/if}
                    {#if log.detail}
                      <div class="text-[12px] text-ink-muted leading-relaxed italic {log.tools && log.tools.length > 0 ? 'pt-2 border-t border-ink-ghost/20' : ''}">{log.detail}</div>
                    {/if}
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/if}
    {/each}

    {#if !isComplete}
      <div class="flex gap-5 relative z-10">
        <div class="flex flex-col items-center shrink-0 w-10">
          <div class="flex items-center justify-center shrink-0">
            <ProcessingIndicator />
          </div>
        </div>
        <div class="flex-1 py-2.5">
          <span class="text-xs text-ink-faint font-medium tracking-wide">Processing next step...</span>
        </div>
      </div>
    {/if}
  </div>
</div>
