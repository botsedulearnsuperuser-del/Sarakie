-- ============================================================================
-- CEDA Innovation Portal — application collaborators
--
-- Team members chosen on the submission step are stored per application so
-- they survive the browser and actually grant access:
--   * the application row (applications_select)
--   * its documents, corrections and feedback (`can_view_application`)
--   * the private storage objects under `<application_id>/...`
--
-- A collaborator is matched to a signed-in user by `profile_id` when known, or
-- by email otherwise, so someone invited before creating an account gains
-- access the moment they sign up with that email.
--
-- Safe to re-run.
-- ============================================================================

create table if not exists public.application_collaborators (
  id             uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  profile_id     uuid references public.profiles (id) on delete set null,
  email          text not null check (email = lower(btrim(email))),
  full_name      text,
  invited_by     uuid references public.profiles (id) on delete set null,
  status         text not null default 'assigned'
                   check (status in ('assigned', 'revoked')),
  created_at     timestamptz not null default now(),
  unique (application_id, email)
);

create index if not exists application_collaborators_app_idx
  on public.application_collaborators (application_id);
create index if not exists application_collaborators_profile_idx
  on public.application_collaborators (profile_id);
create index if not exists application_collaborators_email_idx
  on public.application_collaborators (lower(email));

-- Is the signed-in user a collaborator on this application? ----------------
create or replace function public.is_application_collaborator(app_id uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1
    from public.application_collaborators c
    join public.profiles p on p.id = auth.uid()
    where c.application_id = app_id
      and c.status = 'assigned'
      and (
        c.profile_id = auth.uid()
        or (p.email is not null and lower(c.email) = lower(p.email))
      )
  );
$$;

-- Fold collaborators into the shared read check used by documents, storage,
-- corrections and feedback.
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
        or public.is_application_collaborator(a.id)
      )
  );
$$;

-- The base applications policy is written out separately, so it needs the
-- collaborator branch too.
drop policy if exists applications_select on public.applications;
create policy applications_select on public.applications
  for select to authenticated
  using (
    innovator_id = auth.uid()
    or public.is_admin()
    or public.is_assigned_evaluator(id)
    or public.is_application_collaborator(id)
  );

-- Collaborators table RLS --------------------------------------------------
alter table public.application_collaborators enable row level security;

drop policy if exists collaborators_select on public.application_collaborators;
create policy collaborators_select on public.application_collaborators
  for select to authenticated
  using (public.can_view_application(application_id));

drop policy if exists collaborators_insert on public.application_collaborators;
create policy collaborators_insert on public.application_collaborators
  for insert to authenticated
  with check (
    invited_by = auth.uid()
    and (
      public.is_admin()
      or exists (
        select 1 from public.applications a
        where a.id = application_id and a.innovator_id = auth.uid()
      )
    )
  );

drop policy if exists collaborators_update on public.application_collaborators;
create policy collaborators_update on public.application_collaborators
  for update to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.applications a
      where a.id = application_id and a.innovator_id = auth.uid()
    )
  )
  with check (
    public.is_admin()
    or exists (
      select 1 from public.applications a
      where a.id = application_id and a.innovator_id = auth.uid()
    )
  );

drop policy if exists collaborators_delete on public.application_collaborators;
create policy collaborators_delete on public.application_collaborators
  for delete to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.applications a
      where a.id = application_id and a.innovator_id = auth.uid()
    )
  );

revoke all on public.application_collaborators from anon;
grant select, insert, update, delete on public.application_collaborators to authenticated;
grant execute on function public.is_application_collaborator(uuid) to authenticated;
