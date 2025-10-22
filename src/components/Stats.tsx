import { TrendingUp, Users, Clock, CheckCircle } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Aktivnih klijenata",
    color: "text-neon-purple"
  },
  {
    icon: TrendingUp,
    value: "87%",
    label: "Povećanje konverzija",
    color: "text-neon-cyan"
  },
  {
    icon: Clock,
    value: "24h",
    label: "Aktivacija sustava",
    color: "text-neon-purple"
  },
  {
    icon: CheckCircle,
    value: "99.8%",
    label: "Uptime garancija",
    color: "text-neon-cyan"
  }
];

const Stats = () => {
  return (
    <section className="py-20 px-4 bg-dark-lighter/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-xl bg-dark/50 border border-white/10 ${stat.color} glow-purple`}>
                  <stat.icon className="w-8 h-8" />
                </div>
              </div>
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">
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
