import { useEffect, useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";
import { useLanguage, type Language } from "@/lib/i18n";

const industries = [
  { to: "/ai-recepcionar", label: "AI recepcionar" },
  { to: "/ai-za-salone", label: "AI za salone" },
  { to: "/ai-za-ordinacije", label: "AI za ordinacije" },
  { to: "/ai-za-auto-servise", label: "AI za auto servise" },
  { to: "/ai-za-praonice", label: "AI za praonice" },
];

const mainLinks = [
  { to: "/cijene", label: "Cijene" },
  { to: "/primjeri", label: "Primjeri" },
  { to: "/faq", label: "FAQ" },
  { to: "/blog", label: "Blog" },
];

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLanguage = (next: Language) => {
    setLanguage(next);
    setOpen(false);
  };

  const goToDemo = () => {
    setOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById("demo");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/#demo");
      setTimeout(() => {
        document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  const LanguageSwitch = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`inline-flex rounded-full border border-foreground/10 bg-foreground/5 p-1 ${mobile ? "w-full" : ""}`} aria-label={t.nav.languageLabel}>
      {(["hr", "en"] as Language[]).map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => toggleLanguage(lng)}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${mobile ? "flex-1" : ""} ${
            language === lng ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle /#demo hash scroll when arriving on home
  useEffect(() => {
    if (location.pathname === "/" && location.hash === "#demo") {
      setTimeout(() => {
        document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [location]);

  const isActive = (to: string) => location.pathname === to;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/70 backdrop-blur-xl border-b border-foreground/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/60 border border-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-sm hover:bg-white/90 transition-all"
          aria-label={t.nav.logoLabel}
        >
          <img src={logo} alt="Automind logo" className="h-7 w-auto invert" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Industrije <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {industries.map((i) => (
                <DropdownMenuItem key={i.to} asChild>
                  <Link to={i.to}>{i.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {mainLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative px-4 py-2 text-sm transition-colors ${
                isActive(l.to) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
              <span
                className={`absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-accent via-accent-pink to-accent-cyan transition-opacity ${
                  isActive(l.to) ? "opacity-100" : "opacity-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitch />
          <Button variant="hero" size="sm" onClick={goToDemo}>
            {t.nav.cta}
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-foreground" aria-label={t.nav.openMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl border-l border-foreground/10 overflow-y-auto">
            <div className="flex flex-col h-full pt-8">
              <nav className="flex flex-col gap-1">
                <Link to="/" onClick={() => setOpen(false)} className="px-4 py-3 text-base text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-lg">
                  Početna
                </Link>
                <div className="px-4 pt-3 pb-1 text-xs uppercase tracking-wider text-muted-foreground/60 font-semibold">Industrije</div>
                {industries.map((i) => (
                  <Link
                    key={i.to}
                    to={i.to}
                    onClick={() => setOpen(false)}
                    className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-lg"
                  >
                    {i.label}
                  </Link>
                ))}
                <div className="h-px bg-foreground/10 my-3" />
                {mainLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-base text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-lg"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6">
                <div className="mb-4">
                  <LanguageSwitch mobile />
                </div>
                <Button variant="hero" size="lg" className="w-full" onClick={goToDemo}>
                  {t.nav.cta}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
