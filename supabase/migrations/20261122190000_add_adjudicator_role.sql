-- Add the adjudicator role required by the brief (submitters, evaluators, adjudicators, administrators).
alter type public.user_role add value if not exists 'adjudicator';

-- Helper used inside RLS policies.
create or replace function public.is_adjudicator()
returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce((select role = 'adjudicator' from public.profiles where id = auth.uid()), false);
$$;

-- Adjudicators may view applications for oversight (scores/comments), like admins/evaluators.
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
        or public.is_adjudicator()
        or public.is_assigned_evaluator(a.id)
      )
  );
$$;

-- Adjudicators may read the audit trail for oversight.
drop policy if exists audit_select_admin on public.audit_log;
create policy audit_select_admin on public.audit_log
  for select to authenticated
  using (public.is_admin() or public.is_adjudicator());

-- Any signed-in user may append their own audit entries (actor_id = self).
drop policy if exists audit_insert_own on public.audit_log;
create policy audit_insert_own on public.audit_log
  for insert to authenticated
  with check (actor_id = auth.uid());