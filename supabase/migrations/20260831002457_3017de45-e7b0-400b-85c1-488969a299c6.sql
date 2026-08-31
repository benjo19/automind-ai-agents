CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.mcp_admin_allowlist (
  email text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.mcp_admin_allowlist TO service_role;
ALTER TABLE public.mcp_admin_allowlist ENABLE ROW LEVEL SECURITY;

INSERT INTO public.mcp_admin_allowlist (email) VALUES ('auto.mind.ai2025@gmail.com');

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_mcp_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = 'admin'
  ) OR EXISTS (
    SELECT 1
    FROM auth.users u
    JOIN public.mcp_admin_allowlist a ON lower(u.email) = lower(a.email)
    WHERE u.id = _user_id AND u.email_confirmed_at IS NOT NULL
  )
$$;

REVOKE EXECUTE ON FUNCTION public.is_mcp_admin(uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.is_mcp_admin(uuid) TO authenticated, service_role;

CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());