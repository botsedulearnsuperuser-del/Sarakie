-- Evaluator accounts are created by an administrator only.
--
-- 1. Only one profile may hold the admin role.
-- 2. A new signup is an innovator unless a pending administrator invitation
--    exists for that email address. Metadata supplied by the browser is never
--    trusted for the role.
-- 3. A profile can only change role through an administrator.

create table if not exists public.evaluator_invitations (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text not null,
  phone text,
  organization text,
  status text not null default 'pending'
    check (status in ('pending', 'invited', 'accepted', 'revoked')),
  invited_by uuid references public.profiles (id) on delete set null,
  user_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  last_sent_at timestamptz
);

create unique index if not exists evaluator_invitations_active_email
  on public.evaluator_invitations (lower(email))
  where status in ('pending', 'invited');

alter table public.evaluator_invitations enable row level security;

drop policy if exists invitations_admin_select on public.evaluator_invitations;
create policy invitations_admin_select on public.evaluator_invitations
  for select to authenticated using (public.is_admin());

drop policy if exists invitations_admin_write on public.evaluator_invitations;
create policy invitations_admin_write on public.evaluator_invitations
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Only one administrator account can exist.
create unique index if not exists profiles_single_admin
  on public.profiles ((role))
  where role = 'admin';

-- Signup role comes from an administrator invitation, not request metadata.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  invited public.evaluator_invitations%rowtype;
begin
  select *
    into invited
    from public.evaluator_invitations
   where lower(email) = lower(new.email)
     and status in ('pending', 'invited')
   order by created_at desc
   limit 1;

  insert into public.profiles (id, role, full_name, email, phone, organization)
  values (
    new.id,
    case
      when invited.id is not null then 'evaluator'::public.user_role
      else 'innovator'::public.user_role
    end,
    coalesce(
      nullif(invited.full_name, ''),
      new.raw_user_meta_data ->> 'full_name',
      split_part(new.email, '@', 1)
    ),
    new.email,
    coalesce(nullif(invited.phone, ''), new.raw_user_meta_data ->> 'phone'),
    coalesce(nullif(invited.organization, ''), new.raw_user_meta_data ->> 'organization')
  )
  on conflict (id) do nothing;

  if invited.id is not null then
    update public.evaluator_invitations
       set status = 'invited',
           user_id = new.id
     where id = invited.id;
  end if;

  return new;
end;
$function$;

-- A signed-in person cannot promote themselves (or anyone else) by updating
-- their profile row. Service-role writes and administrators are allowed.
create or replace function public.guard_profile_role()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if new.role is distinct from old.role
     and auth.uid() is not null
     and not public.is_admin() then
    raise exception 'Only a CEDA administrator can change account roles';
  end if;
  return new;
end;
$function$;

drop trigger if exists profiles_guard_role on public.profiles;
create trigger profiles_guard_role
  before update on public.profiles
  for each row execute function public.guard_profile_role();
