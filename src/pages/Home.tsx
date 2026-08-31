import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import ConcreteActions from "@/components/ConcreteActions";
import MissedLeadCost from "@/components/MissedLeadCost";
import SolutionCards from "@/components/SolutionCards";
import TargetIndustries from "@/components/TargetIndustries";
import DemoForm from "@/components/DemoForm";
import BookCall from "@/components/BookCall";
import VoiceDemo from "@/components/VoiceDemo";

const Home = () => (
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
    </Helmet>
    <Navbar />
    <Hero />
    <Services />
    <SolutionCards />
    <HowItWorks />
    <ConcreteActions />
    <BeforeAfter />
    <MissedLeadCost />
    <TargetIndustries />
    <VoiceDemo />
    <DemoForm />
    <BookCall />
    <FAQ />
    <Footer />
  </>
);

export default Home;
