REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.is_mcp_admin(uuid) FROM anon;

CREATE POLICY "Admin allowlist is backend-only"
ON public.mcp_admin_allowlist FOR SELECT TO authenticated
USING (false);