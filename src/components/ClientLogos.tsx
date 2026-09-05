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
  <span className="group relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#7d86b3]/25 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.055),rgba(17,23,34,0.94)_58%)] p-2.5 shadow-[0_10px_28px_rgba(0,0,0,0.24)] ring-1 ring-white/[0.025] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7c6cff]/45 hover:shadow-[0_14px_34px_rgba(77,67,180,0.22)] md:h-32 md:w-32 md:p-3">
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
        <span className="text-sm font-extrabold tracking-[0.06em] text-white md:text-base">
          {client.fallbackTop}
        </span>
        <span className="mt-1.5 text-[7px] font-semibold tracking-[0.09em] text-white/55 md:text-[8px]">
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
