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

  goTo(newStep: string) {
    this.stepHistory = [...this.stepHistory, this.step];
    this.step = newStep;
    this.substep = 0;
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
  }
}

export const workflow = new WorkflowState();
