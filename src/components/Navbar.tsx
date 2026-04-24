import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Usluge", id: "services" },
  { label: "Rješenja", id: "solutions" },
  { label: "Kako radi", id: "how-it-works" },
  { label: "Reference", id: "testimonials" },
  { label: "FAQ", id: "faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-foreground/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="Automind - povratak na vrh"
        >
          <img src={logo} alt="Automind logo" className="h-8 w-auto invert" />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-4 py-2 text-sm transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-accent via-accent-pink to-accent-cyan transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button variant="hero" size="sm" onClick={() => scrollTo("demo")}>
            Zatraži demo
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground"
              aria-label="Otvori meni"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[280px] bg-background/95 backdrop-blur-xl border-l border-foreground/10"
          >
            <div className="flex flex-col h-full pt-8">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-left px-4 py-3 text-base text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
              <div className="mt-6">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={() => scrollTo("demo")}
                >
                  Zatraži demo
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
