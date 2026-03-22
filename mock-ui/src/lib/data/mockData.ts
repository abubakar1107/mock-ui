export type AnalysisStep = { text: string; description?: string };

export type AgentRole = 'extraction' | 'lead-counsel' | 'discovery' | 'research' | 'adversarial';

export type ToolCall = {
  tool: string;
  input?: string;
  output?: string;
  source?: string;
};

export type SimulationLog = {
  step: number;
  title: string;
  description: string;
  icon: 'check' | 'cpu' | 'file' | 'swords' | 'shield' | 'search' | 'brain' | 'users' | 'scan' | 'scale';
  team: 'blue' | 'red' | 'system';
  agent?: AgentRole;
  agentLabel?: string;
  tools?: ToolCall[];
  detail?: string;
};

export type AgentDefinition = {
  role: AgentRole;
  label: string;
  description: string;
  tools: string[];
};

export const agentRoster: AgentDefinition[] = [
  {
    role: 'extraction',
    label: 'Extraction Agent',
    description: 'Parses documents, extracts structure and entities',
    tools: ['parse_document', 'extract_entities', 'structure_claims'],
  },
  {
    role: 'lead-counsel',
    label: 'Lead Counsel',
    description: 'Strategic planner, builds case theory and prioritizes claims',
    tools: ['build_case_theory', 'prioritize_claims', 'assess_risk', 'set_strategy'],
  },
  {
    role: 'discovery',
    label: 'Discovery Analyst',
    description: 'Extracts facts, witnesses, timelines, and exhibits from case files',
    tools: ['extract_facts', 'build_timeline', 'identify_witnesses', 'catalog_exhibits'],
  },
  {
    role: 'research',
    label: 'Research Agent',
    description: 'Retrieves relevant statutes, regulations, and case precedents',
    tools: ['search_statutes', 'search_case_law', 'verify_citations', 'analyze_precedent'],
  },
  {
    role: 'adversarial',
    label: 'Argument Agent',
    description: 'Drafts structured legal arguments, runs attack/defense revision loops',
    tools: ['draft_argument', 'critique_argument', 'propose_rebuttal', 'revision_loop'],
  },
];

export type FactItem = {
  id: number;
  text: string;
  status: 'admit' | 'deny';
};

export type LegalGround = {
  rule: string;
  name: string;
  viability: number;
  rationale: string;
};

export type CaseLawItem = {
  name: string;
  citation: string;
  relevance: number;
  summary: string;
};

export type WorkflowDoc = {
  id: string;
  name: string;
  phase: number;
  type: 'administrative' | 'substantive';
  branch?: string;
};

// ─── Sidebar document lists ───────────────────────────────────────────

export const prosecutionDocs: WorkflowDoc[] = [
  { id: 'hold-notice', name: 'Litigation Hold Notice', phase: 0, type: 'administrative' },
  { id: 'demand-letter', name: 'Demand Letter', phase: 0, type: 'administrative' },
  { id: 'complaint', name: 'Complaint', phase: 1, type: 'substantive' },
  { id: 'cover-sheet', name: 'Civil Cover Sheet', phase: 1, type: 'administrative' },
  { id: 'opposition-mtd', name: 'Opposition to MTD', phase: 2, type: 'substantive', branch: 'mtd' },
  { id: 'default-motion', name: 'Motion for Entry of Default', phase: 2, type: 'administrative', branch: 'nothing' },
  { id: 'reply-counterclaim', name: 'Reply to Counterclaim', phase: 2, type: 'substantive', branch: 'answer-cc' },
];

export const defenseDocs: WorkflowDoc[] = [
  { id: 'hold-notice', name: 'Litigation Hold Notice', phase: 0, type: 'administrative' },
  { id: 'answer', name: 'Answer & Affirmative Defenses', phase: 1, type: 'substantive', branch: 'answer' },
  { id: 'counterclaim', name: 'Counterclaim / Crossclaim', phase: 1, type: 'substantive', branch: 'answer-cc' },
  { id: 'mtd', name: 'Motion to Dismiss', phase: 1, type: 'substantive', branch: 'mtd' },
  { id: 'reply-mtd', name: 'Reply in Support of MTD', phase: 1, type: 'substantive', branch: 'mtd' },
];

// ─── Prosecution (Plaintiff) Data ─────────────────────────────────────

export const prosecutionData = {
  holdNotice: {
    analysisSteps: [
      { text: 'Identifying parties and relevant custodians...', description: 'Cross-referencing John Doe\'s employment records, reporting structure, and departmental access to compile a list of all individuals and teams who may possess documents relevant to the bonus dispute and termination.' },
      { text: 'Determining scope of preservation obligations...', description: 'Mapping all categories of potentially relevant evidence — email accounts, Slack channels, HR databases, performance dashboards, Board meeting minutes, and the employment agreement dated January 15, 2023 — to define the preservation scope.' },
      { text: 'Litigation hold notice generated.', description: 'Formal notice drafted and addressed to all identified custodians, instructing immediate preservation of documents and ESI related to Doe v. Tech Corp Inc. Includes spoliation warning and compliance obligations.' },
    ],
    draft: `LITIGATION HOLD NOTICE

To: All Relevant Custodians
Re: Doe v. Tech Corp Inc. — Preservation of Documents and ESI

You are hereby notified that litigation is reasonably anticipated in the matter of John Doe v. Tech Corp Inc. You are required to immediately preserve all documents, electronic data, and tangible items that may be relevant to this litigation.

SCOPE OF PRESERVATION:
- All employment records related to John Doe
- The employment agreement dated January 15, 2023
- All communications regarding John Doe's performance, bonus, or termination
- HR records, performance reviews, and evaluation metrics
- Board of Directors minutes regarding bonus approvals
- All electronic communications (email, Slack, Teams) referencing John Doe

Do not destroy, delete, or alter any materials within the scope described above. Failure to comply may result in sanctions and adverse inference instructions.

Date: [Auto-generated]
Issued by: Smith & Associates, Attorneys for Plaintiff`,
  },

  demandLetter: {
    analysisSteps: [
      { text: 'Reviewing employment agreement terms...', description: 'Parsing the January 15, 2023 Employment Agreement to extract Section 4.1 (bonus entitlement), Section 4.2 (Board approval clause), and termination provisions. Identifying contractual basis for the $30,000 performance bonus claim.' },
      { text: 'Calculating damages and potential recovery...', description: 'Computing total demand amount: $30,000 unpaid bonus principal, plus accrued prejudgment interest under California Civil Code § 3287, estimated attorney\'s fees, and anticipated litigation costs.' },
      { text: 'Assessing pre-suit leverage and settlement posture...', description: 'Evaluating Tech Corp\'s likely exposure, reputational risk, and cost of defense to determine optimal demand positioning. Factoring in Plaintiff\'s strong performance record (Q1-Q3 targets exceeded by 12%) as leverage.' },
      { text: 'Demand letter generated.', description: 'Formal demand letter prepared on Smith & Associates letterhead, sent via certified mail to Tech Corp\'s General Counsel. Includes 30-day payment deadline with notice of intent to file civil complaint if unresolved.' },
    ],
    draft: `LAW OFFICES OF SMITH & ASSOCIATES
1200 Market Street, Suite 400
San Francisco, CA 94103

Via Certified Mail

General Counsel
Tech Corp Inc.
123 Innovation Drive
San Jose, CA 95134

Re: Demand for Payment — John Doe Employment Agreement

Dear Counsel:

This firm represents John Doe in connection with claims arising from his employment with Tech Corp Inc. Mr. Doe's employment was terminated without cause on December 1, 2023.

Under the terms of the Employment Agreement dated January 15, 2023, Mr. Doe is entitled to a performance bonus of $30,000, earned based on his satisfaction of all applicable performance metrics for the relevant period.

DEMAND: We hereby demand payment of $30,000 plus accrued interest within thirty (30) days of the date of this letter. Failure to remit payment will result in the filing of a civil complaint seeking compensatory damages, prejudgment interest, attorney's fees, and costs of suit.

We encourage your client to resolve this matter promptly to avoid the expense of litigation.

Sincerely,
James Smith, Esq.
Smith & Associates`,
  },

  complaint: {
    analysisSteps: [
      { text: 'Identifying viable causes of action...', description: 'Analyzing facts against potential claims: breach of contract (strongest — clear agreement + non-payment), breach of implied covenant of good faith (moderate), and unjust enrichment (weak). Recommending single-count complaint for maximum focus.' },
      { text: 'Verifying subject matter and personal jurisdiction...', description: 'Confirming diversity jurisdiction under 28 U.S.C. § 1332: Plaintiff is a California citizen, Defendant is incorporated in Delaware. Calculating amount-in-controversy including $30,000 bonus, prejudgment interest, attorney\'s fees, and costs to exceed $75,000 threshold.' },
      { text: 'Checking statute of limitations compliance...', description: 'Applying California\'s 4-year statute of limitations for written contracts (CCP § 337). Breach occurred December 1, 2023 upon termination and non-payment — filing is well within the limitations period.' },
      { text: 'Drafting factual allegations with specificity...', description: 'Constructing 8 numbered paragraphs covering: party identities, jurisdictional basis, agreement execution, compensation terms, Plaintiff\'s full performance (with specific metrics), wrongful termination, and Defendant\'s material breach.' },
      { text: 'Assessing pleading sufficiency under Twombly/Iqbal...', description: 'Validating each allegation against the plausibility standard from Bell Atlantic v. Twombly (550 U.S. 544) and Ashcroft v. Iqbal (556 U.S. 662). Ensuring factual specificity — not threadbare recitals — for the performance and breach elements.' },
      { text: 'Complaint draft ready for review.', description: 'Complete Complaint for Breach of Contract drafted for the Northern District of California. Includes jurisdictional statement, 8 factual paragraphs, single cause of action, and prayer for $30,000 plus interest, costs, and attorney\'s fees.' },
    ],
    draft: `IN THE UNITED STATES DISTRICT COURT
FOR THE NORTHERN DISTRICT OF CALIFORNIA

JOHN DOE,
    Plaintiff,
v.
TECH CORP INC.,
    Defendant.

COMPLAINT FOR BREACH OF CONTRACT

1. Plaintiff John Doe is an individual residing in San Francisco, California.
2. Defendant Tech Corp Inc. is a corporation organized under the laws of Delaware with its principal place of business in San Jose, California.
3. This Court has subject matter jurisdiction under 28 U.S.C. § 1332 because the parties are citizens of different states and the amount in controversy exceeds $75,000.
4. On or about January 15, 2023, Plaintiff and Defendant entered into a written employment agreement ("the Agreement").
5. Under the terms of the Agreement, Defendant agreed to pay Plaintiff a base salary of $150,000 per year plus a performance bonus upon satisfaction of stated metrics.
6. Plaintiff fully performed all obligations required under the Agreement, including exceeding Q1-Q3 revenue targets by 12%, maintaining client retention above 95%, and meeting all project deadlines.
7. On December 1, 2023, Defendant terminated Plaintiff's employment without cause and failed to pay the earned performance bonus of $30,000.
8. Defendant's failure to pay the bonus constitutes a material breach of the Agreement.

WHEREFORE, Plaintiff prays for judgment against Defendant for compensatory damages in the amount of $30,000, plus prejudgment interest, costs, and attorney's fees.`,
    simulationLogs: [
      { step: 1, title: 'Initializing adversarial simulation', description: 'Spinning up Plaintiff agent team (5 agents) and loading Complaint draft into simulation environment.', icon: 'check', team: 'system' },
      { step: 2, title: 'Deploying Defense red team', description: 'Defense agent team (5 agents) initialized: Extraction, Lead Counsel, Discovery Analyst, Research, Argument Agent.', icon: 'cpu', team: 'system' },
      { step: 3, title: 'Parsing complaint structure', description: 'Extracting document structure: 8 paragraphs, 1 cause of action, jurisdictional basis, prayer for relief.', icon: 'scan', team: 'blue', agent: 'extraction', agentLabel: 'Extraction Agent', tools: [{ tool: 'parse_document', input: 'Complaint_Doe_v_TechCorp.pdf', output: '8 paragraphs parsed, 1 COA identified: Breach of Contract' }] },
      { step: 4, title: 'Extracting factual timeline', description: 'Built chronological timeline from agreement execution through termination and non-payment.', icon: 'users', team: 'blue', agent: 'discovery', agentLabel: 'Discovery Analyst', tools: [{ tool: 'build_timeline', input: 'Complaint paragraphs 4-7', output: 'Jan 15 2023: Agreement → Dec 1 2023: Termination → Bonus unpaid' }, { tool: 'extract_facts', output: '6 factual assertions, 2 legal conclusions identified' }] },
      { step: 5, title: 'Researching pleading standard authority', description: 'Retrieved Twombly/Iqbal framework and California breach of contract elements to validate complaint sufficiency.', icon: 'search', team: 'blue', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'search_case_law', input: 'breach of contract pleading standard California federal', source: 'CourtListener', output: 'Twombly 550 U.S. 544, Iqbal 556 U.S. 662, Otworth 166 Cal.App.3d 452' }, { tool: 'search_statutes', input: '28 U.S.C. § 1332 diversity jurisdiction', output: 'Confirmed: amount-in-controversy > $75K, diverse citizenship required' }] },
      { step: 6, title: 'Building case theory', description: 'Prioritized breach of contract as sole COA. Mandatory bonus interpretation under Section 4.1 is strongest argument. Jurisdictional basis solid.', icon: 'brain', team: 'blue', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'build_case_theory', output: 'Theory: mandatory bonus obligation + full performance = clear breach' }, { tool: 'prioritize_claims', output: 'Primary: Breach of Contract (strong). Alt claims: Implied covenant (moderate), Unjust enrichment (weak)' }], detail: 'Strategic assessment: single-count complaint is clean and focused. Adding weaker claims would dilute the strong breach argument.' },
      { step: 7, title: 'Red team Extraction Agent scanning document', description: 'Parsing complaint for structural deficiencies and missing elements per FRCP 8(a) requirements.', icon: 'scan', team: 'red', agent: 'extraction', agentLabel: 'Extraction Agent', tools: [{ tool: 'parse_document', input: 'Plaintiff Complaint', output: 'Flag: Para 6 uses conclusory language. Flag: Amount-in-controversy may not exceed $75K threshold.' }] },
      { step: 8, title: 'Red team researching counter-precedent', description: 'Searching for authority that performance bonus provisions with Board approval clauses are discretionary.', icon: 'search', team: 'red', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'search_case_law', input: 'discretionary bonus board approval condition precedent', source: 'LexisNexis', output: 'Stockton Mortgage v. Tope, 233 Cal.App.4th 437 — bonus conditioned on approval = discretionary' }, { tool: 'analyze_precedent', input: 'Stockton Mortgage v. Tope', output: 'Holding: Board approval language creates condition precedent, not mandatory obligation' }] },
      { step: 9, title: 'Red team Lead Counsel identifying attack vectors', description: 'Two primary attack vectors identified: (1) conclusory performance allegation under Iqbal, (2) discretionary bonus argument under Section 4.2.', icon: 'brain', team: 'red', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'assess_risk', output: 'Attack 1: Para 6 conclusory — high success probability (70%). Attack 2: Bonus discretionary — moderate (55%)' }, { tool: 'set_strategy', output: 'Lead with Iqbal insufficiency, follow with contract interpretation' }] },
      { step: 10, title: 'Attack: Performance allegation is conclusory', description: "Defense argues Paragraph 6 — 'fully performed all obligations' — is a bare legal conclusion insufficient under Iqbal. No specific metrics, dates, or achievements are alleged.", icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'Complaint Para 6', output: 'Iqbal deficiency: conclusory assertion without factual support for each performance metric' }], detail: 'Citing Iqbal 556 U.S. at 678: "Threadbare recitals of the elements of a cause of action, supported by mere conclusory statements, do not suffice."' },
      { step: 11, title: 'Researching rebuttal authority', description: 'Found California authority supporting that enumerated performance metrics satisfy Iqbal factual specificity requirements.', icon: 'search', team: 'blue', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'search_case_law', input: 'specific performance metrics satisfy Iqbal pleading', source: 'CourtListener', output: 'Eclectic Properties v. Hess, 198 Cal.App.3d 169 — specific performance allegations sufficient' }] },
      { step: 12, title: 'Fortified Paragraph 6 with specific metrics', description: 'Added enumerated performance achievements: Q1-Q3 revenue targets exceeded by 12%, client retention above 95%, all project deadlines met.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'propose_rebuttal', input: 'Iqbal conclusory attack on Para 6', output: 'Rebuttal: replace conclusory language with specific metric enumeration from employment records' }], detail: 'Revised Para 6 now lists three independently verifiable performance metrics, converting the conclusory allegation into well-pleaded factual matter.' },
      { step: 13, title: 'Attack: Bonus is discretionary under Section 4.2', description: 'Defense argues the bonus is subject to Board approval per Section 4.2, making it discretionary rather than a contractual entitlement.', icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'Complaint Para 5 — bonus obligation', output: 'Contract interpretation: Section 4.2 Board approval = condition precedent, not formality' }], detail: 'Relying on Stockton Mortgage v. Tope: bonus provisions conditioned on management or board approval are discretionary.' },
      { step: 14, title: 'Strengthened mandatory bonus argument', description: 'Added allegation that Section 4.1 "shall be paid" creates mandatory obligation and Board approval under 4.2 was ministerial, not discretionary.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'propose_rebuttal', input: 'Discretionary bonus attack', output: 'Counter: "shall" = mandatory under Cal. contract law; Board approval historically rubber-stamped' }] },
      { step: 15, title: 'Red team Discovery Analyst probing jurisdiction', description: 'Analyzing whether amount-in-controversy genuinely exceeds $75K threshold given $30K bonus claim.', icon: 'users', team: 'red', agent: 'discovery', agentLabel: 'Discovery Analyst', tools: [{ tool: 'extract_facts', input: 'Jurisdictional allegations', output: 'Potential issue: $30K claim alone may not meet $75K diversity threshold without interest and fees' }] },
      { step: 16, title: 'Fortified jurisdictional allegations', description: 'Strengthened diversity jurisdiction with specific citizenship facts and amount-in-controversy analysis including prejudgment interest and attorney fees.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'revision_loop', input: 'Jurisdictional challenge + Para 3', output: 'Revised: added pre-judgment interest, attorney fees, and costs to exceed $75K threshold' }] },
      { step: 17, title: 'Running final revision loop', description: 'Blue team agents performing comprehensive review of all fortified paragraphs. Checking internal consistency and citation accuracy.', icon: 'cpu', team: 'system', detail: 'All 5 blue team agents running parallel final checks on their respective domains.' },
      { step: 18, title: 'Final fortification complete', description: 'All attack vectors addressed. Complaint withstands Iqbal scrutiny, bonus argument strengthened, jurisdictional basis solid.', icon: 'brain', team: 'blue', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'assess_risk', output: 'Post-simulation risk: 12(b)(6) motion success probability reduced from 45% to 15%' }] },
      { step: 19, title: 'Adversarial simulation complete', description: 'Complaint fortified through 2 attack-defense cycles across 3 vectors. Document hardened against anticipated Defense challenges.', icon: 'check', team: 'system' },
    ],
  },

  coverSheet: {
    analysisSteps: [
      { text: 'Extracting case information for JS-44 form...', description: 'Pulling party names, addresses, and attorney information from the Complaint. Mapping Plaintiff (San Francisco County, CA) and Defendant (Santa Clara County, CA) to the required JS-44 Civil Cover Sheet fields.' },
      { text: 'Classifying cause of action and jurisdiction basis...', description: 'Selecting Nature of Suit code 190 (Other Contract) and jurisdiction basis as Diversity of Citizenship under 28 U.S.C. § 1332. Confirming jury demand and entering requested relief amount of $30,000 plus interest and fees.' },
      { text: 'Civil Cover Sheet generated.', description: 'JS-44 form completed with all required sections: parties, basis of jurisdiction, nature of suit, cause of action, requested relief, and related case check. Ready for filing alongside the Complaint.' },
    ],
    draft: `CIVIL COVER SHEET (JS-44)

I. PARTIES
   Plaintiff: John Doe — San Francisco County, CA
   Defendant: Tech Corp Inc. — Santa Clara County, CA
   Attorneys (Plaintiff): Smith & Associates

II. BASIS OF JURISDICTION
   Diversity of Citizenship — 28 U.S.C. § 1332
   Plaintiff: Citizen of California
   Defendant: Incorporated in Delaware, PPB in California

III. NATURE OF SUIT
   190 — Other Contract

IV. CAUSE OF ACTION
   Breach of Employment Contract

V. REQUESTED IN COMPLAINT
   Jury Demand: Yes
   Amount: $30,000 plus interest, attorney's fees, and costs

VI. RELATED CASES
   None`,
  },

  oppositionToMTD: {
    analysisSteps: [
      { text: "Parsing Defendant's Motion to Dismiss...", description: 'Ingesting Defendant\'s memorandum of points and authorities. Extracting the two primary arguments: (A) failure to allege satisfaction of conditions precedent under Otworth, and (B) discretionary bonus interpretation under Stockton Mortgage v. Tope.' },
      { text: 'Identifying 12(b) grounds asserted by Defendant...', description: 'Defendant moves under FRCP 12(b)(6) only — failure to state a claim. No jurisdictional or procedural challenges raised. Focus areas: conclusory performance allegation and contract interpretation of Sections 4.1 and 4.2.' },
      { text: 'Researching counter-precedent for each ground...', description: 'Retrieving authority to counter each MTD argument: Diaz v. Fed. Express Corp. (373 F.3d 1054) for mandatory "shall" language, Cal. Civ. Code § 1654 for construing ambiguity against the drafter (employer), and FRCP 8(c) for classifying Board approval as an affirmative defense.' },
      { text: 'Evaluating strength of each opposition argument...', description: 'Scoring three opposition sections: (A) Twombly/Iqbal compliance — strong, complaint now includes specific metrics. (B) Mandatory bonus under "shall be paid" — strong with § 1654 support. (C) Board approval as affirmative defense — solid under FRCP 8(c)(1).' },
      { text: 'Opposition draft ready for review.', description: 'Three-section Opposition brief drafted: pleading standard compliance, mandatory contract interpretation, and affirmative defense classification. Includes responsive citations and direct rebuttals to each MTD argument.' },
    ],
    draft: `PLAINTIFF'S OPPOSITION TO DEFENDANT'S MOTION TO DISMISS

I. INTRODUCTION
Defendant's Motion to Dismiss should be denied. The Complaint adequately states a claim for breach of contract by alleging all required elements: (1) the existence of a contract, (2) Plaintiff's performance, (3) Defendant's breach, and (4) resulting damages.

II. ARGUMENT

A. The Complaint Satisfies Twombly/Iqbal Pleading Standards
Paragraph 6 of the Complaint alleges specific performance achievements: Q1-Q3 revenue targets exceeded by 12%, client retention above 95%, and all project deadlines met. These are factual allegations — not legal conclusions — and must be accepted as true at this stage.

B. The Performance Bonus Was Contractually Mandated
The Employment Agreement Section 4.1 states that upon meeting specified performance metrics, the bonus "shall be paid." The word "shall" creates a mandatory obligation under California contract law. Defendant's attempt to recharacterize this as discretionary contradicts the Agreement's plain language.

C. Board Approval Is an Affirmative Defense, Not a Pleading Defect
Defendant's reliance on a Board approval requirement (Section 4.2) is an affirmative defense that cannot be resolved on a motion to dismiss. Whether the Board approved or disapproved the bonus is a factual question inappropriate for 12(b)(6) resolution.

III. CONCLUSION
For the foregoing reasons, Plaintiff respectfully requests that the Court deny Defendant's Motion to Dismiss in its entirety.`,
    simulationLogs: [
      { step: 1, title: 'Initializing adversarial simulation', description: 'Loading Opposition brief and MTD context. Deploying Plaintiff agent team (5 agents).', icon: 'check', team: 'system' },
      { step: 2, title: 'Deploying Defense red team', description: 'Defense agent team initialized: Extraction, Lead Counsel, Discovery Analyst, Research, Argument Agent.', icon: 'cpu', team: 'system' },
      { step: 3, title: 'Parsing opposition brief structure', description: 'Extracted 3 argument sections: pleading standard, mandatory bonus, affirmative defense classification.', icon: 'scan', team: 'blue', agent: 'extraction', agentLabel: 'Extraction Agent', tools: [{ tool: 'parse_document', input: 'Opposition to MTD draft', output: '3 sections: Twombly/Iqbal compliance, contract interpretation, affirmative defense argument' }] },
      { step: 4, title: 'Researching opposition support authority', description: 'Gathering California contract interpretation canons and FRCP 8(c) affirmative defense precedent.', icon: 'search', team: 'blue', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'search_case_law', input: '"shall be paid" mandatory obligation California employment', source: 'CourtListener', output: 'Diaz v. Fed. Express Corp., 373 F.3d 1054 — "shall" creates mandatory duty under Cal. law' }, { tool: 'search_statutes', input: 'Cal. Civ. Code § 1654', output: 'Ambiguity in contract terms construed against drafter (employer)' }] },
      { step: 5, title: 'Red team Extraction Agent analyzing opposition', description: 'Scanning each argument for logical gaps and unsupported assertions.', icon: 'scan', team: 'red', agent: 'extraction', agentLabel: 'Extraction Agent', tools: [{ tool: 'parse_document', input: 'Plaintiff Opposition brief', output: 'Flag: Section A relies on pre-Twombly notice pleading language. Flag: "shall" argument ignores Section 4.2 qualifier.' }] },
      { step: 6, title: 'Red team researching counter-authority', description: 'Finding authority that post-Iqbal standard requires more than conclusory performance allegations.', icon: 'search', team: 'red', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'search_case_law', input: 'Iqbal factual plausibility vs notice pleading', source: 'LexisNexis', output: 'Iqbal explicitly retired Conley v. Gibson "no set of facts" standard — plausibility required' }] },
      { step: 7, title: 'Attack: Reliance on notice pleading is outdated', description: 'Defense argues opposition uses pre-Twombly notice pleading logic. Post-Iqbal standard demands factual plausibility, not mere possibility.', icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'Opposition Section A', output: 'Weakness: language mirrors notice pleading standard retired by Twombly/Iqbal' }] },
      { step: 8, title: 'Reinforced pleading standard analysis', description: 'Demonstrated Complaint satisfies both Twombly plausibility AND Iqbal factual specificity with enumerated performance metrics added during complaint simulation.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'propose_rebuttal', input: 'Notice pleading attack', output: 'Rebuttal: Complaint now enumerates 3 specific metrics — this exceeds Iqbal threshold, not mere notice pleading' }] },
      { step: 9, title: "Attack: 'Shall' reading ignores Section 4.2", description: "Defense argues 'shall be paid subject to Board approval' creates a condition precedent. The 'subject to' qualifier negates mandatory reading.", icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'Opposition Section B — mandatory bonus', output: 'Counter: "subject to Board approval in its sole discretion" = express condition precedent' }], detail: 'Red team Lead Counsel flagged this as highest-value attack — directly challenges the core contract interpretation argument.' },
      { step: 10, title: 'Strengthened contract interpretation argument', description: 'Added citation to Cal. Civ. Code § 1654 and Diaz v. Fed. Express — ambiguous provisions construed in favor of employee.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'propose_rebuttal', input: 'Section 4.2 condition precedent attack', output: 'Counter: § 1654 resolves ambiguity in employee favor; Board approval = ministerial based on prior course of dealing' }] },
      { step: 11, title: 'Red team probing affirmative defense classification', description: 'Challenging the argument that Board approval is an affirmative defense rather than a pleading requirement.', icon: 'brain', team: 'red', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'assess_risk', output: 'Affirmative defense classification is strong — FRCP 8(c) list supports Plaintiff position. Attack viability: low (25%).' }] },
      { step: 12, title: 'Fortified affirmative defense argument', description: 'Strengthened argument that Board approval is an affirmative defense under FRCP 8(c), citing parallel structure with "condition precedent" listed in 8(c)(1).', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'revision_loop', input: 'All 3 opposition sections post-attack', output: 'Revision complete: all sections fortified with additional authority and responsive arguments' }] },
      { step: 13, title: 'Running final consistency check', description: 'All blue team agents verifying argument coherence across sections. Research Agent confirming all citations are current.', icon: 'cpu', team: 'system' },
      { step: 14, title: 'Final strategic assessment', description: 'Opposition withstands all red team challenges. Contract interpretation argument strongest, pleading standard solid, affirmative defense classification well-supported.', icon: 'brain', team: 'blue', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'assess_risk', output: 'Post-sim assessment: MTD denial probability increased from 60% to 80%' }] },
      { step: 15, title: 'Adversarial simulation complete', description: 'Opposition fortified through 2 attack-defense cycles. All arguments hardened against anticipated Defense Reply.', icon: 'check', team: 'system' },
    ],
  },

  motionForDefault: {
    analysisSteps: [
      { text: 'Confirming service was properly effectuated...', description: 'Verifying proof of service records: Summons and Complaint were personally served on Tech Corp Inc.\'s registered agent on February 20, 2024. Service complies with FRCP 4(h)(1)(B) for service on a corporation.' },
      { text: 'Calculating response deadline expiration...', description: 'Under FRCP 12(a)(1)(A)(i), Defendant had 21 days from service to respond. Service date: February 20, 2024. Deadline: March 13, 2024. As of filing, Defendant has failed to plead or otherwise defend — default is proper under FRCP 55(a).' },
      { text: 'Motion for Entry of Default generated.', description: 'Motion prepared pursuant to FRCP 55(a) requesting the Clerk enter default against Tech Corp Inc. Includes declaration of service, deadline computation, and certification that Defendant has not appeared or responded.' },
    ],
    draft: `PLAINTIFF'S MOTION FOR ENTRY OF DEFAULT

Plaintiff John Doe hereby moves for entry of default against Defendant Tech Corp Inc. pursuant to Federal Rule of Civil Procedure 55(a).

STATEMENT OF FACTS:
1. The Complaint in this action was filed on February 15, 2024.
2. The Summons and Complaint were served on Defendant via personal service on Defendant's registered agent on February 20, 2024.
3. Under Rule 12(a)(1)(A)(i), Defendant's response was due within 21 days of service — by March 13, 2024.
4. As of the date of this motion, Defendant has failed to plead or otherwise defend as required by Rule 12.

WHEREFORE, Plaintiff respectfully requests that the Clerk enter default against Defendant Tech Corp Inc. pursuant to Rule 55(a).`,
  },

  replyToCounterclaim: {
    analysisSteps: [
      { text: "Parsing Defendant's counterclaim allegations...", description: 'Extracting two counts from Defendant\'s Counterclaim: Count I alleges breach of confidentiality under Section 8 of the Employment Agreement based on a January 15, 2024 LinkedIn article. Count II seeks $15,000 reimbursement for AI/ML training costs under Section 9.3.' },
      { text: 'Identifying bases for denial of each count...', description: 'Analyzing each counterclaim paragraph against known facts. Count I: Plaintiff did not disclose confidential information — the LinkedIn article discussed publicly available industry trends. Count II: Section 9.3 reimbursement applies only to voluntary resignation, not involuntary termination.' },
      { text: 'Evaluating potential affirmative defenses to counterclaim...', description: 'Identifying three affirmative defenses: (1) no confidential information was actually disclosed, (2) Section 9.3 is inapplicable to termination without cause per its plain language and Cal. Labor Code § 2802, and (3) the counterclaim was filed in bad faith as retaliation — only 48 hours after Plaintiff initiated suit.' },
      { text: 'Reply to Counterclaim draft ready for review.', description: 'Complete Reply drafted with specific denials for each counterclaim paragraph per FRCP 8(b)(2), three affirmative defenses with supporting authority, and factual bases for each denial addressing the LinkedIn article and training cost provisions.' },
    ],
    draft: `PLAINTIFF'S REPLY TO DEFENDANT'S COUNTERCLAIM

Plaintiff John Doe hereby replies to Defendant's Counterclaim as follows:

AS TO COUNT I — BREACH OF CONFIDENTIALITY:
1. Plaintiff denies the allegations in Counterclaim Paragraph 1. Plaintiff did not disclose any confidential or proprietary information following his termination.
2. Plaintiff admits he had access to certain business information during employment. Plaintiff denies that any such information was disclosed to any competitor or third party.
3. Plaintiff specifically denies any communication with competitors regarding product roadmap information.

AS TO COUNT II — TRAINING COST REIMBURSEMENT:
4. Plaintiff admits receiving professional development training during employment.
5. Plaintiff denies that Section 9.3 of the Agreement requires reimbursement upon termination without cause. Section 9.3 applies only to voluntary resignation within 12 months of training completion.
6. Plaintiff denies owing any sums to Defendant under any theory.

AFFIRMATIVE DEFENSES TO COUNTERCLAIM:
1. Defendant's confidentiality claim fails because Plaintiff has made no disclosures of confidential information.
2. Defendant's training cost claim is barred because Section 9.3 does not apply to involuntary termination.
3. Defendant's counterclaim is asserted in bad faith as a retaliatory measure.`,
    simulationLogs: [
      { step: 1, title: 'Initializing adversarial simulation', description: 'Loading Reply to Counterclaim and case context. Deploying Plaintiff agent team (5 agents).', icon: 'check', team: 'system' },
      { step: 2, title: 'Deploying Defense red team', description: 'Defense agent team initialized to challenge Reply across both counterclaim counts.', icon: 'cpu', team: 'system' },
      { step: 3, title: 'Parsing counterclaim structure', description: 'Mapped reply responses to each counterclaim paragraph. Identified 2 counts and 3 affirmative defenses.', icon: 'scan', team: 'blue', agent: 'extraction', agentLabel: 'Extraction Agent', tools: [{ tool: 'parse_document', input: 'Reply to Counterclaim draft', output: 'Count I: 3 responses (confidentiality). Count II: 3 responses (training). 3 affirmative defenses.' }, { tool: 'extract_entities', output: 'Key entities: LinkedIn article (Jan 15, 2024), Section 8, Section 9.3, $15K training cost' }] },
      { step: 4, title: 'Building timeline of alleged confidentiality breach', description: 'Cross-referencing termination date, LinkedIn activity, and confidentiality obligation period.', icon: 'users', team: 'blue', agent: 'discovery', agentLabel: 'Discovery Analyst', tools: [{ tool: 'build_timeline', input: 'Counterclaim allegations + employment records', output: 'Dec 1 2023: Termination → Jan 15 2024: Alleged LinkedIn post → Section 8 obligation: perpetual' }, { tool: 'catalog_exhibits', output: 'LinkedIn profile archive, employment agreement Section 8, training receipts' }] },
      { step: 5, title: 'Researching FRCP 8(b) denial requirements', description: 'Verifying standards for specific denials vs. general denials in responding to counterclaims.', icon: 'search', team: 'blue', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'search_case_law', input: 'specific denial counterclaim FRCP 8(b)', source: 'CourtListener', output: 'Zielinski v. PPI — specific denial required when party has knowledge of facts' }, { tool: 'search_statutes', input: 'Cal. Labor Code training cost reimbursement involuntary termination', output: 'Cal. Lab. Code § 2802 — employer bears training costs for business benefit' }] },
      { step: 6, title: 'Red team scanning reply for vulnerabilities', description: 'Extraction Agent analyzing each denial for specificity and factual support.', icon: 'scan', team: 'red', agent: 'extraction', agentLabel: 'Extraction Agent', tools: [{ tool: 'parse_document', input: 'Plaintiff Reply to Counterclaim', output: 'Flag: Count I denials are bare — no factual basis for denying LinkedIn activity. Flag: Section 9.3 interpretation needs textual support.' }] },
      { step: 7, title: 'Attack: Confidentiality denial is unsupported', description: 'Defense argues bare denial is insufficient — Plaintiff has not addressed the specific LinkedIn article alleged in Counterclaim Para 3.', icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'Reply Count I, Para 1-3', output: 'Bare denial without addressing specific LinkedIn post is insufficient under FRCP 8(b)(2)' }], detail: 'Red team Discovery Analyst confirmed LinkedIn article exists in public record — Plaintiff must address it specifically, not with blanket denial.' },
      { step: 8, title: 'Strengthened confidentiality denial', description: 'Added specific factual denial: Plaintiff has not posted any company information on LinkedIn or any social platform since termination. Article discussed only publicly available industry trends.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'propose_rebuttal', input: 'Bare denial attack on Count I', output: 'Revised: specific denial of confidential content + affirmative statement that article discussed public information only' }] },
      { step: 9, title: "Attack: Section 9.3 applies to all separations", description: "Defense argues Section 9.3 applies to 'separation from employment for any reason' — not limited to voluntary resignation as Plaintiff claims.", icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'Reply Count II, Para 5', output: 'Textual challenge: "separation from employment" is broader than "voluntary departure" in preceding subsection' }] },
      { step: 10, title: 'Researching training reimbursement authority', description: 'Found California Labor Code authority limiting employer training cost recovery for involuntary terminations.', icon: 'search', team: 'blue', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'search_case_law', input: 'training cost reimbursement involuntary termination California', source: 'CourtListener', output: 'DLSE Opinion Letter 2006.06.06 — training costs for employer benefit not reimbursable upon involuntary termination' }] },
      { step: 11, title: 'Fortified contract interpretation on Section 9.3', description: "Added citation to Section 9.3's full text showing 'voluntary departure' language limits the reimbursement obligation. Added Cal. Labor Code authority.", icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'propose_rebuttal', input: 'Section 9.3 scope attack', output: 'Counter: preceding subsection 9.2 uses "voluntary departure" which limits 9.3 scope; DLSE supports position' }] },
      { step: 12, title: 'Strengthening bad faith affirmative defense', description: 'Added evidence that counterclaim was filed 48 hours after Plaintiff initiated this lawsuit, supporting retaliatory motive.', icon: 'users', team: 'blue', agent: 'discovery', agentLabel: 'Discovery Analyst', tools: [{ tool: 'build_timeline', input: 'Filing dates', output: 'Complaint filed Feb 15 → Counterclaim filed Feb 17 — 48-hour gap suggests retaliation' }] },
      { step: 13, title: 'Final revision loop', description: 'Comprehensive review: each counterclaim allegation specifically addressed with factual basis for denial. All affirmative defenses strengthened.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'revision_loop', input: 'Full reply post-attack', output: 'All denials now specific per FRCP 8(b). Affirmative defenses cite supporting authority.' }] },
      { step: 14, title: 'Final strategic assessment', description: 'Reply withstands red team challenges on both counts. Bad faith defense is strongest affirmative defense.', icon: 'brain', team: 'blue', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'assess_risk', output: 'Counterclaim survival probability reduced: Count I from 50% to 20%, Count II from 40% to 15%' }] },
      { step: 15, title: 'Adversarial simulation complete', description: 'Reply to Counterclaim fortified. All denials specific, all defenses supported by authority.', icon: 'check', team: 'system' },
    ],
  },

  incoming: {
    mtd: `DEFENDANT'S MOTION TO DISMISS PLAINTIFF'S COMPLAINT

Defendant Tech Corp Inc. hereby moves to dismiss Plaintiff's Complaint pursuant to Federal Rule of Civil Procedure 12(b)(6) for failure to state a claim upon which relief can be granted.

MEMORANDUM OF POINTS AND AUTHORITIES

I. INTRODUCTION
Plaintiff brings a single claim for breach of contract based on an alleged failure to pay a performance bonus. However, the Complaint fails to allege any facts demonstrating that Plaintiff met the conditions precedent required to earn the bonus.

II. ARGUMENT
A. The Complaint Fails to Allege Satisfaction of Conditions Precedent
Plaintiff's conclusory allegation that he "fully performed all obligations" is insufficient under Twombly and Iqbal.

B. The Discretionary Nature of the Bonus Precludes a Breach Claim
The Agreement makes the performance bonus discretionary, subject to Board approval.

CONCLUSION
Defendant respectfully requests dismissal of the Complaint in its entirety.`,

    answer: `DEFENDANT'S ANSWER TO PLAINTIFF'S COMPLAINT

1. Defendant admits the allegations in Paragraphs 1-4.
2. Defendant denies the allegations in Paragraph 5. Plaintiff failed to meet Q4 performance metrics.
3. Defendant admits termination occurred on December 1, 2023. Defendant denies it was without cause.
4. Defendant denies the allegations in Paragraph 7.

AFFIRMATIVE DEFENSES
1. Plaintiff's claims are barred by his own material breach.
2. Plaintiff failed to satisfy conditions precedent for the bonus.`,

    counterclaim: `DEFENDANT'S COUNTERCLAIM

COUNT I: BREACH OF CONFIDENTIALITY
Plaintiff disclosed confidential product roadmap information to a competitor following termination, in violation of Section 8 of the Employment Agreement.

COUNT II: REIMBURSEMENT OF TRAINING COSTS
Defendant invested $15,000 in professional development training. Section 9.3 provides for reimbursement if employment terminates within 24 months.

WHEREFORE, Defendant demands judgment of $15,000 plus damages for breach of confidentiality.`,
  },
};

// ─── Defense Data ─────────────────────────────────────────────────────

export const defenseData = {
  holdNotice: {
    analysisSteps: [
      { text: 'Identifying company custodians and data sources...', description: 'Scanning Tech Corp Inc.\'s organizational chart, IT systems, and departmental structure to identify all personnel with access to John Doe\'s employment records, performance data, termination communications, and bonus program documentation.' },
      { text: 'Determining scope of document preservation...', description: 'Defining preservation categories: personnel files, the Employment Agreement and amendments, performance dashboards, HR evaluations, Board minutes on bonus approvals, all electronic communications referencing John Doe, and IT system logs showing Doe\'s access to confidential materials.' },
      { text: 'Litigation hold notice generated.', description: 'Formal preservation notice issued to all identified custodians within Tech Corp Inc. Includes comprehensive scope of materials, prohibition on destruction or modification, and instruction to contact General Counsel with questions.' },
    ],
    draft: `LITIGATION HOLD NOTICE

To: All Relevant Custodians — Tech Corp Inc.
Re: Doe v. Tech Corp Inc. — Document Preservation

Tech Corp Inc. has been named as a defendant in litigation filed by John Doe. You are required to immediately preserve all documents and electronically stored information (ESI) relevant to this matter.

SCOPE OF PRESERVATION:
- John Doe's complete personnel file and employment records
- The employment agreement dated January 15, 2023, and all amendments
- Performance reviews, metrics, dashboards, and evaluations for John Doe
- All communications regarding the termination decision
- Board of Directors minutes related to the bonus program
- All policies related to performance bonuses and at-will employment
- IT system logs showing Doe's access to confidential materials

Do not destroy, delete, modify, or discard any materials within this scope. Contact General Counsel immediately with any questions.

Date: [Auto-generated]
Issued by: Office of the General Counsel, Tech Corp Inc.`,
  },

  complaintAnalysis: {
    analysisSteps: [
      { text: 'Parsing complaint document structure...', description: 'Ingesting Plaintiff\'s Complaint: 8 numbered paragraphs, single cause of action (Breach of Contract), jurisdictional statement citing 28 U.S.C. § 1332 diversity, and prayer for $30,000 plus interest, costs, and attorney\'s fees.' },
      { text: 'Identifying cause of action: Breach of Contract...', description: 'Plaintiff alleges four elements: (1) existence of the Employment Agreement dated January 15, 2023, (2) Plaintiff\'s full performance of all obligations, (3) Defendant\'s breach by failing to pay the $30,000 bonus, and (4) resulting damages.' },
      { text: 'Scanning for jurisdictional and procedural defects...', description: 'Evaluating all seven FRCP 12(b) grounds: subject matter jurisdiction (diversity appears proper), personal jurisdiction (Defendant\'s PPB in California), venue (N.D. Cal. proper under § 1391), process sufficiency, service, failure to state a claim (strongest ground), and party joinder.' },
      { text: 'Running adversarial viability assessment...', description: 'Testing Plaintiff\'s allegations against Iqbal plausibility standard. Key vulnerability: Paragraph 6 ("fully performed all obligations") may be conclusory. Secondary issue: Section 4.2 Board approval language creates discretionary bonus argument under Stockton Mortgage v. Tope.' },
      { text: 'Evaluating strength of Answer vs. Motion to Dismiss...', description: 'Comparing two response strategies. Answer path: admit undisputed facts, specifically deny Paragraphs 5-7 with performance data, assert affirmative defenses. MTD path: challenge pleading sufficiency under 12(b)(6) with Twombly/Iqbal framework. Both paths are viable with distinct risk profiles.' },
      { text: 'Analysis complete. Two viable paths identified.', description: 'Decision point reached. Path A: File Answer with specific denials, affirmative defenses, and optional counterclaim (confidentiality + training costs). Path B: File Motion to Dismiss under 12(b)(6) targeting conclusory allegations and discretionary bonus. Awaiting strategic selection.' },
    ],
  },

  answer: {
    factProcessSteps: [
      { text: 'Isolating factual allegations from paragraphs 1-8...', description: 'Extracting each discrete factual assertion from the Complaint — party identities, jurisdictional facts, agreement execution, compensation terms, performance claims, termination circumstances, and breach allegation — for individual evaluation.' },
      { text: 'Cross-referencing claims with employment agreement terms...', description: 'Comparing Plaintiff\'s allegations against the actual Employment Agreement provisions: Section 4.1 (bonus terms), Section 4.2 (Board approval), Section 7.2 (non-compete), and termination clauses. Identifying discrepancies in Paragraphs 5-7.' },
      { text: 'Classifying each claim by default response (admit/deny)...', description: 'Applying FRCP 8(b) standards to categorize each allegation. Paragraphs 1-4 (identity, jurisdiction, agreement existence, base salary) recommended as admissions. Paragraphs 5-7 (full performance, termination without cause, bonus owed) recommended as specific denials with factual bases.' },
      { text: '7 factual claims ready for review.', description: 'All Complaint allegations classified: 4 recommended admissions and 3 recommended denials. Each denial includes specific factual basis — Q4 performance failures, cause-based termination documentation, and unsatisfied conditions precedent. Ready for attorney review and adjustment.' },
    ],
    facts: [
      { id: 1, text: 'Plaintiff John Doe resides in San Francisco, California.', status: 'admit' as const },
      { id: 2, text: 'Defendant Tech Corp Inc. is a Delaware corporation based in San Jose, CA.', status: 'admit' as const },
      { id: 3, text: 'Parties entered into a written employment agreement on January 15, 2023.', status: 'admit' as const },
      { id: 4, text: 'The agreement included a base salary of $150,000 and a performance bonus.', status: 'admit' as const },
      { id: 5, text: 'Plaintiff fully performed all obligations under the Agreement.', status: 'deny' as const },
      { id: 6, text: 'Defendant terminated Plaintiff without cause on December 1, 2023.', status: 'deny' as const },
      { id: 7, text: 'Defendant failed to pay an earned performance bonus of $30,000.', status: 'deny' as const },
    ],
    draft: `DEFENDANT'S ANSWER TO PLAINTIFF'S COMPLAINT

Defendant Tech Corp Inc. ("Defendant"), by and through its undersigned counsel, hereby answers Plaintiff John Doe's ("Plaintiff") Complaint as follows:

1. Defendant lacks sufficient knowledge or information to form a belief as to the truth of the allegations in Paragraph 1, and therefore denies them.
2. Defendant admits the allegations in Paragraph 2.
3. Defendant admits the allegations in Paragraph 3.
4. Defendant admits the allegations in Paragraph 4.
5. Defendant denies the allegations in Paragraph 5. Plaintiff repeatedly failed to meet Q4 performance metrics outlined in the Agreement, including missing revenue targets by 18% and losing two key client accounts.
6. Defendant denies the allegations in Paragraph 6. Plaintiff's employment was terminated for cause based on documented performance deficiencies and violation of the non-compete provision in Section 7.2.
7. Defendant denies the allegations in Paragraph 7. No bonus was earned because Plaintiff did not satisfy the conditions precedent specified in Section 4.1.

AFFIRMATIVE DEFENSES
1. Plaintiff's claims are barred by his own material breach of the Agreement, including violation of Section 7.2 (non-compete) by soliciting Defendant's clients.
2. Plaintiff failed to satisfy the conditions precedent required to earn the performance bonus, including Board approval under Section 4.2.`,
    simulationLogs: [
      { step: 1, title: 'Initializing adversarial simulation', description: 'Loading Answer draft and case context. Deploying Defense agent team (5 agents).', icon: 'check', team: 'system' },
      { step: 2, title: 'Deploying Prosecution red team', description: 'Plaintiff agent team initialized: Extraction, Lead Counsel, Discovery Analyst, Research, Argument Agent.', icon: 'cpu', team: 'system' },
      { step: 3, title: 'Parsing answer structure', description: 'Mapped 7 paragraph responses (4 admissions, 3 denials) and 2 affirmative defenses.', icon: 'scan', team: 'blue', agent: 'extraction', agentLabel: 'Extraction Agent', tools: [{ tool: 'parse_document', input: 'Answer & Affirmative Defenses draft', output: '7 paragraph responses, 2 affirmative defenses. Denials in Paras 5-7.' }] },
      { step: 4, title: 'Extracting supporting evidence for denials', description: 'Cross-referencing denial assertions with available employment records and performance data.', icon: 'users', team: 'blue', agent: 'discovery', agentLabel: 'Discovery Analyst', tools: [{ tool: 'extract_facts', input: 'Employment records + performance dashboards', output: 'Q4 revenue: -18% vs target. Lost clients: Acme Ltd., GlobalTech. Non-compete violation: client solicitation in Nov 2023.' }, { tool: 'identify_witnesses', output: 'HR Director (performance reviews), VP Sales (revenue data), IT Admin (access logs)' }] },
      { step: 5, title: 'Researching FRCP 8(b) denial requirements', description: 'Verifying standards for specific denials and affirmative defense pleading sufficiency.', icon: 'search', team: 'blue', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'search_case_law', input: 'FRCP 8(b) specific denial requirements affirmative defense', source: 'CourtListener', output: 'Zielinski v. PPI: specific denial required where facts known. FRCP 8(c): affirmative defenses must include factual basis.' }, { tool: 'search_statutes', input: 'California at-will employment termination for cause', output: 'Cal. Lab. Code § 2922 — at-will employment, terminable for cause with documentation' }] },
      { step: 6, title: 'Strategic assessment of answer posture', description: 'Denials in Paras 5-7 are the vulnerable points. Affirmative defenses need factual predicates to survive a motion to strike.', icon: 'brain', team: 'blue', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'build_case_theory', output: 'Defense theory: performance-based termination + non-compete violation = no bonus owed' }, { tool: 'assess_risk', output: 'Para 5 denial risk: high without specifics. Affirmative defense 1 risk: medium without facts.' }] },
      { step: 7, title: 'Red team scanning answer for weaknesses', description: 'Prosecution Extraction Agent parsing each denial and affirmative defense for FRCP 8(b) compliance.', icon: 'scan', team: 'red', agent: 'extraction', agentLabel: 'Extraction Agent', tools: [{ tool: 'parse_document', input: 'Defense Answer draft', output: 'Flag: Para 5 denial is blanket — no specific obligations identified. Flag: Affirmative defense 1 conclusory.' }] },
      { step: 8, title: 'Red team researching waiver precedent', description: 'Finding authority that prior bonus payments without Board approval establish course-of-dealing waiver.', icon: 'search', team: 'red', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'search_case_law', input: 'course of dealing waiver condition precedent bonus', source: 'LexisNexis', output: 'Nanakuli Paving v. Shell Oil — course of dealing can modify express contract terms' }] },
      { step: 9, title: 'Attack: Denial of Para 5 lacks specificity', description: 'Prosecution argues FRCP 8(b) requires specific denials — blanket denial of "full performance" is insufficient without identifying which specific obligations were unmet.', icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'Answer Para 5', output: 'FRCP 8(b)(2): party with knowledge must specifically deny — blanket denial treated as admission' }] },
      { step: 10, title: 'Added specific factual basis to Para 5', description: 'Added reference to Q4 performance metrics: missed revenue targets by 18%, lost two key client accounts (Acme Ltd. and GlobalTech).', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'propose_rebuttal', input: 'Specificity attack on Para 5', output: 'Revised: enumerated 3 specific performance failures with measurable data points' }] },
      { step: 11, title: "Attack: Affirmative defense is conclusory", description: "Prosecution argues 'material breach by Plaintiff' allegation lacks factual support — no facts showing what Plaintiff actually did to breach.", icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'Affirmative Defense 1', output: 'Conclusory: "material breach" without identifying the breach or supporting facts' }], detail: 'Red team Lead Counsel: Motion to strike under FRCP 12(f) is viable if affirmative defense remains conclusory.' },
      { step: 12, title: 'Fortified affirmative defense with facts', description: 'Added factual predicate: Plaintiff violated Section 7.2 non-compete by soliciting client Acme Ltd. during final month of employment.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'propose_rebuttal', input: 'Conclusory affirmative defense attack', output: 'Revised: specific factual allegation citing contract section, client name, and timeline' }] },
      { step: 13, title: 'Attack: Conditions precedent defense may be waived', description: 'Prosecution argues bonus was paid in 2022 without Board approval, establishing course-of-dealing waiver of the condition.', icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'Affirmative Defense 2 — conditions precedent', output: 'Course-of-dealing argument: prior payment without Board approval = waiver under Nanakuli' }] },
      { step: 14, title: 'Distinguished prior bonus payments', description: 'Added allegation distinguishing the 2022 payment as a one-time discretionary award under a different compensation structure than the 2023 contractual bonus.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'revision_loop', input: 'Waiver attack + Affirmative Defense 2', output: 'Revised: 2022 = discretionary holiday bonus; 2023 = performance-based under new agreement Section 4.1' }] },
      { step: 15, title: 'Final consistency review', description: 'All blue team agents verifying denials are specific, affirmative defenses cite contract provisions, and no internal contradictions exist.', icon: 'cpu', team: 'system', detail: 'Research Agent confirming all citations current. Discovery Analyst verifying witness availability.' },
      { step: 16, title: 'Final strategic assessment', description: 'Answer withstands all red team challenges. All denials specific per FRCP 8(b), affirmative defenses survive motion to strike.', icon: 'brain', team: 'blue', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'assess_risk', output: 'Post-sim: motion to strike probability reduced from 60% to 10%. Answer is FRCP 8-compliant.' }] },
      { step: 17, title: 'Adversarial simulation complete', description: 'Answer fortified through 3 attack-defense cycles. All denials specific, all defenses factually supported.', icon: 'check', team: 'system' },
    ],
  },

  counterclaim: {
    analysisSteps: [
      { text: 'Identifying potential counterclaim grounds...', description: 'Analyzing Defendant\'s available claims against Plaintiff: breach of confidentiality (Section 8 — LinkedIn article disclosing product roadmap), training cost reimbursement (Section 9.3 — $15,000 in AI/ML certification), and potential non-compete violations (Section 7.2).' },
      { text: 'Evaluating breach of confidentiality claim viability...', description: 'Assessing Count I elements under California trade secret law and Section 8 of the Agreement. Plaintiff published a LinkedIn article on January 15, 2024 discussing Tech Corp product features. IT access logs confirm Plaintiff accessed confidential folders. Competitor product announcements in February 2024 suggest market harm.' },
      { text: 'Assessing training cost reimbursement under Section 9.3...', description: 'Reviewing Section 9.3 reimbursement clause: $15,000 in specialized AI/ML training completed March 2023. Termination occurred December 1, 2023 — within the 24-month recoupment window. Analyzing whether "separation from employment" language in Section 9.3 covers involuntary termination.' },
      { text: 'Counterclaim draft ready for review.', description: 'Two-count Counterclaim prepared: Count I (Breach of Confidentiality, 4 paragraphs with specific disclosure allegations) and Count II (Training Cost Reimbursement, 4 paragraphs citing Section 9.3 and the 24-month clawback provision). Prayer for $15,000 plus damages.' },
    ],
    draft: `DEFENDANT'S COUNTERCLAIM

Defendant Tech Corp Inc. ("Defendant"), by and through its undersigned counsel, asserts the following counterclaim against Plaintiff John Doe ("Plaintiff"):

COUNT I: BREACH OF CONFIDENTIALITY AGREEMENT
1. During his employment, Plaintiff had access to confidential and proprietary business information, including product roadmaps, client lists, and pricing strategies.
2. Section 8 of the Employment Agreement required Plaintiff to maintain the confidentiality of all proprietary information during and after employment.
3. On or about January 15, 2024, Plaintiff published a LinkedIn article discussing Tech Corp's upcoming product features in sufficient detail to constitute disclosure of confidential information.
4. Upon information and belief, competitors accessed and utilized this information, causing Defendant competitive harm.

COUNT II: REIMBURSEMENT OF TRAINING COSTS
5. During Plaintiff's employment, Defendant invested approximately $15,000 in specialized AI/ML professional development and certification training.
6. Section 9.3 of the Employment Agreement provides for reimbursement of training costs if employment terminates within 24 months of training completion.
7. Plaintiff's employment terminated on December 1, 2023, within 24 months of the training completion date of March 2023.
8. Defendant is entitled to reimbursement of $15,000 in training costs.

WHEREFORE, Defendant demands judgment against Plaintiff for $15,000 in training cost reimbursement, plus compensatory damages for breach of confidentiality to be proven at trial.`,
    simulationLogs: [
      { step: 1, title: 'Initializing adversarial simulation', description: 'Loading Counterclaim draft and case context. Deploying Defense agent team (5 agents).', icon: 'check', team: 'system' },
      { step: 2, title: 'Deploying Prosecution red team', description: 'Plaintiff agent team initialized to challenge Counterclaim across both counts.', icon: 'cpu', team: 'system' },
      { step: 3, title: 'Parsing counterclaim structure', description: 'Extracted 2 counts: Count I (Breach of Confidentiality, 4 paras), Count II (Training Reimbursement, 4 paras).', icon: 'scan', team: 'blue', agent: 'extraction', agentLabel: 'Extraction Agent', tools: [{ tool: 'parse_document', input: 'Counterclaim draft', output: 'Count I: 4 paragraphs (confidentiality breach). Count II: 4 paragraphs (training cost recovery). Prayer: $15K + damages.' }, { tool: 'extract_entities', output: 'Key: LinkedIn article (Jan 15 2024), Section 8, Section 9.3, $15K training, AI/ML certification' }] },
      { step: 4, title: 'Gathering evidence for confidentiality claim', description: 'Cataloging exhibits: LinkedIn article screenshots, IT access logs, competitor market activity post-disclosure.', icon: 'users', team: 'blue', agent: 'discovery', agentLabel: 'Discovery Analyst', tools: [{ tool: 'catalog_exhibits', output: 'Exhibit A: LinkedIn article screenshot. Exhibit B: IT access logs (confidential folder access). Exhibit C: Competitor product announcement (Feb 2024).' }, { tool: 'identify_witnesses', output: 'CTO (confidential info classification), VP Product (roadmap details), IT Admin (access logs)' }] },
      { step: 5, title: 'Researching confidentiality breach elements', description: 'Verifying elements required for breach of confidentiality claim under California trade secret law.', icon: 'search', team: 'blue', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'search_case_law', input: 'breach confidentiality agreement employment California elements', source: 'CourtListener', output: 'Silvaco Data Sys. v. Intel Corp. — must identify specific confidential info with reasonable particularity' }, { tool: 'search_statutes', input: 'Cal. Civ. Code § 3426 trade secret', output: 'CUTSA: requires identification of trade secret and misappropriation — preempts common law claims' }] },
      { step: 6, title: 'Red team scanning counterclaim', description: 'Prosecution Extraction Agent parsing both counts for pleading deficiencies under FRCP 8(a) and Iqbal.', icon: 'scan', team: 'red', agent: 'extraction', agentLabel: 'Extraction Agent', tools: [{ tool: 'parse_document', input: 'Defense Counterclaim', output: 'Flag: Count I Para 4 uses "upon information and belief" — vague. Flag: Count II — Section 9.3 scope ambiguous.' }] },
      { step: 7, title: 'Red team researching counter-authority', description: 'Finding authority that confidentiality claims require specificity and that training reimbursement clauses are disfavored for involuntary terminations.', icon: 'search', team: 'red', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'search_case_law', input: 'upon information and belief insufficient Iqbal', source: 'LexisNexis', output: 'Arista Records v. Doe — "upon information and belief" insufficient for core allegations' }, { tool: 'search_case_law', input: 'training reimbursement involuntary termination unconscionable', output: 'DLSE guidance: training cost recoupment for employer benefit = potential Labor Code violation' }] },
      { step: 8, title: 'Attack: Confidentiality claim lacks specificity', description: 'Prosecution argues counterclaim fails to identify what specific confidential information was disclosed, relying on vague "upon information and belief" language.', icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'Count I, Paras 3-4', output: '"Upon information and belief" is insufficient for core factual allegations per Iqbal — must identify specific trade secrets disclosed' }], detail: 'Red team Lead Counsel: 12(b)(6) motion on Count I is viable if specific confidential information is not identified.' },
      { step: 9, title: 'Added factual specificity to Count I', description: 'Added specific allegations: LinkedIn article discussed unreleased AI integration timeline, Q2 2024 pricing model, and enterprise client pipeline — all classified as confidential under Section 8.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'propose_rebuttal', input: 'Specificity attack on Count I', output: 'Revised: enumerated 3 specific categories of disclosed information with classification under Section 8' }] },
      { step: 10, title: "Attack: Training provision doesn't apply", description: "Prosecution argues Section 9.3 only applies to 'voluntary departure' and Plaintiff was involuntarily terminated. Training was for employer's benefit.", icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'Count II, Paras 5-8', output: 'Two attacks: (1) "voluntary departure" limitation in Section 9.2 limits 9.3; (2) DLSE guidance disfavors recoupment' }] },
      { step: 11, title: 'Strengthened training reimbursement claim', description: "Added analysis distinguishing Section 9.3's 'separation from employment' language from Section 9.2's 'voluntary departure' — broader scope applies.", icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'propose_rebuttal', input: 'Section 9.3 scope attack', output: 'Counter: 9.3 uses distinct "separation" language; training was specialized (AI/ML certification) benefiting employee career' }] },
      { step: 12, title: 'Refining damages allegations', description: 'Strengthened damages specificity: identified three competitor actions traceable to the LinkedIn disclosure with estimated harm.', icon: 'users', team: 'blue', agent: 'discovery', agentLabel: 'Discovery Analyst', tools: [{ tool: 'extract_facts', input: 'Market intelligence reports', output: 'Competitor A launched similar feature (Feb 2024). Competitor B adjusted pricing (Mar 2024). Lost enterprise deal: $200K.' }] },
      { step: 13, title: 'Final revision loop', description: 'All allegations reviewed for Iqbal compliance. Each element of both counts pleaded with supporting factual allegations.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'revision_loop', input: 'Full counterclaim post-attack', output: 'Count I: specific info identified, damages traceable. Count II: textual argument strengthened, alternative basis added.' }] },
      { step: 14, title: 'Final strategic assessment', description: 'Counterclaim withstands red team challenges. Count I significantly strengthened with specificity. Count II viable but weaker.', icon: 'brain', team: 'blue', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'assess_risk', output: 'Post-sim: Count I survival probability 75% (up from 40%). Count II survival probability 55% (up from 30%).' }] },
      { step: 15, title: 'Adversarial simulation complete', description: 'Counterclaim fortified through 2 attack-defense cycles. Both counts hardened against anticipated Plaintiff challenges.', icon: 'check', team: 'system' },
    ],
  },

  mtd: {
    defectScanSteps: [
      { text: 'Analyzing subject matter jurisdiction — 12(b)(1)...', description: 'Testing diversity jurisdiction under 28 U.S.C. § 1332: Plaintiff (California citizen) vs. Defendant (Delaware incorporation, California PPB). Amount-in-controversy: $30,000 bonus claim alone may be below $75,000 threshold — but interest and fees may cure. Viability: low (15%).' },
      { text: 'Checking personal jurisdiction — 12(b)(2)...', description: 'Defendant\'s principal place of business is San Jose, California — general jurisdiction is established in the Northern District. No basis to challenge personal jurisdiction. Viability: very low (10%).' },
      { text: 'Evaluating venue propriety — 12(b)(3)...', description: 'Under 28 U.S.C. § 1391, venue is proper where any defendant resides (N.D. Cal.) or where a substantial part of events occurred (employment and termination in California). No viable venue challenge. Viability: minimal (8%).' },
      { text: 'Reviewing sufficiency of process — 12(b)(4)...', description: 'Examining the Summons and Complaint for compliance with FRCP 4(a) requirements — proper court identification, party names, response deadline, and clerk signature. No apparent defects in the issued process. Viability: negligible (5%).' },
      { text: 'Checking service of process — 12(b)(5)...', description: 'Service was executed on Tech Corp\'s registered agent via personal delivery per FRCP 4(h)(1)(B). Service method and timing appear proper. No basis to challenge. Viability: negligible (5%).' },
      { text: 'Assessing failure to state a claim — 12(b)(6)...', description: 'Strongest ground identified. Complaint Paragraph 6 ("fully performed all obligations") is potentially conclusory under Iqbal. Section 4.2 Board approval clause creates a discretionary bonus argument per Stockton Mortgage v. Tope. Both attack vectors support a 12(b)(6) motion. Viability: high (78%).' },
      { text: 'Checking required party joinder — 12(b)(7)...', description: 'Evaluating whether any indispensable parties are missing under FRCP 19. The dispute is bilateral between Doe and Tech Corp — no third parties necessary for complete relief. Board members are not required parties. Viability: low (12%).' },
      { text: 'Defect scan complete. Viable grounds identified.', description: 'Full 12(b) scan complete across all seven grounds. One viable motion ground: 12(b)(6) failure to state a claim (78% viability). All other grounds fall below actionable threshold. Recommending Motion to Dismiss focused exclusively on 12(b)(6) with Twombly/Iqbal framework.' },
    ],
    grounds: [
      { rule: '12(b)(1)', name: 'Lack of Subject Matter Jurisdiction', viability: 15, rationale: 'Diversity jurisdiction appears proper — parties are diverse and amount-in-controversy exceeds $75,000.' },
      { rule: '12(b)(2)', name: 'Lack of Personal Jurisdiction', viability: 10, rationale: "Defendant's principal place of business is in California — personal jurisdiction is established." },
      { rule: '12(b)(3)', name: 'Improper Venue', viability: 8, rationale: 'Northern District of California is proper venue under 28 U.S.C. § 1391.' },
      { rule: '12(b)(4)', name: 'Insufficient Process', viability: 5, rationale: 'No apparent defects in the summons or complaint form.' },
      { rule: '12(b)(5)', name: 'Insufficient Service of Process', viability: 5, rationale: 'Service appears properly executed on registered agent.' },
      { rule: '12(b)(6)', name: 'Failure to State a Claim', viability: 78, rationale: 'Complaint fails to plead satisfaction of conditions precedent for bonus — conclusory allegation of full performance insufficient under Twombly/Iqbal.' },
      { rule: '12(b)(7)', name: 'Failure to Join Required Party', viability: 12, rationale: 'No obviously missing indispensable parties.' },
    ],
    caseLawResearchSteps: [
      { text: 'Searching pleading standard precedent...', description: 'Querying CourtListener and LexisNexis for FRCP 12(b)(6) authority on pleading standards. Retrieving foundational cases: Bell Atlantic v. Twombly (550 U.S. 544) establishing the plausibility standard and retiring the Conley "no set of facts" test.' },
      { text: 'Analyzing Twombly/Iqbal framework for breach of contract claims...', description: 'Applying Ashcroft v. Iqbal (556 U.S. 662) two-step analysis: (1) identify and discard conclusory statements, (2) assess whether remaining factual allegations plausibly state a claim. Mapping Plaintiff\'s "fully performed" allegation to Iqbal\'s "threadbare recitals" category.' },
      { text: 'Researching California bonus condition cases...', description: 'Retrieving California-specific authority on conditional bonus provisions. Key finding: Stockton Mortgage v. Tope (233 Cal.App.4th 437, 2014) — bonus conditioned on board or management approval is discretionary. Also analyzing Otworth v. Southern Pac. Transp. Co. (166 Cal.App.3d 452) on conditions precedent pleading requirements.' },
      { text: 'Compiling supporting citations...', description: 'Organizing retrieved authority into the brief\'s argument structure: Twombly/Iqbal for Section A (pleading standard), Otworth for conditions precedent specificity, Stockton Mortgage for Section B (discretionary bonus), and Lee v. City of L.A. for judicial notice of the Employment Agreement.' },
      { text: 'Case law research complete.', description: 'Four primary authorities compiled with relevance scores: Twombly (95%), Iqbal (92%), Otworth (85%), Stockton Mortgage (78%). All citations verified as current good law with no adverse subsequent history. Research package ready for integration into the Motion to Dismiss.' },
    ],
    caseLaw: [
      { name: 'Bell Atlantic Corp. v. Twombly', citation: '550 U.S. 544 (2007)', relevance: 95, summary: 'Complaint must contain sufficient factual matter to state a claim that is plausible on its face — formulaic recitation of elements insufficient.' },
      { name: 'Ashcroft v. Iqbal', citation: '556 U.S. 662 (2009)', relevance: 92, summary: 'Court must distinguish between well-pleaded factual allegations (accepted as true) and conclusory statements (not entitled to presumption of truth).' },
      { name: 'Otworth v. Southern Pac. Transp. Co.', citation: '166 Cal.App.3d 452 (1985)', relevance: 85, summary: 'Conditions precedent must be specifically pleaded — general allegation of performance is insufficient when contract specifies particular conditions.' },
      { name: 'Stockton Mortgage v. Tope', citation: '233 Cal.App.4th 437 (2014)', relevance: 78, summary: 'Bonus provisions conditioned on management or board approval are discretionary and not enforceable as mandatory contract terms.' },
    ],
    draft: `DEFENDANT'S MOTION TO DISMISS PLAINTIFF'S COMPLAINT

Defendant Tech Corp Inc. ("Defendant"), by and through its undersigned counsel, hereby moves to dismiss Plaintiff John Doe's ("Plaintiff") Complaint pursuant to Federal Rule of Civil Procedure 12(b)(6) for failure to state a claim upon which relief can be granted.

MEMORANDUM OF POINTS AND AUTHORITIES

I. INTRODUCTION
Plaintiff brings a single claim for breach of contract based on an alleged failure to pay a performance bonus. However, the Complaint fails to allege any facts demonstrating that Plaintiff met the conditions precedent required to earn the bonus under the express terms of the employment agreement.

II. ARGUMENT

A. The Complaint Fails to Allege Satisfaction of Conditions Precedent
Under California law, a plaintiff asserting a breach of contract claim based on a conditional obligation must plead satisfaction or excuse of the condition. Otworth v. Southern Pac. Transp. Co., 166 Cal.App.3d 452 (1985). Plaintiff's conclusory allegation that he "fully performed all obligations" is insufficient under Twombly and Iqbal to establish that he met the specific, objective performance metrics required for the discretionary bonus.

B. The Discretionary Nature of the Bonus Precludes a Breach Claim
The Employment Agreement Section 4.2 explicitly makes the performance bonus "subject to final approval by the Board of Directors." Courts routinely hold that bonus provisions conditioned on management approval are discretionary. Stockton Mortgage v. Tope, 233 Cal.App.4th 437 (2014).

C. Dismissal Should Be With Prejudice
Because the Agreement itself establishes the discretionary nature of the bonus, no amendment to the Complaint can cure this deficiency. Amendment would be futile, and dismissal should be with prejudice.

III. CONCLUSION
For the foregoing reasons, Defendant respectfully requests that the Court dismiss Plaintiff's Complaint in its entirety with prejudice.`,
    simulationLogs: [
      { step: 1, title: 'Initializing adversarial simulation', description: 'Loading Motion to Dismiss and case context. Deploying Defense agent team (5 agents).', icon: 'check', team: 'system' },
      { step: 2, title: 'Deploying Prosecution red team', description: 'Plaintiff agent team initialized to challenge MTD arguments and prepare opposition strategy.', icon: 'cpu', team: 'system' },
      { step: 3, title: 'Parsing MTD argument structure', description: 'Extracted 3 main arguments: (A) failure to allege conditions precedent, (B) discretionary bonus, (C) dismissal with prejudice.', icon: 'scan', team: 'blue', agent: 'extraction', agentLabel: 'Extraction Agent', tools: [{ tool: 'parse_document', input: 'Motion to Dismiss draft', output: 'Sections: Introduction, Argument A (conditions precedent), Argument B (discretionary bonus), Argument C (with prejudice), Conclusion' }, { tool: 'structure_claims', output: 'Primary ground: 12(b)(6). Supporting: Twombly/Iqbal framework + Stockton Mortgage precedent.' }] },
      { step: 4, title: 'Verifying case law citations', description: 'Confirming all cited authority is current, not overruled, and accurately characterized in the brief.', icon: 'search', team: 'blue', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'verify_citations', input: 'Twombly 550 U.S. 544, Iqbal 556 U.S. 662, Otworth 166 Cal.App.3d 452, Stockton Mortgage 233 Cal.App.4th 437', output: 'All citations current and good law. Stockton Mortgage: affirmed, no subsequent adverse history.' }, { tool: 'search_case_law', input: 'judicial notice employment agreement 12(b)(6)', source: 'CourtListener', output: 'Lee v. City of L.A. — court may take judicial notice of documents referenced in complaint' }] },
      { step: 5, title: 'Strategic assessment of MTD arguments', description: 'Argument A (conclusory performance) is strongest. Argument B (discretionary bonus) is moderate. Argument C (with prejudice) is aggressive but defensible.', icon: 'brain', team: 'blue', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'assess_risk', output: 'Arg A success: 65%. Arg B success: 50%. Arg C (w/ prejudice): 35% — judge may grant leave to amend instead.' }, { tool: 'set_strategy', output: 'Lead with Iqbal insufficiency (strongest), build toward with-prejudice through futility argument.' }] },
      { step: 6, title: 'Red team Extraction Agent scanning MTD', description: 'Prosecution Extraction Agent analyzing each argument section for logical gaps and overstatements.', icon: 'scan', team: 'red', agent: 'extraction', agentLabel: 'Extraction Agent', tools: [{ tool: 'parse_document', input: 'Defense MTD', output: 'Flag: Arg A may fail if court treats "fully performed" as factual. Flag: Arg B — "shall" vs "sole discretion" is genuinely ambiguous.' }] },
      { step: 7, title: 'Red team researching pro-plaintiff authority', description: 'Finding authority that performance allegations are factual and "shall" language is mandatory.', icon: 'search', team: 'red', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'search_case_law', input: '"fully performed" factual allegation accepted as true 12(b)(6)', source: 'LexisNexis', output: 'Erickson v. Pardus, 551 U.S. 89 — specific facts not required, just plausible entitlement to relief' }, { tool: 'analyze_precedent', input: '"shall be paid" mandatory obligation California', output: 'Cal. Civ. Code § 14: "shall" is mandatory unless context indicates otherwise' }] },
      { step: 8, title: 'Attack: Complaint adequately pleads performance', description: 'Prosecution argues "fully performed all obligations" is a factual allegation the Court must accept as true at the pleading stage, not a legal conclusion.', icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'MTD Argument A', output: 'Counter: Erickson v. Pardus — at pleading stage, court accepts well-pleaded facts as true. "Fully performed" is factual.' }], detail: 'Red team Lead Counsel assessment: this is the strongest counter-argument. Success depends on whether judge reads Para 6 as factual or conclusory.' },
      { step: 9, title: 'Reinforced Iqbal distinction', description: 'Strengthened distinction between factual allegations and legal conclusions per Iqbal — bare assertion of "full performance" without specific metrics is exactly the type of conclusory allegation Iqbal rejected.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'propose_rebuttal', input: 'Performance allegation attack', output: 'Rebuttal: Iqbal at 678 — "threadbare recitals" insufficient. "Fully performed" = legal conclusion, not factual allegation.' }] },
      { step: 10, title: "Attack: 'Shall' language is mandatory", description: "Prosecution argues Section 4.1 'shall be paid' is mandatory under Cal. Civ. Code § 14 — Board approval in Section 4.2 is merely procedural.", icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'MTD Argument B', output: 'Counter: "shall" = mandatory per § 14; "subject to Board approval" is procedural formality, not discretionary gate' }] },
      { step: 11, title: 'Fortified contract interpretation', description: "Added full text of Section 4.2: 'in its sole discretion' — 'sole discretion' language defeats mandatory reading regardless of 'shall' in Section 4.1.", icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'propose_rebuttal', input: '"Shall" mandatory attack', output: 'Counter: "sole discretion" in 4.2 is express discretionary language — trumps "shall" in 4.1 when read together' }] },
      { step: 12, title: 'Red team probing with-prejudice argument', description: 'Prosecution challenging whether dismissal with prejudice is appropriate given potential for curative amendment.', icon: 'brain', team: 'red', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'assess_risk', output: 'With-prejudice argument weak: courts routinely grant leave to amend on first MTD. Must establish futility.' }] },
      { step: 13, title: 'Added futility and judicial notice arguments', description: 'Incorporated futility argument and request for judicial notice of the Employment Agreement under FRE 201 — no amendment can change the contract terms.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'revision_loop', input: 'With-prejudice argument + judicial notice', output: 'Added: judicial notice request + futility analysis showing contract language is unambiguous' }] },
      { step: 14, title: 'Final consistency review', description: 'All blue team agents performing parallel final checks. Research Agent verifying citations, Lead Counsel checking argument flow.', icon: 'cpu', team: 'system', detail: 'Discovery Analyst confirmed no extrinsic evidence needed — all arguments based on complaint face and contract language.' },
      { step: 15, title: 'Final strategic assessment', description: 'MTD withstands opposition challenges. Iqbal argument strongest, contract interpretation solid, with-prejudice argument bolstered by futility analysis.', icon: 'brain', team: 'blue', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'assess_risk', output: 'Post-sim: MTD grant probability increased from 40% to 60%. With-prejudice probability: 30% (up from 15%).' }] },
      { step: 16, title: 'Adversarial simulation complete', description: 'Motion to Dismiss fortified through 2 attack-defense cycles across 3 argument sections. Ready for filing.', icon: 'check', team: 'system' },
    ],
  },

  replyInSupport: {
    analysisSteps: [
      { text: "Parsing Plaintiff's Opposition to Motion to Dismiss...", description: 'Ingesting Plaintiff\'s Opposition brief. Extracting three argument sections: (A) Complaint satisfies Twombly/Iqbal, (B) bonus is mandatory under "shall be paid" language in Section 4.1, and (C) Board approval is an affirmative defense under FRCP 8(c), not a pleading deficiency.' },
      { text: 'Identifying concessions and admissions in opposition...', description: 'Analyzing Opposition for implicit concessions. Key findings: Plaintiff does not dispute that the Board approval clause exists in Section 4.2, does not dispute the "sole discretion" language, and does not offer alternative contract interpretation for the conditional structure.' },
      { text: 'Evaluating new arguments raised in opposition...', description: 'Assessing Plaintiff\'s reliance on Cal. Civ. Code § 1654 (ambiguity construed against drafter). Preparing counter: this canon applies only to genuinely ambiguous terms — "sole discretion" is unambiguous. Also evaluating FRCP 8(c) classification argument and its limitations.' },
      { text: 'Preparing point-by-point rebuttal...', description: 'Constructing four-section Reply: (A) "fully performed" is conclusory per Iqbal with specific analogy, (B) plain language of "sole discretion" defeats mandatory reading citing Winet v. Price, (C) § 1654 is inapplicable to unambiguous terms, and (D) dismissal should be with prejudice because amendment is futile.' },
      { text: 'Reply in Support draft ready for review.', description: 'Complete Reply in Support of Motion to Dismiss drafted with responsive arguments to each Opposition section, new authority (Winet v. Price on unambiguous "sole discretion"), futility argument for with-prejudice dismissal, and request for judicial notice of the Employment Agreement.' },
    ],
    draft: `DEFENDANT'S REPLY IN SUPPORT OF MOTION TO DISMISS

I. INTRODUCTION
Plaintiff's Opposition fails to address the fundamental deficiency in the Complaint: the absence of any factual allegations demonstrating satisfaction of the express conditions precedent for the performance bonus.

II. ARGUMENT

A. "Fully Performed" Is a Legal Conclusion, Not a Factual Allegation
Plaintiff argues that the allegation of "full performance" must be accepted as true. However, Iqbal requires the Court to distinguish between factual allegations and legal conclusions. The bare assertion of "full performance" without identifying any specific metric achieved is precisely the type of conclusory allegation that Iqbal holds is not entitled to the presumption of truth. 556 U.S. at 678.

B. The Agreement's Plain Language Makes the Bonus Discretionary
Plaintiff misreads Section 4.1 in isolation. When read together with Section 4.2, the bonus is expressly "subject to final approval by the Board of Directors in its sole discretion." The phrase "sole discretion" is unambiguous and defeats Plaintiff's mandatory reading. See Stockton Mortgage, 233 Cal.App.4th at 445.

C. California Contract Interpretation Canons Do Not Help Plaintiff
Plaintiff invokes Civil Code § 1654 (ambiguity construed against drafter). But this canon applies only when the contract is genuinely ambiguous. "Sole discretion" is not ambiguous — it is an express grant of discretionary authority that precludes a breach claim.

D. Dismissal Should Be With Prejudice
Plaintiff has not requested leave to amend, nor could amendment cure the deficiency. The Employment Agreement — which the Court may judicially notice — establishes that the bonus was discretionary. No amount of factual amendment changes the contract terms.

III. CONCLUSION
Defendant respectfully requests that the Court grant its Motion to Dismiss with prejudice.`,
    simulationLogs: [
      { step: 1, title: 'Initializing adversarial simulation', description: 'Loading Reply in Support of MTD and Opposition context. Deploying Defense agent team (5 agents).', icon: 'check', team: 'system' },
      { step: 2, title: 'Deploying Prosecution red team', description: 'Plaintiff agent team initialized to simulate hearing-level challenges to the Reply brief.', icon: 'cpu', team: 'system' },
      { step: 3, title: 'Parsing reply argument structure', description: "Extracted 4 sections: (A) 'fully performed' is conclusory, (B) plain language discretionary, (C) § 1654 inapplicable, (D) dismissal with prejudice.", icon: 'scan', team: 'blue', agent: 'extraction', agentLabel: 'Extraction Agent', tools: [{ tool: 'parse_document', input: 'Reply in Support draft', output: '4 argument sections mapped to Opposition points. Each section includes responsive authority.' }, { tool: 'structure_claims', output: 'Reply addresses all 3 opposition arguments + adds futility argument for with-prejudice dismissal.' }] },
      { step: 4, title: 'Analyzing concessions in Opposition brief', description: 'Identified implicit concessions: Opposition does not dispute Board approval language exists, only disputes its legal effect.', icon: 'users', team: 'blue', agent: 'discovery', agentLabel: 'Discovery Analyst', tools: [{ tool: 'extract_facts', input: 'Plaintiff Opposition brief', output: 'Concession 1: Opposition admits Board approval clause exists. Concession 2: Does not dispute "sole discretion" language.' }] },
      { step: 5, title: 'Researching reply-stage authority', description: 'Finding cases where courts rejected ambiguity arguments when contract contained "sole discretion" language.', icon: 'search', team: 'blue', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'search_case_law', input: '"sole discretion" unambiguous contract bonus', source: 'CourtListener', output: 'Winet v. Price, 4 Cal.App.4th 1159 — "sole discretion" is clear and unambiguous, no construction needed' }, { tool: 'verify_citations', input: 'Stockton Mortgage v. Tope — still good law?', output: 'Confirmed: good law, cited positively 12 times since 2014, no adverse history' }] },
      { step: 6, title: 'Red team preparing hearing-level attacks', description: 'Prosecution Lead Counsel strategizing oral argument challenges that a judge would ask at the MTD hearing.', icon: 'brain', team: 'red', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'build_case_theory', output: 'Hearing strategy: (1) Challenge Iqbal analogy, (2) Argue industry practice on Board approval, (3) Request leave to amend as fallback' }, { tool: 'set_strategy', output: 'Primary goal: preserve complaint. Fallback: obtain leave to amend with specificity.' }] },
      { step: 7, title: 'Red team researching hearing counter-points', description: 'Finding cases where courts accepted "fully performed" as sufficient factual allegation at pleading stage.', icon: 'search', team: 'red', agent: 'research', agentLabel: 'Research Agent', tools: [{ tool: 'search_case_law', input: '"fully performed" sufficient allegation contract breach', source: 'LexisNexis', output: 'Careau & Co. v. Security Pacific Business Credit — general allegation of performance may suffice where specific metrics not contractually required' }] },
      { step: 8, title: 'Attack: Iqbal distinction is misapplied', description: "Prosecution argues 'fully performed' is analogous to accepted factual allegations — similar to 'Defendant breached the contract' which courts routinely deem sufficient.", icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'Reply Section A — Iqbal analysis', output: 'Counter: Iqbal distinguishes between ultimate facts and evidentiary facts — "fully performed" is an ultimate fact, sufficient at pleading stage' }], detail: 'Red team cites Careau & Co. — general performance allegation sufficient where contract does not require specific metric recitation in pleading.' },
      { step: 9, title: 'Refined Iqbal analysis with specific examples', description: "Added direct comparison to Iqbal's own examples: 'Defendant discriminated' (conclusory) vs. 'Defendant fired plaintiff after learning of her pregnancy' (factual).", icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'propose_rebuttal', input: 'Iqbal misapplication attack', output: 'Rebuttal: "fully performed" without any metric = more like "discriminated" than specific factual allegation. Iqbal requires factual enhancement.' }] },
      { step: 10, title: "Attack: Board approval is industry formality", description: "Prosecution argues industry practice shows 'Board approval' clauses for bonuses are ministerial rubber-stamps, not genuine discretionary gates.", icon: 'swords', team: 'red', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'critique_argument', input: 'Reply Section B — plain language', output: 'Counter: industry practice evidence admissible to interpret "sole discretion" — may not be as absolute as Defense claims' }] },
      { step: 11, title: 'Strengthened plain language argument', description: 'Added argument that parol evidence of "industry practice" cannot override unambiguous contract language at the pleading stage. Cited Winet v. Price.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'propose_rebuttal', input: 'Industry practice attack', output: 'Counter: parol evidence rule bars industry practice to contradict "sole discretion" — Winet: unambiguous = no extrinsic evidence' }] },
      { step: 12, title: 'Anticipating bench questions on leave to amend', description: 'Preparing responses for the three most likely judicial questions at the hearing.', icon: 'brain', team: 'blue', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'build_case_theory', output: 'Prepared responses: Q1 (leave to amend → futility), Q2 (contract interpretation → plain language), Q3 (Twombly standard → plausibility analysis)' }], detail: 'Lead Counsel directed Argument Agent to prepare 60-second oral responses for each anticipated question.' },
      { step: 13, title: 'Generating hearing talking points', description: 'Compiled concise rebuttals for top 3 bench questions: futility of amendment, contract interpretation, and applicable pleading standard.', icon: 'shield', team: 'blue', agent: 'adversarial', agentLabel: 'Argument Agent', tools: [{ tool: 'revision_loop', input: 'Full reply + hearing prep', output: 'Reply finalized. 3 talking points generated. All arguments internally consistent.' }] },
      { step: 14, title: 'Final strategic assessment', description: 'Reply withstands hearing-level scrutiny. Plain language argument is airtight. Iqbal argument strengthened with specific examples. Hearing prep complete.', icon: 'brain', team: 'blue', agent: 'lead-counsel', agentLabel: 'Lead Counsel', tools: [{ tool: 'assess_risk', output: 'Post-sim: MTD grant probability stable at 60%. Hearing preparation significantly improved — all likely bench questions addressed.' }] },
      { step: 15, title: 'Adversarial simulation complete', description: 'Reply in Support fortified for hearing presentation. All arguments hardened against oral challenge. Final draft ready.', icon: 'check', team: 'system' },
    ],
  },

  incoming: {
    complaint: `IN THE UNITED STATES DISTRICT COURT
FOR THE NORTHERN DISTRICT OF CALIFORNIA

JOHN DOE, Plaintiff,
v.
TECH CORP INC., Defendant.

COMPLAINT FOR BREACH OF CONTRACT

1. Plaintiff John Doe resides in San Francisco, California.
2. Defendant Tech Corp Inc. is a Delaware corporation with PPB in San Jose, California.
3. On January 15, 2023, the parties entered into a written employment agreement.
4. Defendant agreed to pay a base salary of $150,000 plus a performance bonus.
5. Plaintiff fully performed all obligations required under the Agreement.
6. On December 1, 2023, Defendant terminated Plaintiff without cause and failed to pay the earned bonus of $30,000.
7. Defendant's failure to pay constitutes a material breach.

WHEREFORE, Plaintiff prays for $30,000 plus interest, costs, and attorney's fees.`,

    oppositionToMTD: `PLAINTIFF'S OPPOSITION TO DEFENDANT'S MOTION TO DISMISS

Plaintiff opposes Defendant's Motion. The Complaint satisfies Twombly/Iqbal by alleging: (1) a contract existed, (2) Plaintiff performed, (3) Defendant breached, and (4) damages resulted.

The allegation of "full performance" is a factual allegation that must be accepted as true. The bonus was mandatory under Section 4.1 ("shall be paid"). Board approval under Section 4.2 is an affirmative defense, not a pleading deficiency.

Plaintiff requests denial of the Motion to Dismiss.`,
  },
};
