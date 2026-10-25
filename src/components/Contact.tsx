import { LINKS } from "../data/content";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./Icons";

const CHANNELS = [
  { label: "GITHUB", handle: "github.com/Tarush002", href: LINKS.github },
  { label: "LINKEDIN", handle: "linkedin.com/in/tarush-singh-477136294", href: LINKS.linkedin },
];

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">06 · CONTACT</p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="display-2 mt-6 max-w-3xl">
            Have a worthwhile problem{" "}
            <span className="serif-it block sm:inline">to investigate?</span>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-dim">
            I'm interested in thoughtful conversations around cybersecurity, OSINT, AI, and
            research.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-14 border-b border-line">
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[6.2rem_1fr_auto] items-center gap-4 border-t border-line px-2 py-7 transition-colors duration-300 hover:bg-ink/[0.03] sm:px-4"
              >
                <span className="mono-label">{c.label}</span>
                <span className="truncate font-mono text-sm text-ink transition-colors group-hover:text-accent md:text-base">
                  {c.handle}
                </span>
                <span className="text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent">
                  <ArrowUpRight className="text-[1.1rem]" />
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={260}>
          <p className="mt-6 font-mono text-[0.62rem] leading-relaxed tracking-[0.18em] text-faint">
            PREFERRED FIRST CONTACT — THE CHANNELS ABOVE. NO CONTACT FORM · NO SPAM · NO NOISE.
            NO EMAIL PUBLISHED — NONE HAS BEEN VERIFIED FOR PUBLIC USE.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
