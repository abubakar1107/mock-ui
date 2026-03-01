<script lang="ts">
  import '../app.css';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import AppHeader from '$lib/components/AppHeader.svelte';
  
  let { children } = $props();
</script>

<div class="flex h-screen w-full overflow-hidden bg-background text-foreground">
  <Sidebar />
  <div class="flex flex-col flex-1 overflow-hidden">
    <AppHeader />
    <main class="flex-1 overflow-y-auto bg-muted/10 p-6">
      <div class="max-w-5xl mx-auto h-full">
        {@render children()}
      </div>
    </main>
  </div>
</div>
