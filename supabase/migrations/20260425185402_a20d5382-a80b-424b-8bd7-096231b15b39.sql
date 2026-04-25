CREATE SCHEMA IF NOT EXISTS extensions;

ALTER EXTENSION vector SET SCHEMA extensions;

DROP FUNCTION IF EXISTS public.match_conversations(vector, text, int);

CREATE OR REPLACE FUNCTION public.match_conversations(
  query_embedding extensions.vector(768),
  match_client_key TEXT,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  role TEXT,
  content TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE,
  similarity FLOAT
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT
    conversations.id,
    conversations.role,
    conversations.content,
    conversations.metadata,
    conversations.created_at,
    1 - (conversations.embedding <=> query_embedding) AS similarity
  FROM public.conversations
  WHERE conversations.client_key = match_client_key
    AND conversations.embedding IS NOT NULL
  ORDER BY conversations.embedding <=> query_embedding
  LIMIT LEAST(match_count, 10);
$$;

CREATE POLICY "Backend service can manage conversation memory"
ON public.conversations
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);