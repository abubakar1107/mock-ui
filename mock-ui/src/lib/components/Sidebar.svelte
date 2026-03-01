<script lang="ts">
  import { Plus, Briefcase, FileText } from 'lucide-svelte';
</script>

<aside class="w-64 border-r bg-muted/20 flex flex-col h-full">
  <div class="p-4 border-b">
    <h2 class="font-bold text-xl tracking-tight text-primary">
      SEER
    </h2>
    <p class="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">by Protego AI</p>
  </div>
  
  <div class="p-4 flex-1 overflow-y-auto">
    <button class="w-full flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md mb-6 transition-colors">
      <Plus class="w-4 h-4" />
      Start New LAW SUIT
    </button>
    
    <div class="space-y-1">
      <h3 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Recent Cases</h3>
      <button class="w-full flex items-center gap-2 text-sm px-2 py-1.5 rounded-md hover:bg-muted text-left">
        <FileText class="w-4 h-4 text-muted-foreground" />
        CASE 1
      </button>
      <button class="w-full flex items-center gap-2 text-sm px-2 py-1.5 rounded-md hover:bg-muted text-left">
        <FileText class="w-4 h-4 text-muted-foreground" />
        CASE 2
      </button>
      <button class="w-full flex items-center gap-2 text-sm px-2 py-1.5 rounded-md hover:bg-muted text-left">
        <FileText class="w-4 h-4 text-muted-foreground" />
        CASE 3
      </button>
    </div>
  </div>
</aside>
