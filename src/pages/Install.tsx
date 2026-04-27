import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Apple, MonitorSmartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

const Install = () => {
  const { t } = useLanguage();
  const guides = [
    { title: t.install.iosTitle, steps: t.install.iosSteps, icon: Apple },
    { title: t.install.androidTitle, steps: t.install.androidSteps, icon: MonitorSmartphone },
  ];

  return (
    <>
      <Helmet>
        <title>{t.install.titleMeta}</title>
        <meta name="robots" content="index,follow" />
      </Helmet>
      <main className="min-h-screen px-4 py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent-cyan">
              {t.install.eyebrow}
            </p>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold tracking-tight gradient-text-rainbow mb-5">
              {t.install.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t.install.text}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 mb-10">
            {guides.map(({ title, steps, icon: Icon }) => (
              <section key={title} className="glass-card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/70 border border-border/70">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{title}</h2>
                </div>
                <ol className="space-y-4">
                  {steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-muted-foreground">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>

          <Button asChild variant="hero" size="lg">
            <Link to="/">{t.install.back}</Link>
          </Button>
        </div>
      </main>
    </>
  );
};

export default Install;