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

export interface QaItem {
  q: string;
  a: string;
}

interface QaSectionProps {
  title?: string;
  intro?: string;
  items: QaItem[];
  headingLevel?: "h2" | "h3";
}

/** Concise, quotable question/answer blocks (AEO). */
export const QaSection = ({ title, intro, items, headingLevel = "h2" }: QaSectionProps) => {
  const Heading = headingLevel;
  return (
    <section className="container px-4 max-w-3xl mx-auto py-12">
      {title && <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{title}</h2>}
      {intro && <p className="text-muted-foreground mb-8 leading-relaxed">{intro}</p>}
      <div className="space-y-8">
        {items.map((item, i) => (
          <div key={i}>
            <Heading className="text-lg md:text-xl font-semibold tracking-tight mb-2">{item.q}</Heading>
            <p className="text-muted-foreground leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const faqSchema = (items: QaItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

interface RelatedLinksProps {
  title?: string;
  links: { to: string; label: string; text?: string }[];
}

export const RelatedLinks = ({ title = "Povezano", links }: RelatedLinksProps) => (
  <section className="container px-4 max-w-5xl mx-auto py-10">
    <h2 className="text-xl font-bold tracking-tight mb-5">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className="block p-5 rounded-2xl border border-foreground/10 bg-white/60 hover:border-accent/40 transition-colors"
        >
          <span className="font-semibold tracking-tight block mb-1">{l.label}</span>
          {l.text && <span className="text-sm text-muted-foreground leading-relaxed">{l.text}</span>}
        </Link>
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
