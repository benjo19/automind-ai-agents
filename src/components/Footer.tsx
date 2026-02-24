import { Mail, Phone, Linkedin, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const CTA_EMAIL = "auto.mind.ai2025@gmail.com";
const CTA_PHONE = "0995085933";

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-border bg-secondary/20">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <img src={logo} alt="Automind logo" className="h-10 w-auto invert mb-3 mx-auto md:mx-0" />
            <p className="text-sm text-muted-foreground">
              © 2025 Automind. Sva prava pridržana.
            </p>
            <p className="text-xs text-muted-foreground/70 mt-2">
              FA. BE. MA TRGOVINA DOO<br />
              OIB: 60898333063
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row gap-6 text-center md:text-left">
            <a
              href={`mailto:${CTA_EMAIL}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="text-sm">{CTA_EMAIL}</span>
            </a>
            <a
              href={`tel:${CTA_PHONE}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span className="text-sm">{CTA_PHONE}</span>
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col md:flex-row gap-4 text-center">
            <Link to="/politika-privatnosti" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Politika privatnosti
            </Link>
            <Link to="/uvjeti-koristenja" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Uvjeti korištenja
            </Link>
            <Link to="/kolacici" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Kolačići
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-foreground/30 transition-all" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-foreground/30 transition-all" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-foreground/30 transition-all" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
