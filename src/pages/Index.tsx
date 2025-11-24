import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import SolutionCards from "@/components/SolutionCards";
import HowItWorks from "@/components/HowItWorks";
import BeforeAfter from "@/components/BeforeAfter";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import DemoForm from "@/components/DemoForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Automind – AI agenti (chat + voice) + auto-ponude i CRM</title>
        <meta 
          name="description" 
          content="AI agenti koji odgovaraju, zovu i automatski šalju ponude. Pametne integracije, CRM sustav, e-mail sekvence, analytics. Aktivacija u 24h." 
        />
        <meta name="keywords" content="AI agenti, chat bot, voice bot, automatizacija, CRM, ponude, email sekvence" />
        <meta property="og:title" content="Automind – AI agenti (chat + voice) + auto-ponude i CRM" />
        <meta 
          property="og:description" 
          content="AI agenti koji odgovaraju, zovu i automatski šalju ponude. Pametne integracije, CRM sustav, e-mail sekvence, analytics." 
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://automind.hr" />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Automind",
            "description": "AI agenti koji odgovaraju, prodaju, zovu i automatski šalju ponude",
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
            "@type": "Product",
            "name": "Automind AI Platform",
            "description": "Chat + Voice agenti s pametnim integracijama za automatizaciju prodaje",
            "brand": {
              "@type": "Brand",
              "name": "Automind"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Basic Plan",
                "price": "49",
                "priceCurrency": "EUR",
                "priceValidUntil": "2025-12-31"
              },
              {
                "@type": "Offer",
                "name": "Pro Plan",
                "price": "149",
                "priceCurrency": "EUR",
                "priceValidUntil": "2025-12-31"
              },
              {
                "@type": "Offer",
                "name": "Premium Plan",
                "price": "299",
                "priceCurrency": "EUR",
                "priceValidUntil": "2025-12-31"
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Koliko brzo možemo krenuti?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "U 24h s gotovim predlošcima. Naš tim priprema sve potrebne postavke i integracije prema vašim specifikacijama."
                }
              },
              {
                "@type": "Question",
                "name": "Je li moguć white-label?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Da, vaši logotipi i API ključevi. Možete potpuno prilagoditi brand i izgled prema vašim potrebama."
                }
              },
              {
                "@type": "Question",
                "name": "Podržavate li hrvatski voice?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Da, HR glasovi + ASR (automatsko prepoznavanje govora). Koristimo najnovije AI modele za prirodan hrvatski govor."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <main className="min-h-screen">
        <Hero />
        <Stats />
        <Services />
        <SolutionCards />
        <HowItWorks />
        <BeforeAfter />
        <Pricing />
        <Testimonials />
        <FAQ />
        <DemoForm />
        <Footer />
      </main>
    </>
  );
};

export default Index;
