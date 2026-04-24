import { useEffect, useRef, useState, useCallback } from "react";
import { X, Check } from "lucide-react";
import callAgentImg from "@/assets/call-agent.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const before = ["Ručni odgovori na upite", "Izgubljeni leadovi", "Kašnjenje s ponudama", "Zaboravljeni follow-upovi"];
const after = ["AI odgovara 24/7", "Svaki lead bilježen", "Auto-ponuda u minuti", "Follow-up bez zaborava"];

const BeforeAfter = () => {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => updatePos(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, updatePos]);

  // Hint animation: nudge slider once on mount so users see it's draggable
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t1 = setTimeout(() => {
      setPos(30);
      const t2 = setTimeout(() => setPos(50), 600);
      (t1 as unknown as { _t2?: ReturnType<typeof setTimeout> })._t2 = t2;
    }, 800);
    return () => {
      const inner = (t1 as unknown as { _t2?: ReturnType<typeof setTimeout> })._t2;
      if (inner) clearTimeout(inner);
      clearTimeout(t1);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
  };

  return (
    <section className="py-20 md:py-32 relative glow-bg">
      <div className="container px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Prije i <span className="gradient-text-rainbow">poslije</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Povucite ručku lijevo i desno za usporedbu
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            <div
              ref={containerRef}
              className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden border border-border shadow-card select-none touch-none"
              style={{
                backgroundImage: `url(${callAgentImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onPointerDown={(e) => {
                setDragging(true);
                updatePos(e.clientX);
              }}
            >
              {/* Before layer (left) */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-destructive/85 to-destructive/60 backdrop-blur-sm flex items-center justify-center p-6 md:p-12"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <div className="text-white max-w-sm">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                    <X className="h-6 w-6 md:h-8 md:w-8" /> Prije
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    {before.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm md:text-base">
                        <X className="h-4 w-4 md:h-5 md:w-5 shrink-0 mt-0.5 opacity-90" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* After layer (right) */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-accent-emerald/85 to-accent-emerald/60 backdrop-blur-sm flex items-center justify-center p-6 md:p-12"
                style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
              >
                <div className="text-white max-w-sm">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                    <Check className="h-6 w-6 md:h-8 md:w-8" /> Poslije
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    {after.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm md:text-base">
                        <Check className="h-4 w-4 md:h-5 md:w-5 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Divider */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)] cursor-ew-resize"
                style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
              >
                <button
                  type="button"
                  role="slider"
                  aria-label="Pomakni klizač"
                  aria-valuenow={Math.round(pos)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  tabIndex={0}
                  onKeyDown={onKeyDown}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setDragging(true);
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-foreground flex items-center justify-center shadow-lg cursor-ew-resize hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                    <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BeforeAfter;
