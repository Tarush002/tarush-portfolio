import { SITE } from "../data/content";
import Reveal from "./Reveal";
import TopoField from "./TopoField";
import { ArrowDown, ArrowRight } from "./Icons";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="site-container relative grid flex-1 items-center gap-14 pb-28 pt-32 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-24">
        {/* copy */}
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">{SITE.eyebrow}</p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="display-1 mt-7">
              <span className="block">
                Understanding threats
                <span className="text-accent">.</span>
              </span>
              <span className="serif-it block mt-1">Investigating what others miss.</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-dim">{SITE.intro}</p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#projects" className="btn btn-solid">
                EXPLORE MY WORK <ArrowDown />
              </a>
              <a href="#contact" className="btn btn-ghost">
                GET IN TOUCH <ArrowRight />
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-10 flex items-center gap-3.5 font-mono text-[0.68rem] font-medium tracking-[0.22em] text-dim">
              <span
                className="pulse-dot block h-[7px] w-[7px] rounded-full bg-accent"
                aria-hidden="true"
              />
              {SITE.status}
            </p>
          </Reveal>
        </div>

        {/* signal field */}
        <Reveal delay={200} className="relative opacity-60 sm:opacity-80 lg:opacity-100">
          <div className="relative mx-auto max-w-[640px] lg:max-w-none">
            <TopoField />
            <span className="absolute left-1 top-2 font-mono text-[0.6rem] tracking-[0.24em] text-faint">
              FIG. 01 — SIGNAL FIELD
            </span>
            <span className="absolute bottom-1 right-1 font-mono text-[0.6rem] tracking-[0.24em] text-faint">
              SYNTHETIC · NO LIVE DATA
            </span>
          </div>
        </Reveal>
      </div>

      {/* bottom meta bar */}
      <div className="hidden border-t border-line md:block">
        <div className="site-container flex h-14 items-center justify-between">
          <span className="font-mono text-[0.62rem] tracking-[0.24em] text-faint">
            SCROLL <span className="text-accent">↓</span>
          </span>
          <span className="font-mono text-[0.62rem] tracking-[0.24em] text-faint">
            NO COOKIES · NO TRACKING · NO METRICS
          </span>
        </div>
      </div>
    </section>
  );
}
