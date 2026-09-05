import { useLanguage } from "@/lib/i18n";

/**
 * "Naši korisnici" — premium horizontalni beskonačni ticker.
 * Sadrži SAMO stvarne, verifikabilne korisnike (ponavljane u loopu).
 * Poštuje prefers-reduced-motion.
 */

// Stvarni korisnici koje možemo potvrditi — ne izmišljati ostale.
const CLIENTS = [
  { name: "Verona Due Pizzeria", tag: "Pizzeria" },
  { name: "Caffe Lusso", tag: "Caffe" },
];

// Ponavljamo isti skup da ticker vizualno izgleda popunjeno,
// ostaje jasno da su to dva korisnika.
const LOOP = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

const ClientLogos = () => {
  const { t } = useLanguage();
  void t; // naslov/podnaslov su statični (hrvatski), t se čuva radi konzistencije

  return (
    <section
      aria-label="Naši korisnici"
      className="overflow-hidden border-b border-border/40 py-12 md:py-16"
    >
      <div className="container px-4 mb-8 text-center">
        <h2 className="font-semibold text-xl md:text-2xl tracking-tight text-foreground">
          Naši korisnici
        </h2>
        <p className="mt-1 text-sm md:text-base text-muted-foreground">
          Tvrtke koje već koriste naša rješenja
        </p>
      </div>

      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee-slow whitespace-nowrap">
          {LOOP.map((client, index) => (
            <span
              key={index}
              className="mx-4 md:mx-6 inline-flex select-none"
              aria-hidden={index >= CLIENTS.length}
            >
              <span className="glass-card hover-lift inline-flex items-center gap-3 px-5 py-3 md:px-7 md:py-4">
                <span
                  className="flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/15 text-xs font-semibold text-primary"
                  aria-hidden="true"
                >
                  {client.name.charAt(0)}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-sm md:text-base font-semibold tracking-tight text-foreground">
                    {client.name}
                  </span>
                  <span className="text-[11px] md:text-xs uppercase tracking-widest text-muted-foreground/70">
                    {client.tag}
                  </span>
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
