import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  read_time_minutes: number;
  published_at: string | null;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, category, read_time_minutes, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (data) setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Automind Blog",
    url: "https://myautomind.com/blog",
    description:
      "Savjeti, studije slučaja i novosti iz svijeta AI automatizacije za lokalne tvrtke u Hrvatskoj.",
    inLanguage: "hr",
    isPartOf: { "@id": "https://myautomind.com/#website" },
    hasPart: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://myautomind.com/blog/${p.slug}`,
      datePublished: p.published_at ?? undefined,
    })),
  };


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
      <Helmet>
        <title>Blog | Automind — AI automatizacija za firme</title>
        <meta
          name="description"
          content="Savjeti, studije slučaja i novosti iz svijeta AI automatizacije. Saznaj kako AI agenti i chatboti mijenjaju poslovanje firmi u Hrvatskoj."
        />
        <link rel="canonical" href="https://myautomind.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myautomind.com/blog" />
        <meta property="og:title" content="Blog | Automind — AI automatizacija za firme" />
        <meta
          property="og:description"
          content="Savjeti i studije slučaja o AI automatizaciji za lokalne firme u Hrvatskoj."
        />
        <meta name="twitter:title" content="Blog | Automind" />
        <meta
          name="twitter:description"
          content="Savjeti i studije slučaja o AI automatizaciji za lokalne firme u Hrvatskoj."
        />
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>
      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Blog</h1>
          <p className="text-muted-foreground text-lg mb-12">
            Savjeti, studije slučaja i novosti iz svijeta AI automatizacije za firme.
          </p>

          {loading && (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-40 rounded-2xl bg-foreground/5 animate-pulse" />
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <p className="text-muted-foreground">Uskoro dolaze novi članci.</p>
          )}

          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-foreground/10 bg-foreground/5 p-6 hover:border-foreground/20 transition-all"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
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
                <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Čitaj više{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
