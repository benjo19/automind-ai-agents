import varaderoLogo from "@/assets/varadero-bar-logo.jpg";

type Client = {
  name: string;
  image?: string;
  fit?: "contain" | "cover";
  position?: string;
  fallbackTop: string;
  fallbackBottom?: string;
};

const CLIENTS: Client[] = [
  {
    name: "Verona Due Pizzeria",
    fallbackTop: "VERONA DUE",
    fallbackBottom: "PIZZERIA",
  },
  {
    name: "Veranda Grill",
    fallbackTop: "VERANDA",
    fallbackBottom: "GRILL",
  },
  {
    name: "Varadero Bar",
    image: varaderoLogo,
    fit: "contain",
    fallbackTop: "VARADERO",
    fallbackBottom: "BAR",
  },
  {
    name: "Pierino Restaurant Rovinj",
    fallbackTop: "PIERINO",
    fallbackBottom: "ROVINJ",
  },
  {
    name: "Restoran Da Piero",
    fallbackTop: "DA PIERO",
    fallbackBottom: "RESTORAN",
  },
  {
    name: "Q Laundry",
    fallbackTop: "Q LAUNDRY",
    fallbackBottom: "SAMOPOSLUŽNE PRAONICE",
  },
];

const LOOP = [...CLIENTS, ...CLIENTS];

const LogoTile = ({ client }: { client: Client }) => (
  <span className="group relative flex h-20 w-36 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-card p-3 transition-colors hover:border-accent md:h-24 md:w-40">
    {client.image ? (
      <img
        src={client.image}
        alt={`${client.name} logo`}
        decoding="async"
        referrerPolicy="no-referrer"
        className={`h-[78%] w-[78%] transition-transform duration-300 group-hover:scale-[1.05] ${
          client.fit === "cover" ? "rounded-full object-cover" : "object-contain"
        }`}
        style={{ objectPosition: client.position ?? "center" }}
      />
    ) : (
      <span className="flex w-[82%] flex-col items-center text-center leading-none">
        <span className="text-sm font-extrabold text-foreground md:text-base">
          {client.fallbackTop}
        </span>
        <span className="mt-1.5 text-[7px] font-semibold text-muted-foreground md:text-[8px]">
          {client.fallbackBottom}
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
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee-slow items-center gap-4 md:gap-5">
          {LOOP.map((client, index) => (
            <span
              key={`${client.name}-${index}`}
              aria-hidden={index >= CLIENTS.length}
              className="flex"
            >
              <LogoTile client={client} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
