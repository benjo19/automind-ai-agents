import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 1500, start = 0) {
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = performance.now();
            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutQuad
              const eased = 1 - (1 - progress) * (1 - progress);
              const current = start + (target - start) * eased;
              setValue(current);
              if (progress < 1) requestAnimationFrame(animate);
              else setValue(target);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, start]);

  return { value, ref };
}
