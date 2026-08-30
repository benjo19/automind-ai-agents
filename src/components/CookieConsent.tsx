import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { COOKIE_CONSENT_KEY, initMetaPixel } from "@/lib/meta";

const CookieConsent = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        // small delay so it doesn't pop instantly
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
    } catch {
      // ignore
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    } catch {
      // ignore
    }
    initMetaPixel();
    setVisible(false);
  };

  const dismiss = () => setVisible(false);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[60] animate-fade-in-up">
      <div className="glass-card p-5 shadow-glow flex flex-col gap-3 relative">
        <button
          onClick={dismiss}
          aria-label={t.cookie.close}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-3">
          <Cookie className="h-5 w-5 text-accent-amber icon-glow-amber shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/90">
            {t.cookie.text}{" "}
            <Link to="/kolacici" className="text-accent-cyan hover:underline">
              {t.cookie.link}
            </Link>
          </p>
        </div>
        <Button variant="hero" size="sm" onClick={accept} className="w-full">
          {t.cookie.accept}
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
