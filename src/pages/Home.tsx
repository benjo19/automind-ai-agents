import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
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
      <title>Automind — AI recepcionar za lokalne tvrtke u Hrvatskoj</title>
      <meta
        name="description"
        content="Automind je AI recepcionar koji odgovara na pozive, poruke i web upite te zakazuje termine i šalje ponude 24/7. Za salone, ordinacije, servise i praonice."
      />
      <link rel="canonical" href="https://myautomind.com/" />
      <meta property="og:url" content="https://myautomind.com/" />
      <meta property="og:title" content="Automind — AI recepcionar za lokalne tvrtke" />
      <meta property="og:description" content="AI recepcionar koji odgovara na upite, zakazuje termine i šalje ponude 24/7." />
    </Helmet>
    <Navbar />
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
);

export default Home;
