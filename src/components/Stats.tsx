import { TrendingUp, Users, Clock, CheckCircle } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Aktivnih klijenata" },
  { icon: TrendingUp, value: "87%", label: "Povećanje konverzija" },
  { icon: Clock, value: "24h", label: "Aktivacija sustava" },
  { icon: CheckCircle, value: "99.8%", label: "Uptime garancija" }
];

const Stats = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-xl bg-secondary border border-border text-accent">
                  <stat.icon className="w-8 h-8" />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2 text-foreground">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
