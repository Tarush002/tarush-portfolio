import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** transition delay in ms, for gentle stagger */
  delay?: number;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

/**
 * Fade/rise on first intersection. No JS animation loop — a single
 * IntersectionObserver per element, class swaps only.
 * Under prefers-reduced-motion the CSS renders everything static & visible.
 */
export default function Reveal({ children, delay = 0, className = "", ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
