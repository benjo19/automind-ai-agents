import varaderoLogo from "@/assets/varadero-bar-logo.jpg";

/**
 * "Naši korisnici" — premium horizontalni beskonačni ticker s brand markovima.
 * Samo stvarni, potvrđeni korisnici. Gdje nemamo čistu logo datoteku,
 * koristi se elegantan wordmark s točnim nazivom (privremeno).
 * Poštuje prefers-reduced-motion, bez horizontalnog overflowa.
 */

type Client = {
  name: string;
  /** Wordmark u dva reda (prvi = naglašen), ili logo slika */
  top?: string;
  bottom?: string;
  image?: string;
};

const CLIENTS: Client[] = [
  { name: "Verona Due Pizzeria", top: "VERONA", bottom: "DUE" },
  { name: "Veranda Grill", top: "VERANDA", bottom: "GRILL" },
  { name: "Varadero Bar", image: varaderoLogo },
  { name: "Pierino Restaurant Rovinj", top: "PIERINO", bottom: "ROVINJ" },
  { name: "Restoran Da Piero", top: "DA PIERO", bottom: "RESTORAN" },
  { name: "Q Laundry", top: "Q LAUNDRY", bottom: "SAMOPOSLUŽNE PRAONICE" },
];

// Dupliciramo skup radi beskonačnog loopa (animacija pomiče -50%).
const LOOP = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

const LogoTile = ({ client }: { client: Client }) => (
  <span className="glass-card hover-lift flex h-20 w-52 shrink-0 items-center justify-center overflow-hidden px-5 md:h-24 md:w-60 md:px-6">
    {client.image ? (
      <img
        src={client.image}
        alt={`${client.name} logo`}
        decoding="async"
        className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-full object-cover"
      />
    ) : (
      <span className="flex flex-col items-center leading-none">
        <span className="text-base md:text-lg font-semibold uppercase tracking-[0.22em] text-foreground">
          {client.top}
        </span>
        <span className="mt-1.5 text-[10px] md:text-xs uppercase tracking-[0.38em] text-accent">
          {client.bottom}
        </span>
      </span>
    )}
  </span>
);

const ClientLogos = () => {
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
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee-slow items-center gap-4 md:gap-6">
          {LOOP.map((client, index) => (
            <span key={index} aria-hidden={index >= CLIENTS.length} className="flex">
              <LogoTile client={client} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
