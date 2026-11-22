-- ============================================================================
-- CEDA Innovation Portal — two-factor authentication flag
-- The factor itself lives in `auth.mfa_factors` (Supabase Auth, TOTP/RFC 6238).
-- These columns mirror the state onto the profile so reports and the admin view
-- can see which accounts are protected without touching the auth schema.
-- Safe to re-run.
-- ============================================================================

alter table public.profiles add column if not exists mfa_enabled boolean not null default false;
alter table public.profiles add column if not exists mfa_enrolled_at timestamptz;

commit;
