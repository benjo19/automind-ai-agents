import { useState, FormEvent } from "react";
import { Mail, Phone, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

const CTA_EMAIL = "auto.mind.ai2025@gmail.com";
const CTA_PHONE = "0995085933";
const WEBHOOK_URL = "https://hook.eu2.make.com/5bkttym22undrj5o8gg5l7vnktk978m1";

const Footer = () => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);

  const submitNewsletter = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || honeypot) return;
    setLoading(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "newsletter_signup",
          email,
          source: "newsletter",
          language,
          submitted_at: new Date().toISOString(),
          page_url: window.location.href,
        }),
      });
      if (!res.ok) throw new Error("Network error");
      toast.success(t.footer.success);
      setEmail("");
    } catch {
      toast.error(t.footer.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative pt-16 pb-8 border-t border-border/50">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={logo} alt="Automind logo" className="h-10 w-auto invert mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              {t.footer.tagline}
            </p>
            <p className="text-xs text-muted-foreground/60">
              FA. BE. MA TRGOVINA DOO<br />OIB: 60898333063
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">{t.footer.contact}</h4>
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
            <h4 className="text-sm font-semibold mb-4 text-foreground">{t.footer.legal}</h4>
            <div className="space-y-3">
              <Link to="/politika-privatnosti" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.privacy}</Link>
              <Link to="/uvjeti-koristenja" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.terms}</Link>
              <Link to="/kolacici" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.cookies}</Link>
              <Link to="/install" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.install}</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold mb-4 text-foreground">{t.footer.news}</h4>
            <p className="text-xs text-muted-foreground mb-3">
              {t.footer.newsText}
            </p>
            <form onSubmit={submitNewsletter} className="flex flex-col gap-2">
              <div className="absolute opacity-0 pointer-events-none" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" tabIndex={-1}>
                <input type="text" name="fax_number" autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} />
              </div>
              <Input
                type="email"
                required
                placeholder={t.footer.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary/50"
              />
              <Button type="submit" variant="hero" size="sm" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t.footer.subscribe}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-6 text-center">
          <p className="text-xs text-muted-foreground/60">
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
