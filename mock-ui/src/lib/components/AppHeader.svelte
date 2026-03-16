<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
  import { workflow } from '$lib/stores/workflow.svelte';

  function handleRoleSwitch(value: string) {
    if (value === 'prosecution' || value === 'defense') {
      workflow.reset(value);
    }
  }
</script>

<header class="border-b border-zinc-200 px-6 py-4 flex items-center justify-between bg-white relative z-20">
  <div class="flex-1">
    {#if workflow.role}
      <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.15em]">Doe v. TechCorp</span>
    {/if}
  </div>

  <div class="flex-1 flex justify-center">
    <Tabs.Root value={workflow.role ?? ''} onValueChange={handleRoleSwitch} class="w-[400px]">
      <Tabs.List class="grid w-full grid-cols-2">
        <Tabs.Trigger value="prosecution">Prosecution</Tabs.Trigger>
        <Tabs.Trigger value="defense">Defense</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  </div>

  <div class="flex-1 flex justify-end">
    <div class="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-semibold text-zinc-900 tracking-widest">
      JD
    </div>
  </div>
</header>
