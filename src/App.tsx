import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import CookieConsent from "./components/CookieConsent";
import ChatWidget from "./components/ChatWidget";
import { LanguageProvider } from "./lib/i18n";

import Home from "./pages/Home";
import AIRecepcionar from "./pages/AIRecepcionar";
import AIZaSalone from "./pages/AIZaSalone";
import AIZaOrdinacije from "./pages/AIZaOrdinacije";
import AIZaAutoServise from "./pages/AIZaAutoServise";
import AIZaPraonice from "./pages/AIZaPraonice";
import Cijene from "./pages/Cijene";
import PrimjeriKoristenja from "./pages/PrimjeriKoristenja";
import FAQPage from "./pages/FAQPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import CookiePolicy from "./pages/CookiePolicy";
import Install from "./pages/Install";
import ThankYou from "./pages/ThankYou";
import Login from "./pages/Login";
import OAuthConsent from "./pages/OAuthConsent";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-recepcionar" element={<AIRecepcionar />} />
            <Route path="/ai-za-salone" element={<AIZaSalone />} />
            <Route path="/ai-za-ordinacije" element={<AIZaOrdinacije />} />
            <Route path="/ai-za-auto-servise" element={<AIZaAutoServise />} />
            <Route path="/ai-za-praonice" element={<AIZaPraonice />} />
            <Route path="/cijene" element={<Cijene />} />
            <Route path="/primjeri" element={<PrimjeriKoristenja />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/politika-privatnosti" element={<PrivacyPolicy />} />
            <Route path="/uvjeti-koristenja" element={<TermsOfUse />} />
            <Route path="/kolacici" element={<CookiePolicy />} />
            <Route path="/install" element={<Install />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/hvala" element={<ThankYou />} />
            <Route path="/login" element={<Login />} />
            <Route path="/oauth/consent" element={<OAuthConsent />} />
            <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <CookieConsent />
        <ChatWidget />
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
