import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

type SchemaObject = Record<string, unknown>;

interface PageShellProps {
  title: string;
  description: string;
  path: string;
  schema?: SchemaObject | SchemaObject[];
  children: ReactNode;
}

const PageShell = ({ title, description, path, schema, children }: PageShellProps) => {
  const url = `https://myautomind.com${path}`;
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-20">{children}</main>
      <Footer />
    </>
  );
};

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
}

export const PageHero = ({ eyebrow, title, subtitle }: PageHeroProps) => (
  <section className="container px-4 max-w-4xl mx-auto text-center py-12 md:py-20">
    {eyebrow && (
      <div className="inline-block mb-4 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase">
        {eyebrow}
      </div>
    )}
    <h1 className="font-bold text-4xl md:text-6xl tracking-tight mb-6 leading-[1.05]">
      {title}
    </h1>
    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
      {subtitle}
    </p>
    <div className="flex flex-wrap justify-center gap-3">
      <Button asChild variant="hero" size="lg">
        <Link to="/#demo">Zatraži demo</Link>
      </Button>
      <Button asChild variant="outline" size="lg">
        <Link to="/cijene">Pogledaj cijene</Link>
      </Button>
    </div>
  </section>
);

interface FeatureGridProps {
  items: { title: string; text: string }[];
}

export const FeatureGrid = ({ items }: FeatureGridProps) => (
  <section className="container px-4 max-w-5xl mx-auto py-12">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((it, i) => (
        <div key={i} className="p-6 rounded-2xl border border-foreground/10 bg-white/60 backdrop-blur-sm hover:border-accent/40 transition-colors">
          <div className="text-accent text-xs font-mono mb-3">{String(i + 1).padStart(2, "0")}</div>
          <h3 className="font-semibold text-lg mb-2 tracking-tight">{it.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
        </div>
      ))}
    </div>
  </section>
);

export const CtaBlock = ({
  title = "Spremni za AI recepcionara?",
  subtitle = "Pošaljite upit i pripremamo demo prilagođen vašoj djelatnosti — javljamo se u 24 sata.",
}: { title?: string; subtitle?: string }) => (
  <section className="container px-4 max-w-3xl mx-auto py-16 text-center">
    <div className="p-10 rounded-3xl border border-foreground/10 bg-gradient-to-br from-accent/5 to-transparent">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{title}</h2>
      <p className="text-muted-foreground mb-6">{subtitle}</p>
      <Button asChild variant="hero" size="lg">
        <Link to="/#demo">Zatraži demo</Link>
      </Button>
    </div>
  </section>
);

export default PageShell;
