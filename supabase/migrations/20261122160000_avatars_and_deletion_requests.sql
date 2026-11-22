-- ============================================================================
-- CEDA Innovation Portal — profile media and account deletion requests
--
-- `avatars`: private bucket, one folder per user (`<uid>/avatar-...`). RLS on
-- storage.objects restricts every operation to the owner's own folder, and the
-- app hands out short-lived signed URLs instead of making objects public.
--
-- `account_deletion_requests`: a signed-in user may file a request for their own
-- account and read it back; only admins can read or action the queue. Deleting
-- the auth user itself stays a service-role operation, never a browser one.
-- Safe to re-run.
-- ============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars', 'avatars', false, 5242880,
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do nothing;

drop policy if exists "avatars read own" on storage.objects;
create policy "avatars read own" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatars insert own" on storage.objects;
create policy "avatars insert own" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatars update own" on storage.objects;
create policy "avatars update own" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatars delete own" on storage.objects;
create policy "avatars delete own" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create table if not exists public.account_deletion_requests (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles (id) on delete cascade,
  email        text not null,
  reason       text,
  status       text not null default 'pending'
                 check (status in ('pending', 'approved', 'rejected', 'completed')),
  requested_at timestamptz not null default now(),
  handled_by   uuid references public.profiles (id) on delete set null,
  handled_at   timestamptz
);

create index if not exists deletion_requests_status_idx
  on public.account_deletion_requests (status, requested_at desc);

alter table public.account_deletion_requests enable row level security;

drop policy if exists deletion_requests_select on public.account_deletion_requests;
create policy deletion_requests_select on public.account_deletion_requests
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists deletion_requests_insert on public.account_deletion_requests;
create policy deletion_requests_insert on public.account_deletion_requests
  for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists deletion_requests_admin_update on public.account_deletion_requests;
create policy deletion_requests_admin_update on public.account_deletion_requests
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

revoke all on public.account_deletion_requests from anon;
grant select, insert on public.account_deletion_requests to authenticated;
grant update on public.account_deletion_requests to authenticated;

commit;
