import { useState, FormEvent } from "react";
import { Mail, Phone, Linkedin, Twitter, Facebook, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CTA_EMAIL = "auto.mind.ai2025@gmail.com";
const CTA_PHONE = "0995085933";
const WEBHOOK_URL = "https://hook.eu2.make.com/5bkttym22undrj5o8gg5l7vnktk978m1";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitNewsletter = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "newsletter",
          submitted_at: new Date().toISOString(),
          page_url: window.location.href,
        }),
      });
      if (!res.ok) throw new Error("Network error");
      toast.success("Hvala! Prijavljeni ste ✅");
      setEmail("");
    } catch {
      toast.error(`Greška! Pošaljite e-mail na ${CTA_EMAIL}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative pt-16 pb-8 border-t border-border/50">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={logo} alt="Automind logo" className="h-10 w-auto invert mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              AI agenti za automatizaciju poslovanja.
            </p>
            <p className="text-xs text-muted-foreground/60">
              FA. BE. MA TRGOVINA DOO<br />OIB: 60898333063
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Kontakt</h4>
            <div className="space-y-3">
              <a href={`mailto:${CTA_EMAIL}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                <Mail className="h-4 w-4" /> {CTA_EMAIL}
              </a>
              <a href={`tel:${CTA_PHONE}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" /> {CTA_PHONE}
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Pravno</h4>
            <div className="space-y-3">
              <Link to="/politika-privatnosti" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Politika privatnosti</Link>
              <Link to="/uvjeti-koristenja" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Uvjeti korištenja</Link>
              <Link to="/kolacici" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Kolačići</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold mb-4 text-foreground">Novosti</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Povremeni savjeti o AI automatizaciji.
            </p>
            <form onSubmit={submitNewsletter} className="flex flex-col gap-2">
              <Input
                type="email"
                required
                placeholder="vas@email.hr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary/50"
              />
              <Button type="submit" variant="hero" size="sm" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Prijavi se"}
              </Button>
            </form>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Društvene mreže</h4>
            <TooltipProvider delayDuration={150}>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Facebook, label: "Facebook" },
                ].map(({ icon: Icon, label }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label={`${label} — uskoro`}
                        className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:shadow-glow hover:scale-110 transition-all duration-300 cursor-default"
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Uskoro</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-6 text-center">
          <p className="text-xs text-muted-foreground/60">
            © 2025 Automind. Sva prava pridržana.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
