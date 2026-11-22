-- ============================================================================
-- CEDA Innovation Portal — initial schema, RLS and storage policies
-- Run once on a new Supabase project (SQL editor, or `supabase db push`).
-- Safe to re-run: types are guarded, tables use IF NOT EXISTS, policies are
-- dropped and recreated.
--
-- Roles: innovator (submits ideas), evaluator (scores assigned ideas),
--        admin (runs the whole system).
-- Key rule: an evaluator must never see an innovator's identity before a
-- decision, so evaluators read applications through the `evaluator_queue`
-- view, not the base table.
-- ============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- 1. Types
-- ---------------------------------------------------------------------------
do $$ begin
  create type public.user_role as enum ('innovator', 'evaluator', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.application_status as enum (
    'draft', 'submitted', 'screening', 'committee', 'due_diligence',
    'approved', 'rejected', 'returned'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.assignment_status as enum ('assigned', 'in_progress', 'submitted', 'overdue');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.feedback_status as enum ('unread', 'read', 'answered');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.recommendation as enum ('fund', 'revise', 'decline');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- 2. Tables
-- ---------------------------------------------------------------------------

-- One row per auth user. `role` decides what the portal shows them.
create table if not exists public.profiles (
  id               uuid primary key references auth.users (id) on delete cascade,
  role             public.user_role not null default 'innovator',
  full_name        text,
  email            text,
  phone            text,
  omang            text,
  organization     text,
  physical_address text,
  city             text,
  avatar_url       text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- A submission ("idea" / "application").
create table if not exists public.applications (
  id                       uuid primary key default gen_random_uuid(),
  reference                text not null unique
                             default ('SRK-IN-' || to_char(now(), 'YYYY') || '-' ||
                                      lpad((floor(random() * 99999))::int::text, 5, '0')),
  innovator_id             uuid not null references public.profiles (id) on delete cascade,
  title                    text not null,
  sector                   text,
  innovation_type          text,
  maturity_level           text,
  funding_requested        numeric(14, 2) check (funding_requested is null or funding_requested >= 0),
  expected_impact          text,
  target_market            text,
  competitive_advantage    text,
  projected_reach          text,
  timeline_to_market       text,
  regulatory_requirements  text,
  ip_protection            text,
  problem_statement        text,
  proposed_solution        text,
  target_beneficiaries    text,
  status                   public.application_status not null default 'submitted',
  decision_note            text,
  decided_at               timestamptz,
  submitted_at             timestamptz not null default now(),
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create index if not exists applications_innovator_idx on public.applications (innovator_id);
create index if not exists applications_status_idx    on public.applications (status);
create index if not exists applications_submitted_idx on public.applications (submitted_at desc);

-- Uploaded supporting documents. Object path is '<application_id>/<file>'.
create table if not exists public.application_documents (
  id             uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  uploaded_by    uuid not null references public.profiles (id) on delete cascade,
  file_name      text not null,
  storage_path   text not null unique,
  mime_type      text,
  size_bytes     bigint check (size_bytes is null or size_bytes >= 0),
  created_at     timestamptz not null default now()
);

create index if not exists application_documents_app_idx on public.application_documents (application_id);

-- "Corrections Required" — an evaluator/admin asking the innovator for changes.
create table if not exists public.application_corrections (
  id             uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  requested_by   uuid not null references public.profiles (id) on delete cascade,
  body           text not null,
  resolved_at    timestamptz,
  created_at     timestamptz not null default now()
);

create index if not exists corrections_app_idx on public.application_corrections (application_id);

-- Admin assigns an evaluator to an application.
create table if not exists public.evaluation_assignments (
  id             uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  evaluator_id   uuid not null references public.profiles (id) on delete cascade,
  assigned_by    uuid references public.profiles (id) on delete set null,
  status         public.assignment_status not null default 'assigned',
  due_at         timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  unique (application_id, evaluator_id)
);

create index if not exists assignments_evaluator_idx on public.evaluation_assignments (evaluator_id);
create index if not exists assignments_app_idx       on public.evaluation_assignments (application_id);

-- The scored review. Scores are keyed by rubric_criteria.key, 0-5 each.
create table if not exists public.evaluations (
  id                    uuid primary key default gen_random_uuid(),
  assignment_id         uuid not null unique references public.evaluation_assignments (id) on delete cascade,
  application_id        uuid not null references public.applications (id) on delete cascade,
  evaluator_id          uuid not null references public.profiles (id) on delete cascade,
  scores                jsonb not null default '{}'::jsonb,
  weighted_score        numeric(5, 2) check (weighted_score is null or (weighted_score >= 0 and weighted_score <= 100)),
  recommendation        public.recommendation,
  comments              text,
  released_to_innovator boolean not null default false,
  submitted_at          timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists evaluations_app_idx       on public.evaluations (application_id);
create index if not exists evaluations_evaluator_idx on public.evaluations (evaluator_id);

-- Weighted criteria shown on both dashboards (25/25/20/20/10).
create table if not exists public.rubric_criteria (
  key        text primary key,
  name       text not null,
  weight     numeric(5, 2) not null check (weight > 0 and weight <= 100),
  hint       text,
  position   int not null default 0,
  active     boolean not null default true
);

-- Feedback Centre: two-way thread between evaluator and innovator.
-- author_role is denormalised so the UI can label who wrote each message.
create table if not exists public.feedback_comments (
  id             uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  author_id      uuid not null references public.profiles (id) on delete cascade,
  author_role    public.user_role not null,
  parent_id      uuid references public.feedback_comments (id) on delete cascade,
  body           text not null,
  status         public.feedback_status not null default 'unread',
  visible_to_innovator boolean not null default true,
  created_at     timestamptz not null default now()
);

create index if not exists feedback_app_idx    on public.feedback_comments (application_id, created_at desc);
create index if not exists feedback_author_idx on public.feedback_comments (author_id);

create table if not exists public.deadlines (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  due_on      date not null,
  audience    public.user_role, -- null = everyone
  created_by  uuid references public.profiles (id) on delete set null,
  created_at  timestamptz not null default now()
);

create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles (id) on delete cascade,
  title      text not null,
  body       text,
  link       text,
  read_at    timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);

create table if not exists public.team_members (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.profiles (id) on delete set null,
  email       text not null,
  full_name   text,
  role        public.user_role not null default 'evaluator',
  status      text not null default 'invited' check (status in ('invited', 'active', 'removed')),
  invited_by  uuid references public.profiles (id) on delete set null,
  created_at  timestamptz not null default now(),
  unique (email)
);

-- Append-only audit trail for the admin overview.
create table if not exists public.audit_log (
  id           bigserial primary key,
  actor_id     uuid references public.profiles (id) on delete set null,
  action       text not null,
  entity_table text,
  entity_id    text,
  metadata     jsonb not null default '{}'::jsonb,
  ip           inet,
  created_at   timestamptz not null default now()
);

create index if not exists audit_log_created_idx on public.audit_log (created_at desc);

-- ---------------------------------------------------------------------------
-- 3. Helper functions (security definer: used inside RLS policies without
--    recursing back into the policies of `profiles`).
-- ---------------------------------------------------------------------------
create or replace function public.current_app_role()
returns public.user_role
language sql stable security definer set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce((select role = 'admin' from public.profiles where id = auth.uid()), false);
$$;

create or replace function public.is_evaluator()
returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce((select role = 'evaluator' from public.profiles where id = auth.uid()), false);
$$;

create or replace function public.is_assigned_evaluator(app_id uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.evaluation_assignments ea
    where ea.application_id = app_id and ea.evaluator_id = auth.uid()
  );
$$;

create or replace function public.can_view_application(app_id uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.applications a
    where a.id = app_id
      and (
        a.innovator_id = auth.uid()
        or public.is_admin()
        or public.is_assigned_evaluator(a.id)
      )
  );
$$;

-- Owner may edit while it is still a draft or has been returned for changes.
create or replace function public.can_edit_application(app_id uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.applications a
    where a.id = app_id
      and (
        public.is_admin()
        or (a.innovator_id = auth.uid() and a.status in ('draft', 'returned'))
      )
  );
$$;

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Create the profile row for a new auth user. Role can be supplied in the
-- sign-up metadata, but only known roles are accepted; anything else is an
-- innovator. Admins are promoted deliberately (see the seeded example below).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  requested text := new.raw_user_meta_data ->> 'role';
begin
  insert into public.profiles (id, role, full_name, email, phone, organization)
  values (
    new.id,
    case
      when requested in ('innovator', 'evaluator', 'admin') then requested::public.user_role
      else 'innovator'::public.user_role
    end,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email,
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'organization'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Attribute application status changes to the actor.
create or replace function public.log_application_status_change()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.status is distinct from old.status then
    insert into public.audit_log (actor_id, action, entity_table, entity_id, metadata)
    values (
      auth.uid(),
      'application.status_changed',
      'applications',
      new.id::text,
      jsonb_build_object('reference', new.reference, 'from', old.status, 'to', new.status)
    );
  end if;
  return new;
end;
$$;

drop trigger if exists applications_status_audit on public.applications;
create trigger applications_status_audit
  after update on public.applications
  for each row execute function public.log_application_status_change();

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists applications_touch on public.applications;
create trigger applications_touch before update on public.applications
  for each row execute function public.touch_updated_at();

drop trigger if exists assignments_touch on public.evaluation_assignments;
create trigger assignments_touch before update on public.evaluation_assignments
  for each row execute function public.touch_updated_at();

drop trigger if exists evaluations_touch on public.evaluations;
create trigger evaluations_touch before update on public.evaluations
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- 4. Anonymised view for evaluators.
--    Runs as its owner (security definer) so it can bypass application RLS
--    without exposing the innovator's identity columns.
-- ---------------------------------------------------------------------------
drop view if exists public.evaluator_queue;
create view public.evaluator_queue
with (security_invoker = false) as
  select
    ea.id                as assignment_id,
    a.id                 as application_id,
    a.reference,
    a.title,
    a.sector,
    a.innovation_type,
    a.maturity_level,
    a.funding_requested,
    a.expected_impact,
    a.submitted_at,
    a.status,
    ea.status            as assignment_status,
    ea.due_at,
    'IN-' || right(a.id::text, 4) as innovator_code
  from public.evaluation_assignments ea
  join public.applications a on a.id = ea.application_id
  where ea.evaluator_id = auth.uid()
    and public.is_evaluator();

revoke all on public.evaluator_queue from anon;
grant select on public.evaluator_queue to authenticated;

-- ---------------------------------------------------------------------------
-- 5. Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles              enable row level security;
alter table public.applications          enable row level security;
alter table public.application_documents enable row level security;
alter table public.application_corrections enable row level security;
alter table public.evaluation_assignments enable row level security;
alter table public.evaluations           enable row level security;
alter table public.rubric_criteria       enable row level security;
alter table public.feedback_comments     enable row level security;
alter table public.deadlines             enable row level security;
alter table public.notifications         enable row level security;
alter table public.team_members          enable row level security;
alter table public.audit_log             enable row level security;

-- profiles -----------------------------------------------------------------
drop policy if exists profiles_select_self_or_admin on public.profiles;
create policy profiles_select_self_or_admin on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

drop policy if exists profiles_admin_all on public.profiles;
create policy profiles_admin_all on public.profiles
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Only admins (or server-side service_role code) may change a role.
create or replace function public.guard_profile_role()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.role is distinct from old.role
     and not (public.is_admin() or auth.role() = 'service_role') then
    raise exception 'Only an admin can change a role' using errcode = '42501';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_guard_role on public.profiles;
create trigger profiles_guard_role before update on public.profiles
  for each row execute function public.guard_profile_role();

-- applications -------------------------------------------------------------
drop policy if exists applications_select on public.applications;
create policy applications_select on public.applications
  for select to authenticated
  using (
    innovator_id = auth.uid()
    or public.is_admin()
    or public.is_assigned_evaluator(id)
  );

drop policy if exists applications_insert on public.applications;
create policy applications_insert on public.applications
  for insert to authenticated
  with check (innovator_id = auth.uid() or public.is_admin());

drop policy if exists applications_update on public.applications;
create policy applications_update on public.applications
  for update to authenticated
  using (public.can_edit_application(id) or public.is_admin())
  with check (public.can_edit_application(id) or public.is_admin());

drop policy if exists applications_delete on public.applications;
create policy applications_delete on public.applications
  for delete to authenticated
  using (public.is_admin() or (innovator_id = auth.uid() and status = 'draft'));

-- documents ----------------------------------------------------------------
drop policy if exists documents_select on public.application_documents;
create policy documents_select on public.application_documents
  for select to authenticated
  using (public.can_view_application(application_id) or public.is_admin());

drop policy if exists documents_insert on public.application_documents;
create policy documents_insert on public.application_documents
  for insert to authenticated
  with check (uploaded_by = auth.uid() and (public.can_edit_application(application_id) or public.is_admin()));

drop policy if exists documents_delete on public.application_documents;
create policy documents_delete on public.application_documents
  for delete to authenticated
  using (uploaded_by = auth.uid() or public.is_admin());

-- corrections --------------------------------------------------------------
drop policy if exists corrections_select on public.application_corrections;
create policy corrections_select on public.application_corrections
  for select to authenticated
  using (public.can_view_application(application_id) or public.is_admin());

drop policy if exists corrections_insert on public.application_corrections;
create policy corrections_insert on public.application_corrections
  for insert to authenticated
  with check (
    requested_by = auth.uid()
    and (public.is_admin() or public.is_assigned_evaluator(application_id))
  );

drop policy if exists corrections_update on public.application_corrections;
create policy corrections_update on public.application_corrections
  for update to authenticated
  using (public.is_admin() or exists (
    select 1 from public.applications a
    where a.id = application_id and a.innovator_id = auth.uid()
  ))
  with check (public.is_admin() or exists (
    select 1 from public.applications a
    where a.id = application_id and a.innovator_id = auth.uid()
  ));

-- evaluation assignments ---------------------------------------------------
drop policy if exists assignments_select on public.evaluation_assignments;
create policy assignments_select on public.evaluation_assignments
  for select to authenticated
  using (evaluator_id = auth.uid() or public.is_admin());

drop policy if exists assignments_admin_write on public.evaluation_assignments;
create policy assignments_admin_write on public.evaluation_assignments
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- evaluations --------------------------------------------------------------
drop policy if exists evaluations_select on public.evaluations;
create policy evaluations_select on public.evaluations
  for select to authenticated
  using (
    evaluator_id = auth.uid()
    or public.is_admin()
    or (
      released_to_innovator
      and exists (
        select 1 from public.applications a
        where a.id = application_id and a.innovator_id = auth.uid()
      )
    )
  );

drop policy if exists evaluations_insert on public.evaluations;
create policy evaluations_insert on public.evaluations
  for insert to authenticated
  with check (
    evaluator_id = auth.uid()
    and public.is_assigned_evaluator(application_id)
  );

drop policy if exists evaluations_update on public.evaluations;
create policy evaluations_update on public.evaluations
  for update to authenticated
  using (evaluator_id = auth.uid() or public.is_admin())
  with check (evaluator_id = auth.uid() or public.is_admin());

drop policy if exists evaluations_delete on public.evaluations;
create policy evaluations_delete on public.evaluations
  for delete to authenticated
  using (public.is_admin());

-- rubric criteria: everyone signed in reads, admins manage ------------------
drop policy if exists rubric_select on public.rubric_criteria;
create policy rubric_select on public.rubric_criteria
  for select to authenticated using (true);

drop policy if exists rubric_admin_write on public.rubric_criteria;
create policy rubric_admin_write on public.rubric_criteria
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- feedback -----------------------------------------------------------------
drop policy if exists feedback_select on public.feedback_comments;
create policy feedback_select on public.feedback_comments
  for select to authenticated
  using (
    public.is_admin()
    or (public.can_view_application(application_id) and (visible_to_innovator or author_id = auth.uid()))
  );

drop policy if exists feedback_insert on public.feedback_comments;
create policy feedback_insert on public.feedback_comments
  for insert to authenticated
  with check (
    author_id = auth.uid()
    and public.can_view_application(application_id)
    and (
      public.is_admin()
      or (author_role = 'evaluator' and public.is_assigned_evaluator(application_id))
      or (author_role = 'innovator' and exists (
        select 1 from public.applications a
        where a.id = application_id and a.innovator_id = auth.uid()
      ))
    )
  );

drop policy if exists feedback_update on public.feedback_comments;
create policy feedback_update on public.feedback_comments
  for update to authenticated
  using (
    author_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.applications a
      where a.id = application_id and a.innovator_id = auth.uid()
    )
  )
  with check (
    author_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.applications a
      where a.id = application_id and a.innovator_id = auth.uid()
    )
  );

drop policy if exists feedback_delete on public.feedback_comments;
create policy feedback_delete on public.feedback_comments
  for delete to authenticated
  using (author_id = auth.uid() or public.is_admin());

-- deadlines ----------------------------------------------------------------
drop policy if exists deadlines_select on public.deadlines;
create policy deadlines_select on public.deadlines
  for select to authenticated
  using (audience is null or audience = public.current_app_role() or public.is_admin());

drop policy if exists deadlines_admin_write on public.deadlines;
create policy deadlines_admin_write on public.deadlines
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- notifications ------------------------------------------------------------
drop policy if exists notifications_select_own on public.notifications;
create policy notifications_select_own on public.notifications
  for select to authenticated using (user_id = auth.uid());

drop policy if exists notifications_update_own on public.notifications;
create policy notifications_update_own on public.notifications
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists notifications_admin_insert on public.notifications;
create policy notifications_admin_insert on public.notifications
  for insert to authenticated with check (public.is_admin() or user_id = auth.uid());

-- team ---------------------------------------------------------------------
drop policy if exists team_select on public.team_members;
create policy team_select on public.team_members
  for select to authenticated
  using (public.is_admin() or public.is_evaluator());

drop policy if exists team_admin_write on public.team_members;
create policy team_admin_write on public.team_members
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- audit log: admins read, admins append; nothing can edit or delete ---------
drop policy if exists audit_select_admin on public.audit_log;
create policy audit_select_admin on public.audit_log
  for select to authenticated using (public.is_admin());

drop policy if exists audit_insert_admin on public.audit_log;
create policy audit_insert_admin on public.audit_log
  for insert to authenticated with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- 6. Grants — signed-in users only; the anon role gets nothing.
-- ---------------------------------------------------------------------------
revoke all on public.profiles, public.applications, public.application_documents,
  public.application_corrections, public.evaluation_assignments, public.evaluations,
  public.rubric_criteria, public.feedback_comments, public.deadlines,
  public.notifications, public.team_members, public.audit_log from anon;

grant select, insert, update, delete on public.profiles,
  public.applications, public.application_documents, public.application_corrections,
  public.evaluation_assignments, public.evaluations, public.rubric_criteria,
  public.feedback_comments, public.deadlines, public.notifications,
  public.team_members, public.audit_log to authenticated;

grant usage, select on sequence public.audit_log_id_seq to authenticated;

grant execute on function
  public.current_app_role(), public.is_admin(), public.is_evaluator(),
  public.is_assigned_evaluator(uuid), public.can_view_application(uuid),
  public.can_edit_application(uuid)
  to authenticated;

-- ---------------------------------------------------------------------------
-- 7. Storage: private bucket for supporting documents.
--    Object path convention: '<application_id>/<file-name>'
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'application-documents', 'application-documents', false, 26214400,
  array['application/pdf', 'image/png', 'image/jpeg', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
on conflict (id) do nothing;

drop policy if exists "documents read" on storage.objects;
create policy "documents read" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'application-documents'
    and public.can_view_application(((storage.foldername(name))[1])::uuid)
  );

drop policy if exists "documents upload" on storage.objects;
create policy "documents upload" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'application-documents'
    and public.can_edit_application(((storage.foldername(name))[1])::uuid)
  );

drop policy if exists "documents delete" on storage.objects;
create policy "documents delete" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'application-documents'
    and (owner::text = auth.uid()::text or public.is_admin())
  );

-- ---------------------------------------------------------------------------
-- 8. Seed the rubric used by the innovator and evaluator dashboards.
-- ---------------------------------------------------------------------------
insert into public.rubric_criteria (key, name, weight, hint, position)
values
  ('problem_market',   'Problem and market need',        25, 'Real, sizeable problem.',   1),
  ('solution_feasible','Solution and feasibility',       25, 'Works and is buildable.',   2),
  ('team_capability',  'Team and capability',            20, 'Who delivers it.',          3),
  ('financial',        'Financial projections',          20, 'Numbers add up.',           4),
  ('impact_youth',     'Impact and youth ownership',     10, 'Who benefits, who owns it.', 5)
on conflict (key) do update
  set name = excluded.name, weight = excluded.weight,
      hint = excluded.hint, position = excluded.position;

-- ---------------------------------------------------------------------------
-- 9. Promotion helper (run by hand in the SQL editor, never from the browser).
--    select public.promote_to_admin('admin@ceda.co.bw');
-- ---------------------------------------------------------------------------
create or replace function public.promote_to_admin(target_email text)
returns void language sql security definer set search_path = public as $$
  update public.profiles set role = 'admin' where email = target_email;
$$;

revoke all on function public.promote_to_admin(text) from anon, authenticated;

commit;
