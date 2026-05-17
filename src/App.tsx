import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import CookieConsent from "./components/CookieConsent";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import BeforeAfter from "./components/BeforeAfter";
import ConcreteActions from "./components/ConcreteActions";
import MissedLeadCost from "./components/MissedLeadCost";
import SolutionCards from "./components/SolutionCards";
import TargetIndustries from "./components/TargetIndustries";
import { LanguageProvider } from "./lib/i18n";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

type NavState = { page: string; slug: string | null };

function getPage(): NavState {
  const hash = window.location.hash;
  if (hash.startsWith('#/blog/')) return { page: 'post', slug: hash.slice(7) };
  if (hash === '#/blog') return { page: 'blog', slug: null };
  return { page: 'home', slug: null };
}

const App = () => {
  const [nav, setNav] = useState<NavState>(getPage);

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
      <LanguageProvider>
      <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          <Navbar onBlogClick={goToBlog} onHomeClick={goHome} />
          {nav.page === 'home' && (
            <>
              <Hero />
              <Stats />
              <Services />
              <SolutionCards />
              <HowItWorks />
              <ConcreteActions />
              <BeforeAfter />
              <MissedLeadCost />
              <Testimonials />
              <TargetIndustries />
              <FAQ />
              <Footer />
            </>
          )}
          {nav.page === 'blog' && <Blog onSelectPost={goToPost} />}
          {nav.page === 'post' && <BlogPost slug={nav.slug ?? ''} onBack={goToBlog} />}
        </div>
        <CookieConsent />
      </TooltipProvider>
      </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
