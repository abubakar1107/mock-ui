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

<header class="border-b border-zinc-300/60 px-6 py-3.5 flex items-center justify-between bg-white relative z-20">
  <div class="flex-1">
    {#if workflow.role && !isPreStart}
      <span class="text-xs font-semibold text-zinc-900 tracking-wide">Doe v. TechCorp</span>
    {:else}
      <span class="text-xs font-medium text-zinc-400 tracking-wide">SEER Litigation Simulator</span>
    {/if}
  </div>

  <div class="flex-1 flex justify-center">
    {#if isPreStart}
      <Select.Root
        type="single"
        value={workflow.role ?? undefined}
        onValueChange={handleRoleChange}
      >
        <Select.Trigger class="w-[220px] bg-white border-zinc-300 text-sm font-medium">
          {#if workflow.role === 'prosecution'}
            <span class="flex items-center gap-2"><Gavel class="w-3.5 h-3.5" /> Prosecution</span>
          {:else if workflow.role === 'defense'}
            <span class="flex items-center gap-2"><ShieldAlert class="w-3.5 h-3.5" /> Defense</span>
          {:else}
            <span class="text-zinc-400">Select side...</span>
          {/if}
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="prosecution" label="Prosecution">
            <span class="flex items-center gap-2"><Gavel class="w-3.5 h-3.5" /> Prosecution</span>
          </Select.Item>
          <Select.Item value="defense" label="Defense">
            <span class="flex items-center gap-2"><ShieldAlert class="w-3.5 h-3.5" /> Defense</span>
          </Select.Item>
        </Select.Content>
      </Select.Root>
    {:else if workflow.role}
      <div class="flex items-center gap-3">
        <span class="text-sm font-semibold text-zinc-700 tracking-wide">Doe v. TechCorp</span>
        <span class="text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-md {workflow.role === 'prosecution' ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-800'}">
          {workflow.role === 'prosecution' ? 'Prosecution' : 'Defense'}
        </span>
      </div>
    {/if}
  </div>

  <div class="flex-1 flex justify-end">
    <div class="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-semibold text-zinc-900 tracking-widest">
      JD
    </div>
  </div>
</header>
