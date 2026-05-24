import { PhoneOff, Clock, CalendarX, Repeat } from "lucide-react";

const PROBLEMS = [
  { icon: PhoneOff, title: "Propušteni pozivi", text: "Klijent zove dok radite. Ne stignete se javiti — i ode konkurenciji." },
  { icon: Clock, title: "Spori odgovori", text: "Poruke čekaju satima. Brže odgovara onaj tko prvi dobije posao." },
  { icon: CalendarX, title: "Izgubljene rezervacije", text: "Bez sustava za potvrdu termina, dio klijenata jednostavno ne dođe." },
  { icon: Repeat, title: "Previše ručnog rada", text: "Svaki upit znači ručno tipkanje istih odgovora i evidenciju." },
];

const ProblemSection = () => (
  <section className="section">
    <div className="container-page">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Problem</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Svaki neodgovoreni upit je izgubljen klijent
        </h2>
        <p className="mt-4 text-muted-foreground">
          Mali biznisi gube i do trećine prilika zbog brzine odgovora — ne zbog cijene ili kvalitete.
        </p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROBLEMS.map(({ icon: Icon, title, text }) => (
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

export default ProblemSection;
