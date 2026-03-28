<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import AppHeader from '$lib/components/AppHeader.svelte';

  let { children } = $props();

  let isDungeon = $derived(page.url.pathname.startsWith('/dungeon'));
</script>

{#if isDungeon}
  <div class="h-screen w-full overflow-hidden bg-cream text-ink">
    {@render children()}
  </div>
{:else}
  <div class="flex h-screen w-full overflow-hidden bg-cream text-ink">
    <Sidebar />
    <div class="flex flex-col flex-1 overflow-hidden">
      <AppHeader />
      <main class="flex-1 overflow-hidden bg-cream">
        <div class="w-full h-full">
          {@render children()}
        </div>
      </main>
    </div>
  </div>
{/if}
