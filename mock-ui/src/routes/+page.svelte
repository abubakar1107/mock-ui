<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Textarea } from "$lib/components/ui/textarea";
  import * as Select from "$lib/components/ui/select";
  import * as Card from "$lib/components/ui/card";
  import { UploadCloud, FileText, ChevronRight, Loader2, CheckCircle2 } from "lucide-svelte";
  import { mockData } from "$lib/data/mockData";

  // State machine: 1: Setup, 2: Analyzing, 3: Facts, 4: Simulation, 5: Final
  let currentState = $state(1);

  function nextState() {
    if (currentState < 5) currentState++;
  }
  
  function prevState() {
    if (currentState > 1) currentState--;
  }
</script>

<div class="h-full flex flex-col">
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-bold tracking-tight">
      {#if currentState === 1}
        Start New LAW SUIT
      {:else if currentState === 2}
        Analyzing Documents
      {:else if currentState === 3}
        Fact Review
      {:else if currentState === 4}
        Agent Simulation
      {:else}
        Final Draft Ready
      {/if}
    </h1>
    
    <div class="flex items-center gap-2">
      {#if currentState > 1}
        <Button variant="outline" onclick={prevState}>Back</Button>
      {/if}
      {#if currentState < 5}
        <Button onclick={nextState}>
          Next Step <ChevronRight class="w-4 h-4 ml-1" />
        </Button>
      {/if}
    </div>
  </div>

  <div class="flex-1 bg-background rounded-lg border shadow-sm p-6 overflow-y-auto">
    {#if currentState === 1}
      <!-- State 1: Initial Setup -->
      <div class="grid grid-cols-3 gap-6 h-full">
        <!-- Upload Area -->
        <div class="col-span-1 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 text-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer">
          <UploadCloud class="w-12 h-12 mb-4 text-muted-foreground/50" />
          <p class="font-medium text-foreground mb-1">Upload the documents</p>
          <p class="text-sm">Drag and drop or click to select</p>
          
          <!-- Mock uploaded file -->
          <div class="mt-6 w-full p-3 bg-muted rounded-md flex items-center gap-3 text-left">
            <FileText class="w-5 h-5 text-primary" />
            <div class="flex-1 overflow-hidden">
              <p class="text-sm font-medium text-foreground truncate">Complaint_Doe_v_TechCorp.pdf</p>
              <p class="text-xs">2.4 MB</p>
            </div>
            <CheckCircle2 class="w-4 h-4 text-green-500" />
          </div>
        </div>

        <!-- Prompt Area -->
        <div class="col-span-2 flex flex-col gap-4">
          <div class="flex-1 flex flex-col">
            <label for="prompt" class="text-sm font-medium mb-2">Prompt the agent, what to be done</label>
            <Textarea 
              id="prompt" 
              placeholder="e.g., Analyze this complaint and draft an answer with affirmative defenses..." 
              class="flex-1 resize-none text-base p-4"
              value="Please analyze the attached complaint from John Doe. Draft an Answer on behalf of Tech Corp Inc. Include appropriate affirmative defenses based on the employment agreement."
            />
          </div>
          
          <div class="flex items-center gap-4">
            <div class="flex-1">
              <label class="text-sm font-medium mb-2 block">Tools available for the agent</label>
              <Select.Root type="single">
                <Select.Trigger class="w-full">
                  Search corpus, Google Search...
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="corpus">Search corpus</Select.Item>
                  <Select.Item value="google">Google Search</Select.Item>
                  <Select.Item value="movements">Search Case movements/statues</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
            <div class="pt-7">
              <Button size="lg" onclick={nextState}>Start Agent</Button>
            </div>
          </div>
        </div>
      </div>
    {/if}
    
    {#if currentState === 2}
      <!-- State 2: Analyzing & Initial Draft -->
      <div class="h-full flex flex-col items-center justify-center space-y-8">
        <div class="flex flex-col items-center space-y-4">
          <Loader2 class="w-16 h-16 animate-spin text-primary" />
          <h2 class="text-xl font-medium">Analyzing the document...</h2>
          <p class="text-muted-foreground text-center max-w-md">
            The agent is extracting facts, identifying legal arguments, and preparing the initial draft.
          </p>
        </div>
        
        <div class="pt-8">
          <Button size="lg" onclick={nextState} class="gap-2">
            <FileText class="w-5 h-5" />
            Draft answer. View answer in DOCX
          </Button>
        </div>
      </div>
    {/if}

    {#if currentState === 3}
      <!-- State 3: Fact Review -->
      <div class="h-full flex flex-col gap-6">
        <div class="flex items-center gap-3 text-muted-foreground bg-muted/30 p-4 rounded-lg border">
          <Loader2 class="w-5 h-5 animate-spin text-primary" />
          <span>Analyzing the corpus and preparing the facts...</span>
        </div>
        
        <div class="flex-1 overflow-y-auto">
          <Card.Root>
            <Card.Header>
              <Card.Title>Fact Verification</Card.Title>
              <Card.Description>Review and classify the extracted facts before proceeding.</Card.Description>
            </Card.Header>
            <Card.Content>
              <div class="space-y-4">
                {#each mockData.facts as fact}
                  <div class="flex items-start justify-between gap-4 p-4 border rounded-lg bg-background">
                    <p class="text-sm flex-1 mt-1">{fact.text}</p>
                    <div class="flex items-center gap-2 shrink-0">
                      <Button variant={fact.status === 'admit' ? 'default' : 'outline'} size="sm" class="w-20">Admit</Button>
                      <Button variant={fact.status === 'deny' ? 'destructive' : 'outline'} size="sm" class="w-20">Deny</Button>
                      <Button variant="outline" size="sm" class="w-24">Substitute</Button>
                    </div>
                  </div>
                {/each}
              </div>
            </Card.Content>
          </Card.Root>
        </div>
        
        <div class="h-32 border rounded-lg bg-black text-green-400 p-4 font-mono text-sm overflow-y-auto">
          <p>> Using fact 1...</p>
          <p>> Using fact 2...</p>
          <p>> Drafting the document...</p>
          <p class="animate-pulse">_</p>
        </div>
      </div>
    {/if}

    {#if currentState === 4 || currentState === 5}
      <!-- State 4 & 5: Simulation Logs -->
      <div class="h-full flex gap-6">
        <!-- Left side: Stepper Logs -->
        <div class="flex-1 border rounded-lg bg-background p-6 overflow-y-auto">
          <h3 class="font-semibold text-lg mb-6">Simulation Progress</h3>
          <div class="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {#each mockData.simulationLogs as log, i}
              {#if currentState === 5 || i < 8}
                <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <CheckCircle2 class="w-5 h-5" />
                  </div>
                  <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border shadow-sm bg-card">
                    <div class="flex items-center justify-between mb-1">
                      <h4 class="font-semibold text-sm">{log.title}</h4>
                      <span class="text-xs text-muted-foreground">Step {log.step}</span>
                    </div>
                    <p class="text-sm text-muted-foreground">{log.description}</p>
                  </div>
                </div>
              {/if}
            {/each}
            
            {#if currentState === 4}
              <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Loader2 class="w-5 h-5 animate-spin" />
                </div>
                <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-dashed shadow-sm bg-muted/50">
                  <h4 class="font-semibold text-sm text-muted-foreground">Processing next simulation step...</h4>
                </div>
              </div>
            {/if}
          </div>
        </div>
        
        <!-- Right side: Document Preview -->
        <div class="w-1/3 flex flex-col gap-4">
          <Card.Root class="flex-1 flex flex-col overflow-hidden">
            <Card.Header class="py-3 border-b bg-muted/30">
              <Card.Title class="text-sm flex items-center justify-between">
                Draft Document
                {#if currentState === 5}
                  <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Final Ready</span>
                {:else}
                  <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full animate-pulse">Updating...</span>
                {/if}
              </Card.Title>
            </Card.Header>
            <Card.Content class="p-0 flex-1 overflow-y-auto">
              <div class="p-4 text-xs font-serif whitespace-pre-wrap text-muted-foreground">
                {mockData.answerDraft}
              </div>
            </Card.Content>
          </Card.Root>
          
          <Button variant="outline" class="w-full gap-2">
            <FileText class="w-4 h-4" />
            Open editable canvas
          </Button>
        </div>
      </div>
    {/if}
  </div>
</div>
