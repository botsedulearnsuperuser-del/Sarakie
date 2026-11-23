-- Let the very first administrator create their account from /admin-sign-up.
--
-- The evaluator migration deliberately stopped trusting browser metadata for a
-- role, which meant /admin-sign-up created an untouched `innovator` profile and
-- the new account could never reach the admin dashboard. The portal has to be
-- bootstrapped somehow, so:
--
--   * the first account that asks for `admin` becomes the administrator;
--   * once one admin profile exists (the `profiles_single_admin` unique index
--     allows exactly one), the role is never taken from metadata again —
--     evaluators still come from invitations, everyone else is an innovator.
--
-- Service-role code (admin.auth.admin) is unaffected: it can still set any role.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  invited public.evaluator_invitations%rowtype;
  requested text := lower(coalesce(new.raw_user_meta_data ->> 'role', ''));
  admin_exists boolean;
begin
  select exists (select 1 from public.profiles where role = 'admin')
    into admin_exists;

  select *
    into invited
    from public.evaluator_invitations
   where lower(email) = lower(new.email)
     and status in ('pending', 'invited')
   order by created_at desc
   limit 1;

  begin
    insert into public.profiles (id, role, full_name, email, phone, organization)
    values (
      new.id,
      case
        when requested = 'admin' and not admin_exists then 'admin'::public.user_role
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
  exception when unique_violation then
    -- Two people raced for the first admin seat: the loser is an innovator.
    insert into public.profiles (id, role, full_name, email, phone, organization)
    values (
      new.id,
      'innovator'::public.user_role,
      coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
      new.email,
      new.raw_user_meta_data ->> 'phone',
      new.raw_user_meta_data ->> 'organization'
    )
    on conflict (id) do nothing;
  end;

  if invited.id is not null then
    update public.evaluator_invitations
       set status = 'invited',
           user_id = new.id
     where id = invited.id;
  end if;

  return new;
end;
$function$;
