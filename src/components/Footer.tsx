import { Mail, Phone, Linkedin, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const CTA_EMAIL = "auto.mind.ai2025@gmail.com";
const CTA_PHONE = "0995085933";

const Footer = () => {
  return (
    <footer className="relative pt-16 pb-8 border-t border-border/50">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
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

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Društvene mreže</h4>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:shadow-glow hover:scale-110 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
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
