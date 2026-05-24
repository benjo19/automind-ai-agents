import { Plug, Bot, Calendar } from "lucide-react";

const STEPS = [
  { n: "01", icon: Plug, title: "Spoji kanale", text: "Web chat, WhatsApp, Instagram, mail i pozivi se povezuju u jedno mjesto." },
  { n: "02", icon: Bot, title: "AI odgovara i kvalificira", text: "Na hrvatskom jeziku odgovara klijentima, postavlja prava pitanja i prikuplja podatke." },
  { n: "03", icon: Calendar, title: "Dobiješ dogovorene termine", text: "Rezervacije, sažeci razgovora i kontakti dolaze ti uredno na mail ili u kalendar." },
];

const HowItWorks3 = () => (
  <section id="how-it-works" className="section scroll-mt-20 surface-muted">
    <div className="container-page">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Kako radi</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tri koraka do mirnog radnog dana
        </h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {STEPS.map(({ n, icon: Icon, title, text }) => (
          <div key={n} className="card-elevated relative p-6">
            <span className="text-xs font-mono font-semibold text-[hsl(var(--accent))]">{n}</span>
            <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--accent))] text-white">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks3;
