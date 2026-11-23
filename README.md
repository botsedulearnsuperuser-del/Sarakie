# CEDA Innovation Portal

An online repository **and** evaluation platform for innovative ideas, built for the CEDA Innovation
Strategy (Citizen Entrepreneurial Development Agency, Botswana). Innovators submit an idea and follow it
from **submission → review → feedback → approval → award**; evaluators score it against a weighted rubric;
adjudicators and administrators oversee the whole pipeline.

Live prototype: <https://cedainnovationportal.vercel.app>

- Frontend: Vue 3 + TypeScript + Vite (single-page app)
- Backend: Supabase (Postgres, Row Level Security, Auth, Storage)
- Serverless API: Vercel functions in `/api` (AI assistant, voice advisor, evaluator invitations)
- Hosting: Vercel (static build + `/api` functions)

---

## Contents

1. [What the system does](#1-what-the-system-does)
2. [Who it is for (roles)](#2-who-it-is-for-roles)
3. [How it works](#3-how-it-works)
4. [Tech stack](#4-tech-stack)
5. [Project structure](#5-project-structure)
6. [Run it on your own machine](#6-run-it-on-your-own-machine)
7. [Environment file (`.env.local`)](#7-environment-file-envlocal)
8. [Set up Supabase from scratch](#8-set-up-supabase-from-scratch)
9. [First administrator account](#9-first-administrator-account)
10. [Evaluator accounts](#10-evaluator-accounts)
11. [Deploy to Vercel](#11-deploy-to-vercel)
12. [Troubleshooting](#12-troubleshooting)
13. [Credits](#13-credits)

---

## 1. What the system does

The portal replaces a paper/email innovation pipeline with one authenticated workspace:

- **Idea submission** — a six-step wizard (applicant details, idea summary, problem, proposed solution,
  financial projections, supporting documents). Work is saved as a **draft** and stays editable until the
  innovator explicitly submits it.
- **Multi-level evaluation** — administrators assign evaluators to submitted applications; evaluators score
  each one on a customisable weighted rubric (0–5 per criterion, weighted to 100) and recommend
  fund / revise / decline.
- **Anonymised review** — evaluators read submissions through the `evaluator_queue` view, which hides the
  innovator's identity (they see a code such as `IN-4F21`), protecting IP.
- **Feedback and iteration** — two-way threads (Feedback Centre) plus formal "corrections required" requests;
  a returned application goes back to the innovator for resubmission.
- **Status tracking and dashboards** — innovators see proposal value, progress and next review; evaluators
  see their queue and deadlines; administrators see participation and outcome reporting.
- **Audit trail** — every status change and key action is appended to `audit_log` (append-only by policy).
- **Security** — Supabase Auth with email confirmation, optional TOTP two-factor, and Row Level Security on
  every table; the secret key never reaches the browser.

## 2. Who it is for (roles)

| Role | Can do | Landing page |
|---|---|---|
| **Innovator** | Register, draft/submit ideas, track status, upload documents, reply to feedback, manage profile, team, legal consents | `/innovator-dashboard` |
| **Evaluator** | See only assigned applications (anonymised), score against the rubric, comment, request corrections | `/evaluator-dashboard` |
| **Adjudicator** | Oversight: read applications, scores and comments, view the admin reporting and audit trail | `/admin-dashboard` |
| **Admin** | Everything: all applications, rubric, assignments, evaluator accounts, deadlines, audit log | `/admin-dashboard` |

Route-level enforcement lives in `src/lib/permissions.ts` and is applied by the router guard in
`src/main.ts`; page-level enforcement relies on Supabase RLS, so a user cannot read data by editing the URL.

## 3. How it works

### Application states

```
draft → submitted → screening → committee → due_diligence → approved
                                                          ↘ rejected
                                        ↖ returned (back to the innovator for changes)
```

### Scoring rubric (seeded in the database, editable by an admin)

| Criterion | Weight |
|---|---|
| Problem and market need | 25 |
| Solution and feasibility | 25 |
| Team and capability | 20 |
| Sustainability and growth (financial projections) | 20 |
| Impact and youth ownership | 10 |

Guidance used by the portal: 70+ recommended for funding, 50–69 clarification, below 50 declined.

### Database tables (`supabase/migrations`)

`profiles`, `applications`, `application_documents`, `application_corrections`, `evaluation_assignments`,
`evaluations`, `rubric_criteria`, `feedback_comments`, `deadlines`, `notifications`, `team_members`,
`audit_log`, `evaluator_invitations`, `legal_acceptances`, `account_deletion_requests`,
`application_collaborators`, plus the `evaluator_queue` view.

### Request flow

```
Browser (Vue SPA)
  ├── supabase-js  →  Supabase Auth / Postgres (RLS) / Storage   [publishable key, browser-safe]
  └── fetch /api/*  →  Vercel function                           [server-only keys]
                        ├── /api/chat                 → Google Gemini (AI advisor)
                        ├── /api/tavus-conversation   → Tavus video advisor
                        └── /api/admin-evaluators     → Supabase Admin API (invite evaluators)
```

## 4. Tech stack

| Layer | Choice |
|---|---|
| UI | Vue 3 (`<script setup>`), Vue Router 4, CSS Modules, Lucide icons, `motion` |
| Build | Vite 6, TypeScript 5, `vue-tsc` |
| Data & auth | Supabase (`@supabase/supabase-js` v2): Postgres 15/17, RLS, Auth, private Storage bucket |
| Documents | `pdfjs-dist`, `mammoth` (in-browser preview of PDF/DOCX uploads) |
| AI | Google Gemini (`GEMINI_API_KEY`), Tavus conversational video (`TAVUS_API_KEY`, `TAVUS_PAL_ID`) |
| Hosting | Vercel (static `dist` + `/api` serverless functions) |

## 5. Project structure

```
.
├── api/                       Vercel serverless functions (Node, ESM)
│   ├── chat.js                Gemini-powered CEDA advisor
│   ├── tavus-conversation.js  Tavus video advisor session
│   └── admin-evaluators.js    Invite/remove evaluators (service key, admin-only)
├── src/
│   ├── main.ts                Routes + auth/role guard
│   ├── pages/                 One file per screen (dashboards, wizard, auth, admin…)
│   ├── components/            Shared UI (sidebar, cards, chat, MFA, theme picker)
│   ├── landing-first/         Public marketing landing page
│   ├── lib/                   auth, permissions, supabase client, portal-data, audit, mfa, password
│   └── global.css             Design tokens
├── public/                    Images, audio, avatars, fonts
├── supabase/migrations/       Ordered SQL migrations (schema + RLS + seed)
├── knowledge-base/            Hackathon brief and AI advisor knowledge
├── docs/                      Extra notes
├── index.html
├── vite.config.ts             Dev server + local middleware for /api routes
├── vercel.json                SPA rewrites + /api passthrough
└── .env.example               Copy to .env.local
```

## 6. Run it on your own machine

### Prerequisites

- **Node.js 20 LTS or newer** (Vite 6 supports 18, but 20+ is recommended) and npm 10+
- Git
- A free Supabase project (see §8) — the app renders without one, but sign-in, data and uploads will not work

### Steps

```bash
# 1. clone
git clone https://github.com/botsedulearnsuperuser-del/Sarakie.git
cd Sarakie

# 2. install exactly what the lockfile pins
npm ci            # or: npm install

# 3. create your environment file (see §7)
cp .env.example .env.local
#    then edit .env.local and fill in the values

# 4. start the dev server
npm run start     # Vite — http://localhost:5173
```

Other scripts:

| Command | What it does |
|---|---|
| `npm run start` | Vite dev server with hot reload and local `/api` middleware |
| `npm run build` | Type-check (`vue-tsc`) then build to `dist/` |
| `npm run preview` | Serve the production build locally |

> Windows/macOS/Linux all work; no native build tools are required.

The dev server mounts `/api/chat` and `/api/admin-evaluators` through Vite middleware
(`vite.config.ts`), so those two work locally. `/api/tavus-conversation` has no dev middleware and is only
available on the deployed Vercel site.

### Useful URLs once running

| URL | Purpose |
|---|---|
| `/` | Public landing page |
| `/sign-up` | Innovator registration |
| `/admin-sign-up` | Administrator registration (first admin only) |
| `/login` | Sign in for every role |
| `/forgot-password`, `/reset-password` | Password recovery |
| `/innovator-dashboard`, `/my-applications`, `/new-idea` | Innovator workspace |
| `/evaluator-dashboard`, `/review-queue` | Evaluator workspace |
| `/admin-dashboard`, `/admin/evaluators` | Admin/adjudicator workspace |
| `/feedback-center`, `/application/:id`, `/profile`, `/team`, `/ideas`, `/deadlines` | Shared pages |
| `/faq`, `/about`, `/privacy`, `/terms`, `/blog` | Public content |

## 7. Environment file (`.env.local`)

**File name:** `.env.local`, in the **project root**, next to `package.json`. It is git-ignored
(`.env.local`, `.env.*.local`) — never commit it. `.env.example` is the committed template.

Only variables prefixed with `VITE_` are readable by the browser. Everything else is server-only and must
stay that way.

| Variable | Required | Reaches browser | Where to get it |
|---|---|---|---|
| `VITE_SUPABASE_URL` | yes | ✅ | Supabase → your project → **Project Settings → Data API / General**: the `https://<ref>.supabase.co` URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | yes | ✅ | Supabase → **Project Settings → API Keys** → publishable key (`sb_publishable_…`) |
| `SUPABASE_SECRET_KEY` | for evaluator invites | ❌ | Same page → **secret key** (`sb_secret_…`). Server-only; bypasses RLS |
| `GEMINI_API_KEY` | for the AI advisor | ❌ | <https://aistudio.google.com/apikey> |
| `GEMINI_MODEL` | optional | ❌ | e.g. `gemini-2.5-flash` (default) or `gemini-2.5-flash-lite` |
| `TAVUS_API_KEY`, `TAVUS_PAL_ID` | for the video advisor | ❌ | <https://platform.tavus.io> → API keys and your replica/PAL id |

Example `.env.local` (values are placeholders — use your own):

```dotenv
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxxxxx
SUPABASE_SECRET_KEY=sb_secret_xxxxxxxxxxxxxxxx

GEMINI_API_KEY=your-gemini-key
GEMINI_MODEL=gemini-2.5-flash

TAVUS_API_KEY=your-tavus-key
TAVUS_PAL_ID=your-pal-id
```

The server functions also accept `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_SERVICE_ROLE_KEY`
as aliases, and the older `VITE_SUPABASE_ANON_KEY` as a fallback for the publishable key.

Restart the dev server after changing `.env.local` — Vite only reads it at startup.

## 8. Set up Supabase from scratch

1. **Create a project** at <https://supabase.com/dashboard> (any region; the prototype runs on eu-west-1).
2. **Run the migrations, in filename order**, either:
   - *SQL Editor*: open each file in `supabase/migrations/` and run it in this order:
     `20261122120000_init.sql` →
     `20261122140000_legal_acceptances.sql` →
     `20261122150000_profile_mfa_flags.sql` →
     `20261122160000_avatars_and_deletion_requests.sql` →
     `20261122170000_application_collaborators.sql` →
     `20261122180000_evaluator_invitations.sql` →
     `20261122190000_add_adjudicator_role.sql` →
     `20261123100000_adjudicator_chat_feedback.sql` →
     `20261123130000_evaluator_adjudication_workflow.sql` →
     `20261123150000_first_admin_signup.sql`; or
   - *Supabase CLI*: `supabase link --project-ref <ref>` then `supabase db push`.

   They are idempotent — re-running is safe. `init.sql` also creates the private `application-documents`
   storage bucket, all RLS policies and seeds the five rubric criteria.
3. **Auth → Providers → Email**: keep *Email* enabled and **Confirm email ON** (the portal expects the
   confirmation link).
4. **Auth → URL Configuration**: set **Site URL** to your deployed origin
   (`https://cedainnovationportal.vercel.app`) and add these **Redirect URLs**:
   ```
   http://localhost:5173/login
   http://localhost:5173/reset-password
   https://cedainnovationportal.vercel.app/login
   https://cedainnovationportal.vercel.app/reset-password
   ```
   Add any preview/custom domain you use as well. The app sends users to `/login` after sign-up and to
   `/reset-password` after recovery.
5. **Auth → Emails / SMTP**: the built-in mailer is heavily rate-limited (a few messages per hour for the
   whole project). For reliable sign-up mail, connect your own SMTP provider (e.g. Resend, SendGrid,
   Amazon SES) under **Auth → SMTP Settings**, then send yourself a test.
6. **Copy the keys** (Data API URL + publishable key, plus the secret key) into `.env.local` (§7).

## 9. First administrator account

There is exactly **one** administrator, enforced by a unique index on `profiles.role`.

1. Go to `/admin-sign-up`, fill in name, email and a password that meets the policy (8+ characters, one
   uppercase, one number, one special character), and submit.
2. **If no admin exists yet**, the account is created with the `admin` role (this is the only
   self-service path to the admin role — `handle_new_user` in
   `supabase/migrations/20261123150000_first_admin_signup.sql`).
3. Confirm the email, sign in at `/login`, and you land on `/admin-dashboard`.
4. From then on, further sign-ups requesting `admin` are recorded as **innovators** — elevated roles are
   granted deliberately.

To promote an existing account instead (SQL Editor, as the project owner):

```sql
select public.promote_to_admin('person@example.com');
```

Only one profile can hold `admin`; move the role rather than adding a second one.

## 10. Evaluator accounts

Administrators create evaluators from **Admin dashboard → Evaluator accounts** (`/admin/evaluators`):

- An existing portal user with that email is promoted to `evaluator` immediately.
- A new email gets a Supabase **invitation email** and becomes an evaluator once they accept and set a
  password.
- Removing an evaluator returns them to `innovator` (their account is not deleted).

This feature calls `/api/admin-evaluators`, which needs `SUPABASE_SECRET_KEY` on the server (locally in
`.env.local`, on Vercel as a project environment variable). Without it the endpoint replies
*"Evaluator invitations are not configured on the server."*

## 11. Deploy to Vercel

1. Import the GitHub repository into Vercel (framework preset: **Vite**).
2. Build settings: **Build command** `npm run build`, **Output directory** `dist`.
3. Add the environment variables from §7 under **Project → Settings → Environment Variables**
   (`VITE_*` for all environments, plus `SUPABASE_SECRET_KEY`, `GEMINI_API_KEY`, `TAVUS_API_KEY`,
   `TAVUS_PAL_ID` as server values). Redeploy after adding them.
4. `vercel.json` keeps SPA routing working (`/(.*)` → `/index.html`) while `/api/(.*)` still reaches the
   serverless functions.
5. Back in Supabase, add the production URL to **Auth → URL Configuration** as described in §8.

## 12. Troubleshooting

| Symptom | Cause / fix |
|---|---|
| "Supabase is not configured" | `.env.local` missing or not restarted; `VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY` must be set |
| Sign-up works but no email arrives | No custom SMTP, rate limit hit, or the address is filtered as spam. Configure Auth → SMTP, check Auth → Rate Limits, and confirm the site URL/redirect list |
| Confirmation link says "redirect not allowed" | The origin is missing from **Auth → URL Configuration → Redirect URLs** |
| Admin sign-up lands on the innovator dashboard | An admin already exists (single-admin rule), so the account became an innovator. Promote it with `promote_to_admin`, or sign in with the existing admin |
| Evaluator invite fails | `SUPABASE_SECRET_KEY` is not set on the server |
| Empty dashboards / 403 from the API | RLS: you are signed in with a role that cannot read that row. Check `profiles.role` for the account |
| AI chat says "Gemini is not configured" | `GEMINI_API_KEY` missing (server-side, not `VITE_`) |
| `/api/tavus-conversation` 404s locally | Expected: it only exists on Vercel, not in the Vite dev middleware |
| Fresh clone has no data | The migrations must be run against *your* Supabase project (§8); nothing is seeded except the rubric |

## 13. Credits

**Compiled by Tlhalefang Ntshilane** ([@botsedulearnsuperuser-del](https://github.com/botsedulearnsuperuser-del))
for the **CEDA Innovation Portal Hackathon, November 2026**, built with assistance from Codebuff
(`codebuff-team`).

- Client: CEDA — Citizen Entrepreneurial Development Agency, Gaborone, Botswana
- Brief: prototype of an online platform for the submission, evaluation, development and recognition of
  innovative ideas ("from submission through rigorous evaluation to well-deserved recognition and reward")
- Deployment: <https://cedainnovationportal.vercel.app>
- Source: <https://github.com/botsedulearnsuperuser-del/Sarakie>

Innovation IP developed for the winning company belongs to CEDA as set out in the hackathon rules. The
portal handles personal data in line with Botswana's Data Protection Act, 2024: collection is limited to
what an application needs, data is protected by row-level security and private storage, and access to
submissions is restricted to the applicant and the CEDA review team.
