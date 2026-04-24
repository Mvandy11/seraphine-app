-- Migration: profiles table with 7-day trial
-- Applied: 2026-04-23

-- Create profiles table (idempotent)
CREATE TABLE IF NOT EXISTS public.profiles (
  id                   UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name         TEXT,
  avatar_url           TEXT,
  trial_start          TIMESTAMPTZ,
  trial_end            TIMESTAMPTZ,
  subscription_status  TEXT NOT NULL DEFAULT 'none',
  birthday             DATE,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add columns if upgrading from older schema
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS trial_start          TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS trial_end            TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS subscription_status  TEXT NOT NULL DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS birthday             DATE,
  ADD COLUMN IF NOT EXISTS updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Row-level security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_self" ON public.profiles;
CREATE POLICY "profiles_self"
  ON public.profiles FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Auto-create profile with 7-day trial on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, trial_start, trial_end)
  VALUES (NEW.id, NOW(), NOW() + INTERVAL '7 days')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
