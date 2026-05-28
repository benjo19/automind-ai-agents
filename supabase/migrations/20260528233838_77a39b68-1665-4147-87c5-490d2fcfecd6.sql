CREATE TABLE public.voice_demo_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  agent_id TEXT,
  lead_id TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  stop_cause TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT,
  page_url TEXT,
  user_agent TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.voice_demo_sessions TO service_role;

ALTER TABLE public.voice_demo_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny anon access to voice_demo_sessions"
ON public.voice_demo_sessions
AS RESTRICTIVE
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Service role full access"
ON public.voice_demo_sessions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE INDEX idx_voice_demo_sessions_started_at ON public.voice_demo_sessions(started_at DESC);
CREATE INDEX idx_voice_demo_sessions_session_id ON public.voice_demo_sessions(session_id);