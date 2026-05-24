import { Clock4, UserCheck, CalendarCheck, MessageSquare, FileText, UserPlus } from "lucide-react";

const FEATURES = [
  { icon: Clock4, title: "24/7 odgovori", text: "Klijent dobije odgovor u sekundi, bilo koje vrijeme dana ili noći." },
  { icon: UserCheck, title: "Kvalifikacija leadova", text: "AI postavi prava pitanja i šalje vam samo ozbiljne upite." },
  { icon: CalendarCheck, title: "Rezervacije termina", text: "Provjerava slobodne termine i potvrđuje dolazak klijenta." },
  { icon: MessageSquare, title: "WhatsApp, web chat i email", text: "Svi kanali na jednom mjestu, jedinstven ton komunikacije." },
  { icon: FileText, title: "Sažeci razgovora", text: "Kratki pregled svakog razgovora s kontaktom i sljedećim korakom." },
  { icon: UserPlus, title: "Eskalacija čovjeku", text: "Kad je upit kompliciran ili hitan, prebacuje se direktno vama." },
];

const FeatureGrid = () => (
  <section id="features" className="section scroll-mt-20 surface-muted">
    <div className="container-page">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Mogućnosti</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Sve što stvarni recepcionar radi — automatski
        </h2>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="card-elevated p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureGrid;
