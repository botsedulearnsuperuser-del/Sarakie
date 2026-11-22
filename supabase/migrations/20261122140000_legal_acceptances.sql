-- ============================================================================
-- CEDA Innovation Portal — legal acceptance audit trail
-- Records the exact terms version each user agreed to, with a server-side
-- timestamp, so acceptance is provable. Append-only: signed-in users may
-- insert their own acceptance and read it back; only admins may read others.
-- Safe to re-run.
-- ============================================================================

create table if not exists public.legal_acceptances (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  document    text not null default 'terms-and-privacy',
  version     integer not null check (version > 0),
  accepted_at timestamptz not null default now(),
  user_agent  text,
  unique (user_id, document, version)
);

create index if not exists legal_acceptances_user_idx
  on public.legal_acceptances (user_id, accepted_at desc);

-- Latest acknowledgement mirrored onto the profile for dashboards/reports.
alter table public.profiles add column if not exists legal_version integer;
alter table public.profiles add column if not exists legal_accepted_at timestamptz;

create or replace function public.sync_legal_acceptance()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.profiles
     set legal_version = new.version,
         legal_accepted_at = new.accepted_at
   where id = new.user_id
     and (legal_version is null or legal_version < new.version);
  return new;
end;
$$;

drop trigger if exists legal_acceptances_sync on public.legal_acceptances;
create trigger legal_acceptances_sync
  after insert on public.legal_acceptances
  for each row execute function public.sync_legal_acceptance();

alter table public.legal_acceptances enable row level security;

drop policy if exists legal_acceptances_select on public.legal_acceptances;
create policy legal_acceptances_select on public.legal_acceptances
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists legal_acceptances_insert on public.legal_acceptances;
create policy legal_acceptances_insert on public.legal_acceptances
  for insert to authenticated
  with check (user_id = auth.uid() and version > 0);

-- No update or delete policies: the record is immutable, even for its owner.
revoke all on public.legal_acceptances from anon;

grant select, insert on public.legal_acceptances to authenticated;

commit;
