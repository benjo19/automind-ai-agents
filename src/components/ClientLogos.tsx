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

const LOOP = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

const LogoTile = ({ client }: { client: Client }) => (
  <span className="group flex h-24 w-44 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#111722]/85 px-4 py-3 shadow-[0_12px_35px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-[#151c29] hover:shadow-[0_16px_45px_rgba(0,0,0,0.3)] md:h-28 md:w-52 md:px-5 md:py-4">
    {client.image ? (
      <img
        src={client.image}
        alt={`${client.name} logo`}
        decoding="async"
        referrerPolicy="no-referrer"
        className={`h-full w-full max-h-[82px] max-w-[168px] transition-transform duration-300 group-hover:scale-[1.04] md:max-h-[94px] md:max-w-[190px] ${
          client.fit === "cover" ? "object-cover" : "object-contain"
        }`}
        style={{ objectPosition: client.position ?? "center" }}
      />
    ) : (
      <span className="flex flex-col items-center text-center leading-none">
        <span className="text-lg font-extrabold tracking-[0.08em] text-white md:text-xl">
          {client.fallbackTop}
        </span>
        <span className="mt-2 text-[9px] font-semibold tracking-[0.14em] text-white/55 md:text-[10px]">
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
    </section>
  );
};

export default ClientLogos;
