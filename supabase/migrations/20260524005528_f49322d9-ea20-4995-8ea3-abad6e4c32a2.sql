-- Restrict SECURITY DEFINER function to service role only
REVOKE EXECUTE ON FUNCTION public.match_conversations(extensions.vector, text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.match_conversations(extensions.vector, text, integer) TO service_role;

-- Explicit deny policies on conversations for anon and authenticated roles
CREATE POLICY "Deny anon access to conversations"
  ON public.conversations
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);
