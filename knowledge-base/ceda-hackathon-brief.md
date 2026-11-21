# CEDA Innovation Portal Hackathon — Brief & Scoring Reference

> Working reference for this project. Use it whenever a feature is proposed: check which requirement or
> judging line it serves, and prefer work on unclaimed points over polish on claimed ones.

## 1. What the hackathon is

CEDA (Citizen Entrepreneurial Development Agency, Botswana) is running an Innovation Strategy to build a
culture of creativity and transformation across the Agency and the country. It invited **citizen
youth-owned companies (youth > 50% shareholding)** to design an innovation platform that takes pioneering
ideas "from submission through rigorous evaluation to well-deserved recognition and reward".

Deliverable: a **prototype** of an online, ready-to-use platform that is **both a repository and an
evaluation platform for innovative ideas**.

## 2. Problem statement (what judges are reacting to)

CEDA needs a user-friendly digital platform for the seamless **submission, evaluation, development and
recognition** of innovative ideas, providing an engaging and transparent environment that encourages
participation, collaboration, and practical solutions aligned with CEDA's strategic priorities, digital
advancement and sustainable development goals.

## 3. Required platform functions (section 3.2) — the core checklist

| # | Requirement | Notes |
|---|---|---|
| a | **User-friendly idea submission interface** — intuitive portal, mandatory fields for completeness | Applicants must "effortlessly deposit ideas" |
| b | **Multi-level evaluation workflow** — flexible modules, evaluation teams assess **collaboratively**, score on **customisable criteria**, overall adjudication | Internal + committee workflows |
| c | **Real-time tracking of submission status** — automated dashboard notifications; internal *and* external stakeholders monitor progress through **submission → review → feedback → approval → award** | This is the canonical stage model |
| d | **Role-based access control & data security** — strict permissions protecting sensitive info and IP; different rights for **submitters, evaluators, adjudicators, administrators** | 4 named roles |
| e | **Feedback and iteration** — evaluators give constructive feedback in-platform; submitters respond or **resubmit** | Two-way loop, not one-way comments |
| f | **Basic reporting** — participation metrics, evaluation outcomes, timelines; supports transparency and strategic decisions | Dashboards |
| g | **Scalability & flexibility** — modular, adaptable; ready for new criteria, roles, analytics, external integrations | Architecture story |

The submitted solution must also show: secure idea submission, **team-based evaluations and adjudication**,
tracking each idea through **all** workflow stages, enforced role-based access, **real-time status updates**,
feedback mechanisms, **reporting dashboards**, scalability, data integrity and ease of use for all user types.

## 4. Judging criteria and weights (total 100)

### General / Essential User Access Features and Backend Hosting Support — **15**
- CEDA provides direction on interface layout, colours and fonts — **2**
- Browser-first access (Edge, Chrome, Mozilla) — **2**
- **Self-registration** with email or phone validation — **2**
- Authentication by password, OTP (SMS/email) or biometrics/face — **2**
- Create / change / recover password — **2**
- Hosted on the cloud by the supplier: provider, region, storage costs stated — **2**
- 24/7 availability for applicants and back-office users — **3**

### Functionality — **20**
- Admin can **upload, modify, delete content** (application form and all copies required with applications) — **3**
- **Multi-level evaluation workflow**: collaborative evaluation teams, **customisable scoring criteria**, adjudication — **3**
- **Feedback and iteration** mechanisms (evaluator → submitter) — **3**
- **Online chat with a CEDA service consultant** during submission: multi-user live chat (one agent many chats / many agents), available **09:00–16:00 working days only**, **notification message** when all agents busy / after hours ("agent not available at the moment"), **chat analytics reporting** — **2**
- **Support details for remediating faults** while hosting, including turnaround time — **2**
- **FAQs** for common enquiries + contacts for each regulatory authority — **2**
- **Basic reporting dashboards**: participation metrics, evaluation outcomes, timelines — **3**
- **Free subscription to alerts** when their submission is updated — **2**

### User Experience / Design — **15**
- Intuitive and easy to use — **5**
- Clear navigation, understandable labelling, well-defined iconography, clear and consistently presented links — **5**
- Aesthetically appealing UI — **5**

### Technical Requirements — **25**
- **Role-based access** — **5**
- **System response time** — **5**
- **Audit trail of activities** — **5**
- **Cyber security and data privacy** — **5**
- Cross-browser and device compatibility — **2.5**
- Scalability and flexibility — **2.5**

### Innovation & Creativity — **10**
Features beyond the specified criteria: creativity, technical depth, forward thinking.

### Presentation — **15**
- Clear, functional, compelling **demo** — **5**
- **Strong technical documentation** — **5**
- Presentation skill and time management — **5**

Public audience vote on presentation day carries **10%** of the final score.

## 5. Timeline (all times CAT)

| Activity | Dates |
|---|---|
| Registration (Skillsranker) | 9–12 November 2026 |
| Briefing | 13 November 2026, 15:00 |
| **Hacking** | **13–23 November 2026** (11 days; best work due day 11, 17:00) |
| Clarification meetings | 16 and 20 November 2026 |
| Judging / shortlist to Top 5 | 25–30 November 2026 |
| Top 5 presentations, results, prize giving | 3 December 2026, CEDA Head Office, Gaborone |

## 6. Prizes

1st P40,000 · 2nd P25,000 · 3rd P15,000 · 4th P10,000 · 5th P5,000. Top 5 get a meet-and-greet with
potential sponsors. Prize money is not binding on implementation.

## 7. What gets submitted

1. URL link to the solution (mandatory)
2. User manual
3. Walkthrough video (mandatory)
4. Installation / executable files for all platforms
5. Source code (mandatory)
6. README explaining how to run it and the tools used
7. Technical document ≤ 10 pages: motivation, solution design and architecture, stack, lessons learnt,
   evidence of research
8. CVs, IDs and certificates; optional portfolio. Max file size 150 MB.

## 8. Rules that shape the build

- All work must be created **during** the event (planning and sketches are fine beforehand).
- Data must comply with **Botswana's Data Protection Act, 2024** (lawful collection, purpose limitation,
  protection from unauthorised access, retention limits).
- English only; each registration question must be answered.
- Teams must be able to defend the prototype (presentations, clarification, review sessions).
- IP developed for the winning company belongs to CEDA.

## 9. How this repo currently maps to the brief

| Requirement | Where it lives today | Status |
|---|---|---|
| 3.2 a — Idea submission | `NewLoan.vue` six-step wizard, mandatory fields, documents step | Implemented (single flow) |
| 3.2 c — Status tracking | `DashboardSample.vue`, `LoansSheet.vue` (My Applications), `IdeaView.vue`, `LoanView.vue` | Partial — stages exist, no notifications |
| 3.2 d — Role-based access | Sidebar/dashboards differ per role (`EvaluatorDashboard.vue`), `AdminProfile.vue`, `TeamView.vue` members | UI only, **no enforcement** |
| 3.2 b — Multi-level evaluation | `EvaluatorDashboard.vue` | Partial — no collaborative scoring or customisable criteria |
| 3.2 e — Feedback & iteration | `IdeaView.vue` / evaluator review screens | Not built end-to-end (no resubmit loop) |
| 3.2 f — Reporting | Dashboard stat cards | Partial — no evaluations/timeline reporting |
| 3.2 g — Modularity | Vue 3 + TS + components | Architectural claim only |
| Online chat (2 pts) | `ChatWithAgent.vue`, `AiAgent.vue`, voice chat widget | AI agent, not a 09:00–16:00 consultant queue, no availability messaging or chat analytics |
| FAQs (2 pts) | `FaqPage.vue` | Implemented |
| Alerts / subscriptions (2 pts) | Notification bell, task widget | Not a real subscription or update feed |
| Audit trail (5 pts) | — | **Not built** |
| Security & privacy (5 pts) | — | Copy only |
| Cross-browser/device (2.5) | Responsive layouts across pages | Partial |
| Innovation (10 pts) | Voice chat, task widget, AI advisor | Selling point; needs to be tied to a workflow story |

### Highest-value gaps, in scoring order

1. Role-based access **enforced** in routing/UI per role (5) + audit trail (5) = 10 points, both currently absent.
2. Evaluation workflow with customisable scoring criteria and adjudication (3), plus feedback → resubmit (3).
3. Reporting dashboards for participation, outcomes and timelines (3), and free update subscriptions (2).
4. Online consultant chat with hours, busy/after-hours messaging and analytics (2) — we have AI/voice, not this.
5. Admin content management for the application form and required documents (3).

## 10. Screening rule for new feature ideas

Before building, answer:

1. **Which line does it score?** Cite the criterion (e.g. "Functionality — reporting, 3 pts").
2. **Does it already exist?** Reuse the page/component before adding a new one.
3. **Does the demo need it?** If it will not appear in the Top-5 walkthrough, it is not urgent.
4. **Does it fit the stage model?** submission → review → feedback → approval → award. Anything that
   invents a different stage vocabulary costs UX points (clear navigation / consistent labelling).
5. **Is it enforced or cosmetic?** Judges probe permissions, audit trail and data handling; mock badges
   earn nothing.
