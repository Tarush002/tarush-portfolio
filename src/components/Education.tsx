import { EDUCATION } from "../data/content";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">05 · BACKGROUND</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display-2 mt-6">
            Formal training<span className="text-accent">.</span>
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-line">
          {EDUCATION.map((ed, i) => (
            <Reveal key={ed.title} delay={i * 80}>
              <div className="grid gap-4 border-b border-line py-9 md:grid-cols-12 md:items-baseline md:gap-6">
                <p className="font-mono text-[0.68rem] tracking-[0.2em] text-dim md:col-span-3">
                  {ed.period}
                </p>
                <div className="md:col-span-7">
                  <p className="text-xl font-medium tracking-tight text-ink md:text-2xl">
                    {ed.title} <span className="text-dim">— {ed.field}</span>
                  </p>
                  <p className="mt-1.5 text-sm text-dim">{ed.school}</p>
                  {ed.detail ? (
                    <p className="mt-1 font-mono text-[0.62rem] tracking-[0.16em] text-faint">
                      {ed.detail}
                    </p>
                  ) : null}
                </div>
                <div className="flex md:col-span-2 md:justify-end">
                  <span className={`chip ${ed.period === "IN PROGRESS" ? "chip-accent" : ""}`}>
                    {ed.level}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
