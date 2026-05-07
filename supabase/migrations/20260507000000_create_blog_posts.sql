CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  category TEXT NOT NULL DEFAULT 'Automatizacija',
  read_time_minutes INTEGER NOT NULL DEFAULT 5,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts"
  ON public.blog_posts
  FOR SELECT
  USING (published = true);

CREATE INDEX blog_posts_slug_idx ON public.blog_posts (slug);
CREATE INDEX blog_posts_published_at_idx ON public.blog_posts (published_at DESC) WHERE published = true;
