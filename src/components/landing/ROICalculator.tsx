import { useMemo, useState } from "react";
import { TrendingDown } from "lucide-react";

const fmt = (n: number) =>
  new Intl.NumberFormat("hr-HR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const ROICalculator = () => {
  const [perDay, setPerDay] = useState(10);
  const [missedPct, setMissedPct] = useState(30);
  const [value, setValue] = useState(40);

  const monthlyLoss = useMemo(
    () => Math.round(perDay * 30 * (missedPct / 100) * value),
    [perDay, missedPct, value],
  );

  return (
    <section id="roi" className="section scroll-mt-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">ROI</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Koliko vas košta svaki propušteni upit?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pomakni klizače prema svojoj situaciji — vidiš odmah procjenu mjesečnog gubitka.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-stretch">
          <div className="card-elevated p-6 md:p-8 space-y-6">
            <Slider label="Upita dnevno" value={perDay} min={1} max={100} suffix="upita" onChange={setPerDay} />
            <Slider label="Postotak propuštenih" value={missedPct} min={0} max={80} suffix="%" onChange={setMissedPct} />
            <Slider label="Prosječna vrijednost klijenta" value={value} min={5} max={300} suffix="€" onChange={setValue} />
          </div>

          <div className="card-elevated flex flex-col justify-center gap-2 p-8 text-center lg:min-w-[280px]">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div className="text-sm text-muted-foreground">Procijenjeni gubitak mjesečno</div>
            <div className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{fmt(monthlyLoss)}</div>
            <div className="text-xs text-muted-foreground">≈ {fmt(monthlyLoss * 12)} godišnje</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Slider = ({
  label, value, min, max, suffix, onChange,
}: { label: string; value: number; min: number; max: number; suffix: string; onChange: (n: number) => void }) => (
  <div>
    <div className="mb-2 flex items-center justify-between">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <span className="text-sm font-semibold text-[hsl(var(--accent))]">
        {value} {suffix}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-[hsl(var(--accent))]"
    />
  </div>
);

export default ROICalculator;
