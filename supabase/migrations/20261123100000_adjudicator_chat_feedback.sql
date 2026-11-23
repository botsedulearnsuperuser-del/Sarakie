-- Enable innovator<->adjudicator chat and the feedback/resubmit loop.
-- Adjudicators act as oversight reviewers: they may post feedback, request
-- corrections and move an application back to "returned" so the innovator
-- can address the notes and resubmit.

-- 1. Allow adjudicators to insert feedback comments on any application they can view.
drop policy if exists feedback_insert on public.feedback_comments;
create policy feedback_insert on public.feedback_comments
  for insert to authenticated
  with check (
    author_id = auth.uid()
    and public.can_view_application(application_id)
    and (
      public.is_admin()
      or public.is_adjudicator()
      or (author_role = 'evaluator' and public.is_assigned_evaluator(application_id))
      or (author_role = 'innovator' and exists (
        select 1 from public.applications a
        where a.id = application_id and a.innovator_id = auth.uid()
      ))
    )
  );

-- 2. Allow adjudicators to request corrections.
drop policy if exists corrections_insert on public.application_corrections;
create policy corrections_insert on public.application_corrections
  for insert to authenticated
  with check (
    requested_by = auth.uid()
    and (public.is_admin() or public.is_adjudicator() or public.is_assigned_evaluator(application_id))
  );

-- 3. Allow adjudicators to update applications (status, decision note) for oversight.
drop policy if exists applications_update on public.applications;
create policy applications_update on public.applications
  for update to authenticated
  using (public.can_edit_application(id) or public.is_admin() or public.is_adjudicator())
  with check (public.can_edit_application(id) or public.is_admin() or public.is_adjudicator());

-- 4. Allow adjudicators to read feedback threads they participate in (already via can_view_application).
-- Ensure adjudicator author_role is accepted (user_role enum already includes it).
-- (No-op guard: nothing to change for reads.)
commit;
