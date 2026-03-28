export type ChatMessage = { text: string; timestamp: Date };

export class WorkflowState {
  role = $state<'prosecution' | 'defense' | null>(null);
  step = $state('role-select');
  substep = $state(0);
  completedDocs = $state<string[]>([]);
  defenseStrategy = $state<'answer' | 'mtd' | null>(null);
  demandResponse = $state<'settlement' | 'denied' | null>(null);
  defenseAction = $state<'nothing' | 'mtd' | 'answer' | null>(null);
  hasCounterclaim = $state<boolean | null>(null);
  selectedGrounds = $state<string[]>(['12(b)(6)']);
  stepHistory = $state<string[]>([]);

  jurisdictionType = $state<'federal' | 'state' | null>(null);
  selectedState = $state<string | null>(null);
  selectedCourt = $state<string | null>(null);

  paused = $state(false);
  chatMessages = $state<ChatMessage[]>([]);

  pause() { this.paused = true; }
  resume() { this.paused = false; }

  sendMessage(text: string) {
    this.chatMessages = [...this.chatMessages, { text, timestamp: new Date() }];
    this.paused = false;
  }

  goTo(newStep: string) {
    this.stepHistory = [...this.stepHistory, this.step];
    this.step = newStep;
    this.substep = 0;
    this.paused = false;
    this.chatMessages = [];
  }

  back() {
    if (this.stepHistory.length > 0) {
      this.step = this.stepHistory[this.stepHistory.length - 1];
      this.stepHistory = this.stepHistory.slice(0, -1);
      this.substep = 0;
    }
  }

  markDocComplete(docId: string) {
    if (!this.completedDocs.includes(docId)) {
      this.completedDocs = [...this.completedDocs, docId];
    }
  }

  reset(newRole?: 'prosecution' | 'defense') {
    this.role = newRole ?? null;
    this.step = newRole ? (newRole === 'prosecution' ? 'p-init' : 'd-init') : 'role-select';
    this.substep = 0;
    this.completedDocs = [];
    this.defenseStrategy = null;
    this.demandResponse = null;
    this.defenseAction = null;
    this.hasCounterclaim = null;
    this.selectedGrounds = ['12(b)(6)'];
    this.stepHistory = [];
    this.jurisdictionType = null;
    this.selectedState = null;
    this.selectedCourt = null;
    this.paused = false;
    this.chatMessages = [];
  }

  setRole(role: 'prosecution' | 'defense') {
    this.role = role;
    this.step = role === 'prosecution' ? 'p-init' : 'd-init';
  }
}

export const workflow = new WorkflowState();
