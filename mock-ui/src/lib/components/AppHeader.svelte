<script lang="ts">
  import * as Select from "$lib/components/ui/select";
  import { Gavel, ShieldAlert } from 'lucide-svelte';
  import { workflow } from '$lib/stores/workflow.svelte';

  let isPreStart = $derived(
    workflow.step === 'role-select' || workflow.step === 'p-init' || workflow.step === 'd-init'
  );

  function handleRoleChange(value: string | undefined) {
    if (value === 'prosecution' || value === 'defense') {
      workflow.reset(value);
    }
  }
</script>

<header class="border-b border-ink-ghost/60 px-6 py-3 flex items-center justify-between bg-white/60 backdrop-blur-sm relative z-20">
  <div class="flex-1 flex items-center gap-4">
    {#if isPreStart}
      <Select.Root
        type="single"
        value={workflow.role ?? undefined}
        onValueChange={handleRoleChange}
      >
        <Select.Trigger class="w-[200px] bg-white border-ink-ghost text-sm font-medium text-ink rounded-full">
          {#if workflow.role === 'prosecution'}
            <span class="flex items-center gap-2 text-ink"><Gavel class="w-3.5 h-3.5 text-terra" /> Prosecution</span>
          {:else if workflow.role === 'defense'}
            <span class="flex items-center gap-2 text-ink"><ShieldAlert class="w-3.5 h-3.5 text-terra" /> Defense</span>
          {:else}
            <span class="text-ink-faint">Select side...</span>
          {/if}
        </Select.Trigger>
        <Select.Content class="bg-white border-ink-ghost/60 rounded-xl">
          <Select.Item value="prosecution" label="Prosecution">
            <span class="flex items-center gap-2"><Gavel class="w-3.5 h-3.5 text-terra" /> Prosecution</span>
          </Select.Item>
          <Select.Item value="defense" label="Defense">
            <span class="flex items-center gap-2"><ShieldAlert class="w-3.5 h-3.5 text-terra" /> Defense</span>
          </Select.Item>
        </Select.Content>
      </Select.Root>
    {:else if workflow.role}
      <span class="text-sm font-medium text-ink">Doe v. TechCorp</span>
    {/if}
  </div>

  <div class="flex-1 flex justify-center">
    {#if !isPreStart && workflow.role}
      <div class="flex items-center gap-3">
        <span class="text-sm text-ink-muted">Doe v. TechCorp</span>
        <span class="text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full {workflow.role === 'prosecution' ? 'bg-terra text-white' : 'bg-cream-deep text-ink-light border border-ink-ghost/60'}">
          {workflow.role === 'prosecution' ? 'Plaintiff' : 'Defendant'}
        </span>
      </div>
    {/if}
  </div>

  <div class="flex-1 flex justify-end">
    <div class="w-8 h-8 rounded-full bg-cream-deep border border-ink-ghost/60 flex items-center justify-center text-[11px] font-semibold text-ink-light">
      JD
    </div>
  </div>
</header>
