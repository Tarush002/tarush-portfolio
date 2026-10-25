import { FOCUS_AREAS, STACK, type Capability } from "../data/content";
import Reveal from "./Reveal";

function CapabilityList({ label, sub, items }: { label: string; sub: string; items: Capability[] }) {
  return (
    <div>
      <p className="mono-label text-ink">
        {label} <span className="text-faint">— {sub}</span>
      </p>
      <ul className="mt-6 border-t border-line">
        {items.map((item, i) => (
          <li key={item.name} className="border-b border-line py-5">
            <Reveal delay={i * 60}>
              <p className="text-[1.05rem] font-medium tracking-tight text-ink">{item.name}</p>
              <p className="mt-1 text-sm text-dim">{item.note}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="section">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">04 · CAPABILITIES</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display-2 mt-6 max-w-3xl">
            The capability map<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 max-w-xl leading-relaxed text-dim">
            Interest is not expertise. This map deliberately keeps the two separated — direction on
            one side, demonstrable use on the other. No percentages, no animated bars. Those measure
            decoration, not skill.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <CapabilityList
            label="FOCUS AREAS"
            sub="LEARNING · EXPLORING"
            items={FOCUS_AREAS}
          />
          <CapabilityList
            label="STACK"
            sub="DEMONSTRATED IN BUILT / PUBLISHED WORK"
            items={STACK}
          />
        </div>

        <Reveal>
          <p className="mt-10 font-mono text-[0.62rem] leading-relaxed tracking-[0.18em] text-faint">
            * FOCUS AREAS SIGNAL DIRECTION, NOT MASTERY. STACK ITEMS APPEAR IN SHIPPED PROJECTS OR
            PUBLISHED WORK. NO CLAIM ABOVE IS CERTIFIED BY ANYBODY.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
