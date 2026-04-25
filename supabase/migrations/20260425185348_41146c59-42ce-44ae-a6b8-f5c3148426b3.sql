CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_key TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  embedding VECTOR(768),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE INDEX conversations_client_key_created_at_idx
  ON public.conversations (client_key, created_at DESC);

CREATE INDEX conversations_embedding_idx
  ON public.conversations
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100)
  WHERE embedding IS NOT NULL;

CREATE OR REPLACE FUNCTION public.match_conversations(
  query_embedding VECTOR(768),
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
SET search_path = public
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