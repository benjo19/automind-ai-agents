import varaderoLogo from "@/assets/varadero-bar-logo.jpg";

/**
 * "Naši korisnici" — horizontalni ticker sa stvarnim brandingom korisnika.
 * Logo reference dolaze sa službenih stranica ili javno dostupnih brand asseta.
 */
type Client = {
  name: string;
  image: string;
  fit?: "contain" | "cover";
  position?: string;
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
    image: "https://www.q-laundry.hr/wp-content/uploads/2022/01/12.jpg",
    fit: "cover",
    position: "50% 8%",
  },
];

const LOOP = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

const LogoTile = ({ client }: { client: Client }) => (
  <span className="glass-card hover-lift flex h-20 w-52 shrink-0 items-center justify-center overflow-hidden p-3 md:h-24 md:w-60 md:p-4">
    <img
      src={client.image}
      alt={`${client.name} logo`}
      decoding="async"
      referrerPolicy="no-referrer"
      className={`h-full w-full rounded-lg ${client.fit === "cover" ? "object-cover" : "object-contain"}`}
      style={{ objectPosition: client.position ?? "center" }}
    />
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
            <span key={`${client.name}-${index}`} aria-hidden={index >= CLIENTS.length} className="flex">
              <LogoTile client={client} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
