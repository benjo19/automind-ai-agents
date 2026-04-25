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

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Automind – Prilagođena AI rješenja za vaš posao</title>
        <meta 
          name="description" 
          content="Prilagođena AI rješenja za vaš posao — od prvog razgovora do pokretanja. Bez gotovih paketa, s jasnim opsegom i osobnim pristupom." 
        />
        <meta name="keywords" content="AI rješenja, personalizirani pristup, automatizacija, voice agent, chat agent, Hrvatska" />
        <meta property="og:title" content="Automind – Prilagođena AI rješenja za vaš posao" />
        <meta 
          property="og:description" 
          content="Prilagođena AI rješenja za vaš posao — od prvog razgovora do pokretanja. Bez gotovih paketa." 
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
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Kako izgleda suradnja?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nakon kratkog razgovora pripremamo prijedlog rješenja prilagođen vašim potrebama, s jasnim opsegom i rokovima — bez fiksnih paketa."
                }
              },
              {
                "@type": "Question",
                "name": "Koliko brzo možemo krenuti?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Najčešće u 24h. Naš tim priprema sve potrebne postavke prema vašim specifikacijama."
                }
              },
              {
                "@type": "Question",
                "name": "Je li rješenje prilagođeno baš nama?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Da. Svaki projekt kreće od razgovora — ne nudimo gotove pakete, već rješenje koje ima smisla za vaše poslovanje."
                }
              },
              {
                "@type": "Question",
                "name": "Što ako trebam podršku?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pružamo kontinuiranu podršku putem emaila, a po potrebi i prioritetnu podršku s bržim vremenom odgovora — sve dogovaramo individualno."
                }
              },
              {
                "@type": "Question",
                "name": "Koliko košta?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cijena ovisi o kompleksnosti rješenja. Razgovaramo, slušamo i dajemo ponudu prilagođenu vašem budgetu. Nema skrivenih troškova ni iznenađenja."
                }
              },
              {
                "@type": "Question",
                "name": "Postoji li ugovor ili obveza?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bez dugoročnih obveza. Sve dogovaramo individualno s jasnim uvjetima prije početka suradnje."
                }
              },
              {
                "@type": "Question",
                "name": "Gdje se pohranjuju moji podaci?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Infrastruktura je unutar EU, u skladu s GDPR propisima. Vaši podaci nisu dijeljeni s trećim stranama."
                }
              },
              {
                "@type": "Question",
                "name": "Što ako nisam zadovoljan rezultatom?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ostajemo uz vas dok rješenje ne radi kako treba. Prilagodbe i podrška su dio svake suradnje."
                }
              }
            ]
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
