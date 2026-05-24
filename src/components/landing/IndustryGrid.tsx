import { Scissors, WashingMachine, UtensilsCrossed, Wrench, Stethoscope, HardHat } from "lucide-react";

const INDUSTRIES = [
  { icon: Scissors, title: "Saloni ljepote", text: "Rezervacije, otkazi i podsjetnici bez ručnog rada." },
  { icon: WashingMachine, title: "Samoposlužne praonice", text: "Odgovori na česta pitanja i prijave kvarova 24/7." },
  { icon: UtensilsCrossed, title: "Restorani", text: "Rezervacije stolova, narudžbe i informacije o jelovniku." },
  { icon: Wrench, title: "Servisi", text: "Prijem upita, procjena i dogovaranje termina servisa." },
  { icon: Stethoscope, title: "Ordinacije", text: "Naručivanje pacijenata i preusmjeravanje hitnih slučajeva." },
  { icon: HardHat, title: "Majstori i hitne intervencije", text: "Filtriranje upita i hitno javljanje samo kad treba." },
];

const IndustryGrid = () => (
  <section id="industries" className="section scroll-mt-20">
    <div className="container-page">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Za koga</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Izgrađeno za lokalne uslužne biznise
        </h2>
        <p className="mt-4 text-muted-foreground">
          Prilagođava se vašoj djelatnosti i načinu rada — bez tehničkog znanja.
        </p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="card-elevated p-5 transition-shadow hover:shadow-elevated">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default IndustryGrid;
