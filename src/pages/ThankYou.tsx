import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Hvala! Upit je zaprimljen — Automind</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-xl w-full text-center glass-card p-10 md:p-14 rounded-2xl">
          <div className="flex justify-center mb-6">
            <CheckCircle2
              className="h-20 w-20 text-accent-emerald icon-glow-emerald animate-bounce"
              style={{ animationIterationCount: 1 }}
            />
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight gradient-text-rainbow">
            Hvala! Upit je zaprimljen.
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Naš tim javit će vam se u roku 24h s personaliziranom ponudom.
          </p>
          <Button variant="hero" size="lg" onClick={() => navigate("/")}>
            Povratak na početak
          </Button>
        </div>
      </main>
    </>
  );
};

export default ThankYou;
