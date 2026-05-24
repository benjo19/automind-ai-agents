import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const CTA_EMAIL = "auto.mind.ai2025@gmail.com";
const CTA_PHONE = "0995085933";

const Footer = () => {
  return (
    <footer className="border-t border-border surface-muted">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[hsl(var(--accent))] text-sm font-bold text-white">A</span>
              AutoMind
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              AI recepcionar koji odgovara dok vi radite.
            </p>
            <p className="mt-4 text-xs text-muted-foreground/80">
              FA. BE. MA TRGOVINA DOO<br />OIB: 60898333063
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Proizvod</h4>
            <div className="space-y-2 text-sm">
              <a href="#how-it-works" className="block text-muted-foreground hover:text-foreground">Kako radi</a>
              <a href="#industries" className="block text-muted-foreground hover:text-foreground">Industrije</a>
              <a href="#features" className="block text-muted-foreground hover:text-foreground">Mogućnosti</a>
              <a href="#roi" className="block text-muted-foreground hover:text-foreground">ROI</a>
              <a href="#faq" className="block text-muted-foreground hover:text-foreground">FAQ</a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Pravno</h4>
            <div className="space-y-2 text-sm">
              <Link to="/politika-privatnosti" className="block text-muted-foreground hover:text-foreground">Politika privatnosti</Link>
              <Link to="/uvjeti-koristenja" className="block text-muted-foreground hover:text-foreground">Uvjeti korištenja</Link>
              <Link to="/kolacici" className="block text-muted-foreground hover:text-foreground">Kolačići</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Kontakt</h4>
            <div className="space-y-3 text-sm">
              <a href={`mailto:${CTA_EMAIL}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Mail className="h-4 w-4" /> {CTA_EMAIL}
              </a>
              <a href={`tel:${CTA_PHONE}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Phone className="h-4 w-4" /> {CTA_PHONE}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} AutoMind. Sva prava pridržana.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
