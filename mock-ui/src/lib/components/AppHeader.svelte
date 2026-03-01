<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
</script>

<header class="border-b px-6 py-3 flex items-center justify-between bg-background">
  <div class="flex-1"></div>
  
  <div class="flex-1 flex justify-center">
    <Tabs.Root value="defense" class="w-[400px]">
      <Tabs.List class="grid w-full grid-cols-2">
        <Tabs.Trigger value="defense">defense</Tabs.Trigger>
        <Tabs.Trigger value="court-app">Court app</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  </div>
  
  <div class="flex-1 flex justify-end">
    <!-- User profile or other actions could go here -->
    <div class="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
      JD
    </div>
  </div>
</header>
