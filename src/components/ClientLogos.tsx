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

const LogoTile = ({ client }: { client: Client }) => (
  <article className="group flex h-[150px] min-w-[230px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-white/[0.04] hover:shadow-[0_18px_55px_rgba(0,0,0,0.28)] md:h-[170px] md:min-w-0">
    {client.image ? (
      <img
        src={client.image}
        alt={`${client.name} logo`}
        decoding="async"
        referrerPolicy="no-referrer"
        className={`max-h-[108px] w-full max-w-[190px] transition-transform duration-300 group-hover:scale-[1.035] md:max-h-[122px] md:max-w-[210px] ${
          client.fit === "cover" ? "object-cover" : "object-contain"
        }`}
        style={{ objectPosition: client.position ?? "center" }}
      />
    ) : (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-2xl font-black text-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.12)]">
          Q
        </div>
        <span className="text-lg font-extrabold tracking-[0.08em] text-white md:text-xl">
          {client.fallbackTop}
        </span>
        <span className="mt-2 text-[9px] font-semibold tracking-[0.14em] text-white/55 md:text-[10px]">
          {client.fallbackBottom}
        </span>
      </div>
    )}
  </article>
);

const ClientLogos = () => {
  return (
    <section
      aria-label="Naši korisnici"
      className="relative overflow-hidden border-y border-white/5 bg-[#0b0f16] py-16 text-white md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_100%,rgba(87,67,255,0.12),transparent_34%),radial-gradient(circle_at_82%_0%,rgba(116,72,255,0.10),transparent_30%)]" />

      <div className="relative mx-auto max-w-[1540px] px-4 md:px-8">
        <div className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[11px]">●</span>
            Naši korisnici
          </div>

          <h2 className="mx-auto mt-7 max-w-5xl text-4xl font-bold tracking-[-0.045em] text-white md:text-6xl lg:text-7xl">
            Njima već{" "}
            <span className="bg-gradient-to-r from-[#4f7cff] via-[#7667ff] to-[#b23cff] bg-clip-text text-transparent">
              pomažemo rasti
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-base leading-7 text-white/64 md:text-lg md:leading-8">
            Restorani, caffe barovi, trgovine i poduzetnici koji već koriste naša rješenja
            <br className="hidden md:block" /> kako bi pojednostavili poslovanje i fokusirali se na ono što je stvarno važno.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-16 md:overflow-visible">
          <div className="flex min-w-max gap-3 px-1 md:grid md:min-w-0 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {CLIENTS.map((client) => (
              <LogoTile key={client.name} client={client} />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 flex max-w-2xl items-center justify-center gap-4 text-xs text-white/55 md:mt-16 md:text-sm">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
          <span className="whitespace-nowrap">Pridružite se i vi uspješnim korisnicima</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
