import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ConcreteActions from "@/components/ConcreteActions";
import TargetIndustries from "@/components/TargetIndustries";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import SolutionCards from "@/components/SolutionCards";
import HowItWorks from "@/components/HowItWorks";
import BeforeAfter from "@/components/BeforeAfter";
import Testimonials from "@/components/Testimonials";
import MissedLeadCost from "@/components/MissedLeadCost";
import FAQ from "@/components/FAQ";
import DemoForm from "@/components/DemoForm";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieConsent from "@/components/CookieConsent";
import { useLanguage } from "@/lib/i18n";

const Index = () => {
  const { t } = useLanguage();
  const faqSchema = t.faq.items.map(([question, answer]) => ({
    "@type": "Question",
    "name": question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": answer,
    },
  }));

  return (
    <>
      <Helmet>
        <title>{t.seo.title}</title>
        <meta 
          name="description" 
          content={t.seo.description} 
        />
        <meta name="keywords" content={t.seo.keywords} />
        <meta property="og:title" content={t.seo.title} />
        <meta 
          property="og:description" 
          content={t.seo.description} 
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://automind.hr" />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Automind",
            "description": t.seo.orgDescription,
            "url": "https://automind.hr",
            "logo": "https://automind.hr/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+385 91 000 0000",
              "contactType": "Sales",
              "email": "info@automind.hr",
              "areaServed": "HR",
              "availableLanguage": "Croatian"
            },
            "sameAs": [
              "https://www.linkedin.com/company/automind",
              "https://twitter.com/automind"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqSchema
          })}
        </script>
      </Helmet>

      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <ConcreteActions />
        <TargetIndustries />
        <DemoForm />
        <Stats />
        <Services />
        <SolutionCards />
        <HowItWorks />
        <BeforeAfter />
        <Testimonials />
        <MissedLeadCost />
        <FAQ />
        <Footer />
      </main>
      <ChatWidget />
      <CookieConsent />
    </>
  );
};

export default Index;
