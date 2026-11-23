-- Evaluator report -> adjudicator decision workflow.
--
-- Evaluators can read/write their own evaluation and mark their assignment
-- complete. Adjudicators can read every submitted report, the reviewer and
-- applicant profiles, and can notify the innovator of a decision.

-- 0. Adjudicators may read every application for oversight and decisions.
drop policy if exists applications_select on public.applications;
create policy applications_select on public.applications
  for select to authenticated
  using (
    innovator_id = auth.uid()
    or public.is_admin()
    or public.is_adjudicator()
    or public.is_assigned_evaluator(id)
    or public.is_application_collaborator(id)
  );

-- 1. Adjudicators may read submitted evaluations and the assignments behind them.
drop policy if exists evaluations_select on public.evaluations;
create policy evaluations_select on public.evaluations
  for select to authenticated
  using (
    evaluator_id = auth.uid()
    or public.is_admin()
    or public.is_adjudicator()
    or (
      released_to_innovator
      and exists (
        select 1 from public.applications a
        where a.id = application_id and a.innovator_id = auth.uid()
      )
    )
  );

drop policy if exists assignments_select on public.evaluation_assignments;
create policy assignments_select on public.evaluation_assignments
  for select to authenticated
  using (evaluator_id = auth.uid() or public.is_admin() or public.is_adjudicator());

-- 2. The assigned evaluator can mark their own assignment submitted.
drop policy if exists assignments_evaluator_update on public.evaluation_assignments;
create policy assignments_evaluator_update on public.evaluation_assignments
  for update to authenticated
  using (evaluator_id = auth.uid())
  with check (evaluator_id = auth.uid());

-- 3. Adjudicators need the reviewer name and the applicant contact details
--    that are shown on the application they are deciding.
drop policy if exists profiles_select_self_or_admin on public.profiles;
create policy profiles_select_self_or_admin on public.profiles
  for select to authenticated
  using (
    id = auth.uid()
    or public.is_admin()
    or public.is_adjudicator()
    -- An evaluator only needs the adjudicator directory so a submitted report
    -- can raise a notification for the people who decide it.
    or (public.is_evaluator() and role = 'adjudicator')
  );

-- 4. Workflow notifications:
--    evaluator -> adjudicator ("new evaluator report")
--    adjudicator -> innovator ("application approved/declined")
drop policy if exists notifications_admin_insert on public.notifications;
create policy notifications_workflow_insert on public.notifications
  for insert to authenticated
  with check (
    user_id = auth.uid()
    or public.is_admin()
    or (
      public.is_evaluator()
      and exists (
        select 1 from public.profiles p
        where p.id = user_id and p.role = 'adjudicator'
      )
    )
    or (
      public.is_adjudicator()
      and exists (
        select 1 from public.profiles p
        where p.id = user_id and p.role = 'innovator'
      )
    )
  );

-- 5. Adjudicators can manage evaluator invitations, like administrators.
drop policy if exists invitations_admin_select on public.evaluator_invitations;
create policy invitations_admin_select on public.evaluator_invitations
  for select to authenticated using (public.is_admin() or public.is_adjudicator());

drop policy if exists invitations_admin_write on public.evaluator_invitations;
create policy invitations_admin_write on public.evaluator_invitations
  for all to authenticated
  using (public.is_admin() or public.is_adjudicator())
  with check (public.is_admin() or public.is_adjudicator());
