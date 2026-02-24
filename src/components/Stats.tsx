import { TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { icon: Users, value: "500+", label: "Aktivnih klijenata" },
  { icon: TrendingUp, value: "87%", label: "Povećanje konverzija" },
  { icon: Clock, value: "24h", label: "Aktivacija sustava" },
  { icon: CheckCircle, value: "99.8%", label: "Uptime garancija" },
];

const Stats = () => {
  return (
    <section className="py-20 px-4 relative glow-bg">
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-xl bg-secondary border border-border">
                    <stat.icon className="w-8 h-8 text-accent icon-glow" />
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
