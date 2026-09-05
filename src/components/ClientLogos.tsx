import varaderoLogo from "@/assets/varadero-bar-logo.jpg";

type Client = {
  name: string;
  image?: string;
  fit?: "contain" | "cover";
  position?: string;
  fallbackTop?: string;
  fallbackBottom?: string;
};

const CLIENTS: Client[] = [
  {
    name: "Verona Due Pizzeria",
    image: "https://konoba-veranda.hr/images/logo_200.png",
    fit: "contain",
  },
  {
    name: "Veranda Grill",
    image: "https://konoba-veranda.hr/images/logo_200.png",
    fit: "contain",
  },
  {
    name: "Varadero Bar",
    image: varaderoLogo,
    fit: "contain",
  },
  {
    name: "Pierino Restaurant Rovinj",
    image: "https://img3.restaurantguru.com/w550/h367/rc12-design-Pierino-restaurant-Rovinj.jpg",
    fit: "cover",
    position: "50% 10%",
  },
  {
    name: "Restoran Da Piero",
    image: "https://cdn.dribbble.com/userupload/28316100/file/original-a4ead93fbb70b05ff20dc974ad18f8f0.jpg?resize=752x&vertical=center",
    fit: "contain",
  },
  {
    name: "Q Laundry",
    fallbackTop: "Q LAUNDRY",
    fallbackBottom: "SAMOPOSLUŽNE PRAONICE",
  },
];

const LOOP = [...CLIENTS, ...CLIENTS, ...CLIENTS];

const LogoTile = ({ client }: { client: Client }) => (
  <span className="group flex h-24 w-44 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-card/70 px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md md:h-28 md:w-52 md:px-5 md:py-4">
    {client.image ? (
      <img
        src={client.image}
        alt={`${client.name} logo`}
        decoding="async"
        referrerPolicy="no-referrer"
        className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.04] ${
          client.fit === "cover" ? "object-cover" : "object-contain"
        }`}
        style={{ objectPosition: client.position ?? "center" }}
      />
    ) : (
      <span className="flex flex-col items-center text-center leading-none">
        <span className="text-base font-bold tracking-[0.1em] text-foreground md:text-lg">
          {client.fallbackTop}
        </span>
        <span className="mt-2 text-[9px] font-medium tracking-[0.16em] text-muted-foreground md:text-[10px]">
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
      className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-background to-muted/20 py-14 md:py-20"
    >
      <div className="container px-4 text-center">
        <div className="mx-auto mb-4 inline-flex items-center rounded-full border border-border/70 bg-card/70 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-sm md:text-sm">
          Naši korisnici
        </div>

        <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Njima već <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">pomažemo rasti</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Restorani, caffe barovi i poduzetnici koji koriste naša rješenja za jednostavnije i učinkovitije poslovanje.
        </p>
      </div>

      <div
        className="relative mt-10 w-full overflow-hidden md:mt-12"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee-slow items-center gap-3 md:gap-4">
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

      <div className="container mt-8 flex items-center justify-center gap-4 px-4 text-xs text-muted-foreground md:mt-10 md:text-sm">
        <span className="h-px w-16 bg-border md:w-28" />
        <span>Pridružite se i vi uspješnim korisnicima</span>
        <span className="h-px w-16 bg-border md:w-28" />
      </div>
    </section>
  );
};

export default ClientLogos;
