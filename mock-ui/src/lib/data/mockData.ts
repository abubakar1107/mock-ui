export type AnalysisStep = { text: string };

export type SimulationLog = {
  step: number;
  title: string;
  description: string;
  icon: 'check' | 'cpu' | 'file' | 'swords' | 'shield';
  actor: 'system' | 'opponent' | 'agent';
};

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
      { text: 'Identifying parties and relevant custodians...' },
      { text: 'Determining scope of preservation obligations...' },
      { text: 'Litigation hold notice generated.' },
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
      { text: 'Reviewing employment agreement terms...' },
      { text: 'Calculating damages and potential recovery...' },
      { text: 'Assessing pre-suit leverage and settlement posture...' },
      { text: 'Demand letter generated.' },
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
      { text: 'Identifying viable causes of action...' },
      { text: 'Verifying subject matter and personal jurisdiction...' },
      { text: 'Checking statute of limitations compliance...' },
      { text: 'Drafting factual allegations with specificity...' },
      { text: 'Assessing pleading sufficiency under Twombly/Iqbal...' },
      { text: 'Complaint draft ready for review.' },
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
      { step: 1, title: 'Initializing red team simulation', description: 'Loading complaint and case context for adversarial testing.', icon: 'check', actor: 'system' },
      { step: 2, title: 'Deploying Defense red team', description: 'Defense attorney agents initialized to attack your Complaint.', icon: 'cpu', actor: 'system' },
      { step: 3, title: 'Defense reviewing Complaint', description: 'Defense counsel is analyzing each paragraph for 12(b)(6) weaknesses.', icon: 'file', actor: 'opponent' },
      { step: 4, title: 'Defense attacked: Performance allegation conclusory', description: "Defense argues Paragraph 6 — 'fully performed all obligations' — lacks factual specificity under Iqbal. A bare conclusory allegation of performance is insufficient.", icon: 'swords', actor: 'opponent' },
      { step: 5, title: 'Agent fortified Paragraph 6', description: 'Added specific performance metrics: Q1-Q3 revenue targets exceeded by 12%, client retention above 95%, all project deadlines met.', icon: 'shield', actor: 'agent' },
      { step: 6, title: 'Defense attacked: Bonus may be discretionary', description: 'Defense argues the bonus is subject to Board approval per Section 4.2, making it discretionary rather than contractually mandatory.', icon: 'swords', actor: 'opponent' },
      { step: 7, title: 'Agent strengthened bonus argument', description: "Added allegation that bonus was guaranteed upon meeting objective metrics per Section 4.1, and Board approval was ministerial, not discretionary.", icon: 'shield', actor: 'agent' },
      { step: 8, title: 'Running edge-case scenarios', description: 'Testing complaint against 12(b)(1)-(3) challenges and statute of limitations defenses.', icon: 'cpu', actor: 'system' },
      { step: 9, title: 'Refining jurisdictional allegations', description: 'Strengthened diversity jurisdiction allegations with specific citizenship and amount-in-controversy facts.', icon: 'file', actor: 'agent' },
      { step: 10, title: 'Fortifying against MTD vulnerabilities', description: 'Enhanced factual specificity throughout to exceed Twombly/Iqbal plausibility threshold.', icon: 'shield', actor: 'agent' },
      { step: 11, title: 'Red team simulation complete', description: 'Complaint fortified against anticipated defense challenges. Final draft ready.', icon: 'check', actor: 'system' },
    ],
  },

  coverSheet: {
    analysisSteps: [
      { text: 'Extracting case information for JS-44 form...' },
      { text: 'Classifying cause of action and jurisdiction basis...' },
      { text: 'Civil Cover Sheet generated.' },
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
      { text: "Parsing Defendant's Motion to Dismiss..." },
      { text: 'Identifying 12(b) grounds asserted by Defendant...' },
      { text: 'Researching counter-precedent for each ground...' },
      { text: 'Evaluating strength of each opposition argument...' },
      { text: 'Opposition draft ready for review.' },
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
      { step: 1, title: 'Initializing red team simulation', description: 'Loading opposition brief and case context.', icon: 'check', actor: 'system' },
      { step: 2, title: 'Deploying Defense red team', description: 'Defense attorney agents will challenge your Opposition to MTD.', icon: 'cpu', actor: 'system' },
      { step: 3, title: 'Defense reviewing Opposition', description: 'Defense counsel analyzing each opposition argument.', icon: 'file', actor: 'opponent' },
      { step: 4, title: 'Defense attacked: Rule 8 reliance outdated', description: 'Defense argues reliance on pre-Twombly notice pleading is insufficient; post-Iqbal standard requires factual plausibility, not mere possibility.', icon: 'swords', actor: 'opponent' },
      { step: 5, title: 'Agent reinforced pleading standard', description: 'Added analysis showing Complaint satisfies both Twombly plausibility AND Iqbal factual specificity with enumerated performance metrics.', icon: 'shield', actor: 'agent' },
      { step: 6, title: "Defense attacked: 'Shall' interpretation flawed", description: "Defense argues 'shall be paid subject to Board approval' creates a condition precedent, not a mandatory obligation.", icon: 'swords', actor: 'opponent' },
      { step: 7, title: 'Agent strengthened contract argument', description: 'Added citation to California contract interpretation canons favoring employee in ambiguous provisions (Civ. Code § 1654).', icon: 'shield', actor: 'agent' },
      { step: 8, title: 'Testing edge cases', description: 'Evaluating opposition against potential Reply in Support arguments.', icon: 'cpu', actor: 'system' },
      { step: 9, title: 'Refining case law citations', description: 'Added additional California authority supporting mandatory bonus interpretation under similar contract language.', icon: 'file', actor: 'agent' },
      { step: 10, title: 'Fortifying affirmative defense argument', description: 'Strengthened argument that Board approval is an affirmative defense under FRCP 8(c), not a pleading deficiency.', icon: 'shield', actor: 'agent' },
      { step: 11, title: 'Red team simulation complete', description: 'Opposition fortified against Defense Reply arguments. Final draft ready.', icon: 'check', actor: 'system' },
    ],
  },

  motionForDefault: {
    analysisSteps: [
      { text: 'Confirming service was properly effectuated...' },
      { text: 'Calculating response deadline expiration...' },
      { text: 'Motion for Entry of Default generated.' },
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
      { text: "Parsing Defendant's counterclaim allegations..." },
      { text: 'Identifying bases for denial of each count...' },
      { text: 'Evaluating potential affirmative defenses to counterclaim...' },
      { text: 'Reply to Counterclaim draft ready for review.' },
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
      { step: 1, title: 'Initializing red team simulation', description: 'Loading reply to counterclaim and case context.', icon: 'check', actor: 'system' },
      { step: 2, title: 'Deploying Defense red team', description: 'Defense attorney agents will challenge your Reply to Counterclaim.', icon: 'cpu', actor: 'system' },
      { step: 3, title: 'Defense reviewing Reply', description: 'Defense counsel analyzing each reply response.', icon: 'file', actor: 'opponent' },
      { step: 4, title: 'Defense attacked: Confidentiality denial unsupported', description: 'Defense argues bare denial is insufficient — Plaintiff has not addressed the specific LinkedIn activity alleged in the counterclaim.', icon: 'swords', actor: 'opponent' },
      { step: 5, title: 'Agent strengthened denial', description: 'Added specific factual denial: Plaintiff has not posted any company information on LinkedIn or any social platform since termination.', icon: 'shield', actor: 'agent' },
      { step: 6, title: 'Defense attacked: Section 9.3 interpretation wrong', description: "Defense argues Section 9.3 applies to 'separation for any reason' — not limited to voluntary resignation.", icon: 'swords', actor: 'opponent' },
      { step: 7, title: 'Agent fortified contract interpretation', description: "Added citation to Section 9.3's full text showing the phrase 'voluntary departure' limits the reimbursement obligation.", icon: 'shield', actor: 'agent' },
      { step: 8, title: 'Testing edge cases', description: 'Evaluating reply against potential summary judgment on counterclaim.', icon: 'cpu', actor: 'system' },
      { step: 9, title: 'Refining affirmative defenses', description: 'Strengthened bad faith defense with evidence that counterclaim was filed 48 hours after Plaintiff initiated this lawsuit.', icon: 'file', actor: 'agent' },
      { step: 10, title: 'Fortifying overall reply', description: 'Ensured each counterclaim allegation is specifically addressed with factual basis for denial.', icon: 'shield', actor: 'agent' },
      { step: 11, title: 'Red team simulation complete', description: 'Reply to Counterclaim fortified. Final draft ready.', icon: 'check', actor: 'system' },
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
      { text: 'Identifying company custodians and data sources...' },
      { text: 'Determining scope of document preservation...' },
      { text: 'Litigation hold notice generated.' },
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
      { text: 'Parsing complaint document structure...' },
      { text: 'Identifying cause of action: Breach of Contract...' },
      { text: 'Scanning for jurisdictional and procedural defects...' },
      { text: 'Running adversarial viability assessment...' },
      { text: 'Evaluating strength of Answer vs. Motion to Dismiss...' },
      { text: 'Analysis complete. Two viable paths identified.' },
    ],
  },

  answer: {
    factProcessSteps: [
      { text: 'Isolating factual allegations from paragraphs 1-8...' },
      { text: 'Cross-referencing claims with employment agreement terms...' },
      { text: 'Classifying each claim by default response (admit/deny)...' },
      { text: '7 factual claims ready for review.' },
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
      { step: 1, title: 'Initializing red team simulation', description: 'Loading Answer and case context for adversarial testing.', icon: 'check', actor: 'system' },
      { step: 2, title: 'Deploying Prosecution red team', description: "Plaintiff attorney agents initialized to attack your Answer.", icon: 'cpu', actor: 'system' },
      { step: 3, title: 'Prosecution reviewing Answer', description: 'Plaintiff counsel analyzing each response and affirmative defense.', icon: 'file', actor: 'opponent' },
      { step: 4, title: 'Prosecution attacked: Denial of Para 5 lacks specificity', description: 'Prosecution argues FRCP 8(b) requires specific denials — blanket denial of full performance is insufficient without identifying which obligations were unmet.', icon: 'swords', actor: 'opponent' },
      { step: 5, title: 'Agent added specific factual basis', description: 'Added reference to Q4 performance metrics: Plaintiff missed revenue targets by 18% and lost two key client accounts (Acme Ltd. and GlobalTech).', icon: 'shield', actor: 'agent' },
      { step: 6, title: 'Prosecution attacked: First Affirmative Defense conclusory', description: "Prosecution argues 'material breach by Plaintiff' allegation lacks factual support — no facts showing what Plaintiff actually did wrong.", icon: 'swords', actor: 'opponent' },
      { step: 7, title: 'Agent fortified affirmative defense', description: "Added factual predicate: Plaintiff violated Section 7.2 non-compete by soliciting client Acme Ltd. during his final month of employment.", icon: 'shield', actor: 'agent' },
      { step: 8, title: 'Prosecution attacked: Conditions precedent defense may be waived', description: 'Prosecution argues bonus was paid in prior years (2022) without Board approval, establishing course-of-dealing waiver.', icon: 'swords', actor: 'opponent' },
      { step: 9, title: 'Agent distinguished prior payments', description: 'Added allegation distinguishing the 2022 payment as a one-time discretionary award, not governed by the same conditions as the 2023 contractual bonus structure.', icon: 'shield', actor: 'agent' },
      { step: 10, title: 'Fortifying overall defense posture', description: 'Ensured all denials have specific factual predicates and all affirmative defenses cite supporting contract provisions.', icon: 'shield', actor: 'agent' },
      { step: 11, title: 'Red team simulation complete', description: 'Answer fortified against Prosecution challenges. Final draft ready.', icon: 'check', actor: 'system' },
    ],
  },

  counterclaim: {
    analysisSteps: [
      { text: 'Identifying potential counterclaim grounds...' },
      { text: 'Evaluating breach of confidentiality claim viability...' },
      { text: 'Assessing training cost reimbursement under Section 9.3...' },
      { text: 'Counterclaim draft ready for review.' },
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
      { step: 1, title: 'Initializing red team simulation', description: 'Loading Counterclaim and case context.', icon: 'check', actor: 'system' },
      { step: 2, title: 'Deploying Prosecution red team', description: "Plaintiff attorney agents will attack your Counterclaim.", icon: 'cpu', actor: 'system' },
      { step: 3, title: 'Prosecution reviewing Counterclaim', description: 'Plaintiff counsel analyzing counterclaim allegations for weaknesses.', icon: 'file', actor: 'opponent' },
      { step: 4, title: 'Prosecution attacked: Confidentiality claim lacks specificity', description: "Prosecution argues counterclaim fails to identify what specific confidential information was disclosed, relying on vague 'upon information and belief' language.", icon: 'swords', actor: 'opponent' },
      { step: 5, title: 'Agent added factual specificity', description: 'Added specific allegations: LinkedIn article dated January 15, 2024 discussed unreleased product features including AI integration timeline and pricing model.', icon: 'shield', actor: 'agent' },
      { step: 6, title: 'Prosecution attacked: Training provision may not apply', description: "Prosecution argues Section 9.3 only applies to 'voluntary departure' and Plaintiff was involuntarily terminated.", icon: 'swords', actor: 'opponent' },
      { step: 7, title: 'Agent strengthened training claim', description: "Added analysis of Section 9.3's full text showing 'separation from employment' language is broader than 'voluntary departure' in preceding subsection.", icon: 'shield', actor: 'agent' },
      { step: 8, title: 'Testing edge cases', description: 'Evaluating counterclaim against potential 12(b)(6) motion by Plaintiff.', icon: 'cpu', actor: 'system' },
      { step: 9, title: 'Refining damages allegations', description: 'Strengthened damages specificity: identified three competitor actions traceable to the LinkedIn disclosure.', icon: 'file', actor: 'agent' },
      { step: 10, title: 'Fortifying overall counterclaim', description: 'Ensured each element of both counts is adequately pleaded with supporting factual allegations.', icon: 'shield', actor: 'agent' },
      { step: 11, title: 'Red team simulation complete', description: 'Counterclaim fortified against anticipated Plaintiff challenges. Final draft ready.', icon: 'check', actor: 'system' },
    ],
  },

  mtd: {
    defectScanSteps: [
      { text: 'Analyzing subject matter jurisdiction — 12(b)(1)...' },
      { text: 'Checking personal jurisdiction — 12(b)(2)...' },
      { text: 'Evaluating venue propriety — 12(b)(3)...' },
      { text: 'Reviewing sufficiency of process — 12(b)(4)...' },
      { text: 'Checking service of process — 12(b)(5)...' },
      { text: 'Assessing failure to state a claim — 12(b)(6)...' },
      { text: 'Checking required party joinder — 12(b)(7)...' },
      { text: 'Defect scan complete. Viable grounds identified.' },
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
      { text: 'Searching pleading standard precedent...' },
      { text: 'Analyzing Twombly/Iqbal framework for breach of contract claims...' },
      { text: 'Researching California bonus condition cases...' },
      { text: 'Compiling supporting citations...' },
      { text: 'Case law research complete.' },
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
      { step: 1, title: 'Initializing red team simulation', description: 'Loading Motion to Dismiss and case context.', icon: 'check', actor: 'system' },
      { step: 2, title: 'Deploying Prosecution red team', description: "Plaintiff attorney agents will attack your Motion to Dismiss.", icon: 'cpu', actor: 'system' },
      { step: 3, title: 'Prosecution reviewing MTD', description: 'Plaintiff counsel analyzing each 12(b)(6) argument for weaknesses.', icon: 'file', actor: 'opponent' },
      { step: 4, title: 'Prosecution attacked: Complaint adequately pleads performance', description: "Prosecution argues 'fully performed all obligations' is a factual allegation the Court must accept as true at this stage, not a legal conclusion.", icon: 'swords', actor: 'opponent' },
      { step: 5, title: 'Agent strengthened 12(b)(6) argument', description: 'Reinforced distinction between factual allegations and legal conclusions per Iqbal — bare assertion of full performance without identifying specific metrics is conclusory.', icon: 'shield', actor: 'agent' },
      { step: 6, title: 'Prosecution attacked: Bonus not discretionary', description: "Prosecution argues Section 4.1 'shall be paid' language is mandatory — Board approval in Section 4.2 is merely procedural.", icon: 'swords', actor: 'opponent' },
      { step: 7, title: 'Agent fortified contract argument', description: "Added citation to Section 4.2's full text: 'subject to final approval by the Board of Directors in its sole discretion' — 'sole discretion' negates mandatory reading.", icon: 'shield', actor: 'agent' },
      { step: 8, title: 'Prosecution raised edge case', description: 'What if the Court grants leave to amend rather than dismissing with prejudice?', icon: 'cpu', actor: 'system' },
      { step: 9, title: 'Agent added futility argument', description: "Incorporated argument that amendment would be futile: the Agreement itself (subject to judicial notice) establishes the bonus is discretionary — no factual amendment can change the contract's terms.", icon: 'file', actor: 'agent' },
      { step: 10, title: 'Fortifying overall motion', description: 'Added request for judicial notice of the Employment Agreement under FRE 201 to support dismissal with prejudice.', icon: 'shield', actor: 'agent' },
      { step: 11, title: 'Red team simulation complete', description: 'Motion to Dismiss fortified against anticipated Prosecution opposition. Final draft ready.', icon: 'check', actor: 'system' },
    ],
  },

  replyInSupport: {
    analysisSteps: [
      { text: "Parsing Plaintiff's Opposition to Motion to Dismiss..." },
      { text: 'Identifying concessions and admissions in opposition...' },
      { text: 'Evaluating new arguments raised in opposition...' },
      { text: 'Preparing point-by-point rebuttal...' },
      { text: 'Reply in Support draft ready for review.' },
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
      { step: 1, title: 'Initializing red team simulation', description: 'Loading Reply in Support and case context.', icon: 'check', actor: 'system' },
      { step: 2, title: 'Deploying Prosecution red team', description: "Plaintiff attorney agents preparing hearing challenge.", icon: 'cpu', actor: 'system' },
      { step: 3, title: 'Prosecution reviewing Reply', description: 'Plaintiff counsel analyzing reply arguments for oral argument preparation.', icon: 'file', actor: 'opponent' },
      { step: 4, title: 'Prosecution attacked: Iqbal distinction misapplied', description: "Prosecution argues 'fully performed' is analogous to well-pleaded factual allegations courts have accepted — similar to 'Defendant breached the contract' which is routinely deemed sufficient.", icon: 'swords', actor: 'opponent' },
      { step: 5, title: 'Agent refined Iqbal analysis', description: "Added comparison to Iqbal's specific examples: distinguished between 'Defendant discriminated' (conclusory) and 'Defendant fired plaintiff after learning of her pregnancy' (factual).", icon: 'shield', actor: 'agent' },
      { step: 6, title: 'Prosecution attacked: Board approval is procedural formality', description: "Prosecution argues industry practice shows 'Board approval' clauses for bonuses are ministerial rubber-stamps, not genuine discretionary gates.", icon: 'swords', actor: 'opponent' },
      { step: 7, title: 'Agent strengthened plain language argument', description: "Added argument that parol evidence of 'industry practice' cannot override the unambiguous contract language 'in its sole discretion' at the pleading stage.", icon: 'shield', actor: 'agent' },
      { step: 8, title: 'Preparing for bench questions', description: 'Anticipating potential questions from the Court about leave to amend and proportionality of dismissal with prejudice.', icon: 'cpu', actor: 'system' },
      { step: 9, title: 'Preparing hearing talking points', description: 'Generated concise rebuttals for the three most likely bench questions regarding futility, contract interpretation, and the Twombly standard.', icon: 'file', actor: 'agent' },
      { step: 10, title: 'Final fortification', description: 'Ensured all arguments are internally consistent and supported by cited authority. Ready for hearing.', icon: 'shield', actor: 'agent' },
      { step: 11, title: 'Red team simulation complete', description: 'Reply fortified for hearing presentation. Final draft ready.', icon: 'check', actor: 'system' },
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
