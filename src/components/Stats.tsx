import { TrendingUp, Users, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { icon: Users, value: "46", label: "Aktivnih korisnika", color: "text-accent-cyan", glow: "icon-glow-cyan" },
  { icon: TrendingUp, value: "87%", label: "Povećanje konverzija", color: "text-accent-emerald", glow: "icon-glow-emerald" },
  { icon: Clock, value: "24h", label: "Aktivacija sustava", color: "text-accent-amber", glow: "icon-glow-amber" },
];

const Stats = () => {
  return (
    <section className="py-12 md:py-16 px-4 relative glow-bg">
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-xl bg-secondary border border-border">
                    <stat.icon className={`w-8 h-8 ${stat.color} ${stat.glow}`} />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2 gradient-text">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
