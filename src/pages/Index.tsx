import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieConsent from "@/components/CookieConsent";
import DemoForm from "@/components/DemoForm";

import HeroReceptionist from "@/components/landing/HeroReceptionist";
import ProblemSection from "@/components/landing/ProblemSection";
import HowItWorks3 from "@/components/landing/HowItWorks3";
import IndustryGrid from "@/components/landing/IndustryGrid";
import FeatureGrid from "@/components/landing/FeatureGrid";
import ROICalculator from "@/components/landing/ROICalculator";
import DemoConversation from "@/components/landing/DemoConversation";
import PricingTeaser from "@/components/landing/PricingTeaser";
import FAQReceptionist from "@/components/landing/FAQReceptionist";
import FinalCTA from "@/components/landing/FinalCTA";

const TITLE = "AutoMind — AI recepcionar koji odgovara dok vi radite";
const DESC = "AutoMind preuzima propuštene pozive, poruke i upite, kvalificira klijente i pretvara ih u rezervacije ili dogovorene termine. Za salone, praonice, servise, ordinacije i lokalne uslužne biznise.";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="keywords" content="AI recepcionar, AI agent hrvatski, automatizacija poziva, WhatsApp AI, rezervacije termina, lokalni biznis" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://automind.hr" />
      </Helmet>

      <Navbar />
      <main className="min-h-screen bg-background">
        <HeroReceptionist />
        <ProblemSection />
        <HowItWorks3 />
        <IndustryGrid />
        <FeatureGrid />
        <ROICalculator />
        <DemoConversation />
        <PricingTeaser />
        <FAQReceptionist />
        <DemoForm />
        <FinalCTA />
      </main>
      <Footer />
      <ChatWidget />
      <CookieConsent />
    </>
  );
};

export default Index;
