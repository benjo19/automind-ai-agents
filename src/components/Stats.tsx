import { TrendingUp, Users, Clock, Star } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useCountUp } from "@/hooks/use-count-up";

interface StatProps {
  icon: typeof Users;
  target: number;
  suffix: string;
  decimals?: number;
  label: string;
  color: string;
  glow: string;
}

const stats: StatProps[] = [
  { icon: Users, target: 46, suffix: "", label: "Aktivnih korisnika", color: "text-accent-cyan", glow: "icon-glow-cyan" },
  { icon: TrendingUp, target: 87, suffix: "%", label: "Povećanje konverzija", color: "text-accent-emerald", glow: "icon-glow-emerald" },
  { icon: Clock, target: 24, suffix: "h", label: "Aktivacija sustava", color: "text-accent-amber", glow: "icon-glow-amber" },
  { icon: Star, target: 4.9, suffix: "★", decimals: 1, label: "Prosječna ocjena klijenata", color: "text-accent-pink", glow: "icon-glow-pink" },
];

const StatCard = ({ icon: Icon, target, suffix, decimals = 0, label, color, glow }: StatProps) => {
  const { value, ref } = useCountUp(target, 1500);
  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center relative z-10">
      <div className="flex justify-center mb-4">
        <div className="p-4 rounded-xl bg-secondary border border-border">
          <Icon className={`w-8 h-8 ${color} ${glow}`} />
        </div>
      </div>
      <div className="text-4xl font-bold mb-2 gradient-text">
        {display}
        {suffix}
      </div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-12 md:py-16 px-4 relative glow-bg">
      <div className="container mx-auto relative z-10">
        <div className="relative">
          {/* Dashed connector (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] border-t border-dashed border-foreground/15 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <StatCard {...stat} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
