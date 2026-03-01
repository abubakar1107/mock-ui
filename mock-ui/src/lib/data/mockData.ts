export const mockData = {
  complaint: `IN THE UNITED STATES DISTRICT COURT
FOR THE NORTHERN DISTRICT OF CALIFORNIA

JOHN DOE,
    Plaintiff,
v.
TECH CORP INC.,
    Defendant.

COMPLAINT FOR BREACH OF CONTRACT

1. Plaintiff John Doe is an individual residing in San Francisco, California.
2. Defendant Tech Corp Inc. is a corporation organized under the laws of Delaware with its principal place of business in San Jose, California.
3. On or about January 15, 2023, Plaintiff and Defendant entered into a written employment agreement ("the Agreement").
4. Under the terms of the Agreement, Defendant agreed to pay Plaintiff a base salary of $150,000 per year plus a performance bonus.
5. Plaintiff fully performed all obligations required under the Agreement.
6. On December 1, 2023, Defendant terminated Plaintiff's employment without cause and failed to pay the earned performance bonus of $30,000.
7. Defendant's failure to pay the bonus constitutes a material breach of the Agreement.
WHEREFORE, Plaintiff prays for judgment against Defendant for compensatory damages in the amount of $30,000, plus interest, costs, and attorney's fees.`,

  facts: [
    { id: 1, text: "Plaintiff John Doe resides in San Francisco, California.", status: "admit" },
    { id: 2, text: "Defendant Tech Corp Inc. is a Delaware corporation based in San Jose, CA.", status: "admit" },
    { id: 3, text: "Parties entered into a written employment agreement on January 15, 2023.", status: "admit" },
    { id: 4, text: "The agreement included a base salary of $150,000 and a performance bonus.", status: "admit" },
    { id: 5, text: "Plaintiff fully performed all obligations under the Agreement.", status: "deny" },
    { id: 6, text: "Defendant terminated Plaintiff without cause on December 1, 2023.", status: "deny" },
    { id: 7, text: "Defendant failed to pay an earned performance bonus of $30,000.", status: "deny" }
  ],

  answerDraft: `DEFENDANT'S ANSWER TO PLAINTIFF'S COMPLAINT

Defendant Tech Corp Inc. ("Defendant"), by and through its undersigned counsel, hereby answers Plaintiff John Doe's ("Plaintiff") Complaint as follows:

1. Defendant lacks sufficient knowledge or information to form a belief as to the truth of the allegations in Paragraph 1, and therefore denies them.
2. Defendant admits the allegations in Paragraph 2.
3. Defendant admits the allegations in Paragraph 3.
4. Defendant admits the allegations in Paragraph 4.
5. Defendant denies the allegations in Paragraph 5. Plaintiff repeatedly failed to meet performance metrics outlined in the Agreement.
6. Defendant admits that Plaintiff's employment was terminated on December 1, 2023. Defendant denies the remaining allegations in Paragraph 6, specifically denying that the termination was without cause and denying that any performance bonus was earned or owed.
7. Defendant denies the allegations in Paragraph 7.

AFFIRMATIVE DEFENSES
1. Plaintiff's claims are barred by his own material breach of the Agreement.
2. Plaintiff failed to satisfy the conditions precedent required to earn the performance bonus.`,

  simulationLogs: [
    { step: 1, title: "Initial readiness", description: "System initialized and context loaded.", status: "completed" },
    { step: 2, title: "Starting Opposing council team", description: "Initializing adversary simulation agents.", status: "completed" },
    { step: 3, title: "Reading the draft", description: "Opposing council agent is reviewing the drafted Answer.", status: "completed" },
    { step: 4, title: "Opposing council attacked the first argument", description: "Adversary agent filed a mock Motion to Strike Affirmative Defenses, arguing they lack sufficient factual specificity under Twombly/Iqbal standards.", status: "completed" },
    { step: 5, title: "Your agent responded", description: "Drafted an opposition to the Motion to Strike, citing specific instances of Plaintiff's performance failures documented in HR records.", status: "completed" },
    { step: 6, title: "Opposing council attacked on second argument", description: "Adversary agent argued that 'cause' for termination was not properly documented according to the employee handbook procedures.", status: "completed" },
    { step: 7, title: "Your agent responded", description: "Incorporated an additional affirmative defense regarding at-will employment provisions superseding handbook guidelines.", status: "completed" },
    { step: 8, title: "Simulation on-going", description: "Running final edge-case scenarios...", status: "completed" },
    { step: 9, title: "Refining the document", description: "Applying learnings from the simulation to strengthen the Answer.", status: "completed" },
    { step: 10, title: "Fortifying its weaknesses", description: "Adding specific factual predicates to Affirmative Defense No. 1.", status: "completed" },
    { step: 11, title: "Statement done", description: "Final review of the generated document.", status: "completed" }
  ]
};
