import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import TargetIndustries from "@/components/TargetIndustries";
import OrderlySection from "@/components/OrderlySection";
import DemoForm from "@/components/DemoForm";
import ClientLogos from "@/components/ClientLogos";
import { useLanguage } from "@/lib/i18n";


const Home = () => {
  const { t } = useLanguage();
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://myautomind.com/#faq",
    isPartOf: { "@id": "https://myautomind.com/#webpage" },
    mainEntity: t.faq.items.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
  <>
    <Helmet>
      <title>AutoMind AI — automatizacije i aplikacije po mjeri</title>
      <meta
        name="description"
        content="AutoMind AI automatizira upite, rezervacije, prodaju, narudžbe i administraciju te izrađuje aplikacije po mjeri vašeg poslovnog procesa."
      />
      <link rel="canonical" href="https://myautomind.com/" />
      <meta property="og:url" content="https://myautomind.com/" />
      <meta property="og:title" content="AutoMind AI — automatizacije i aplikacije po mjeri" />
      <meta property="og:description" content="Sustavi koji automatiziraju upite, rezervacije, prodaju, narudžbe i administraciju — prema stvarnom procesu vašeg poslovanja." />
      <script type="application/ld+json">{JSON.stringify(faqPageSchema)}</script>
    </Helmet>

    <Navbar />
    <main className="home-refresh">
    <Hero />
    <ClientLogos />
    <Services />
    <div id="proizvodi" className="scroll-mt-20">
      <OrderlySection />
    </div>
    <HowItWorks />
    <TargetIndustries />
    <DemoForm />
    <FAQ />
    </main>
    <Footer />
  </>
  );
};


export default Home;
