import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  { quote: "Automind nam je povećao prodaju za 40% u prvom mjesecu. AI agent radi 24/7 bez odmora!", author: "Marko Horvat", company: "TechSolutions d.o.o.", avatar: "MH" },
  { quote: "Automatske PDF ponude štede nam sate vremena svaki dan. Klijenti dobivaju ponudu u minuti.", author: "Ana Kovačić", company: "BuildPro grupa", avatar: "AK" },
  { quote: "Voice bot zvuči prirodno na hrvatskom. Naši klijenti često ne znaju da razgovaraju s AI-jem.", author: "Ivan Novak", company: "CallCenter+", avatar: "IN" },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 md:py-32 relative overflow-hidden glow-bg">
      <div className="container px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Što kažu <span className="gradient-text">naši klijenti</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute inset-0"
                }`}
              >
                <div className={`glass-card p-8 md:p-12 rounded-2xl text-center ${index === currentIndex ? "shadow-glow" : ""}`}>
                  <Quote className="h-12 w-12 text-accent icon-glow mx-auto mb-6 opacity-50" />
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-accent w-8" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
