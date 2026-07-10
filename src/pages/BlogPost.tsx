import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  category: string;
  read_time_minutes: number;
  published_at: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (data) {
        setPost(data);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);


  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("hr-HR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Natrag na blog
          </Link>

          {loading && (
            <div className="space-y-4">
              <div className="h-10 w-3/4 rounded-lg bg-foreground/5 animate-pulse" />
              <div className="h-4 w-1/2 rounded-lg bg-foreground/5 animate-pulse" />
              <div className="h-64 rounded-xl bg-foreground/5 animate-pulse mt-8" />
            </div>
          )}

          {notFound && !loading && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">Članak nije pronađen.</p>
              <Link to="/blog" className="text-accent hover:underline">
                Pogledaj sve članke
              </Link>
            </div>
          )}

          {post && !loading && (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.published_at)}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {post.read_time_minutes} min čitanja
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-10 leading-relaxed border-l-2 border-accent pl-4">
                {post.excerpt}
              </p>

              <article
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-foreground
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground
                  prose-li:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-16 pt-8 border-t border-foreground/10">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Svi članci
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
