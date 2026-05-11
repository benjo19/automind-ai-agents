import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import FAQ from "./components/FAQ";
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

function getPage() {
  const hash = window.location.hash;
  if (hash.startsWith('#/blog/')) return { page: 'post', slug: hash.slice(7) };
  if (hash === '#/blog') return { page: 'blog', slug: null };
  return { page: 'home', slug: null };
}

const App = () => {
  const [nav, setNav] = useState(getPage);

  useEffect(() => {
    const handler = () => setNav(getPage());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const goToBlog = () => { window.location.hash = '#/blog'; };
  const goToPost = (slug: string) => { window.location.hash = `#/blog/${slug}`; };
  const goHome = () => { window.location.hash = ''; };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <Navbar onBlogClick={goToBlog} onHomeClick={goHome} />
          {nav.page === 'home' && <><Hero /><HowItWorks /><FAQ /><Footer /></>}
          {nav.page === 'blog' && <Blog onSelectPost={goToPost} />}
          {nav.page === 'post' && <BlogPost slug={nav.slug || ''} onBack={goToBlog} />}
        </div>
        <CookieConsent />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
