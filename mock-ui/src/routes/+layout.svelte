<script lang="ts">
  import '../app.css';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import AppHeader from '$lib/components/AppHeader.svelte';
  
  let { children } = $props();
</script>

<div class="flex h-screen w-full overflow-hidden bg-white text-zinc-900 font-sans">
  <Sidebar />
  <div class="flex flex-col flex-1 overflow-hidden">
    <AppHeader />
    <main class="flex-1 overflow-hidden bg-white">
      <div class="w-full h-full">
        {@render children()}
      </div>
    </main>
  </div>
</div>
