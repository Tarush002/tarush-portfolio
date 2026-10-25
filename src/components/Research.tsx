import { LINKS, PUBLICATION } from "../data/content";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./Icons";

export default function Research() {
  return (
    <section id="research" className="section">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div>
              <p className="eyebrow">03 · RESEARCH</p>
              <h2 className="display-2 mt-6">
                Written work<span className="text-accent">.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-xs pb-2 text-sm leading-relaxed text-dim">
              A record kept exactly as its publisher states it — no embellishment, no padding.
            </p>
          </Reveal>
        </div>

        <article className="mt-16 grid gap-10 border-t border-line pt-14 lg:grid-cols-12 lg:gap-8">
          {/* meta rail */}
          <Reveal className="lg:col-span-4">
            <dl className="space-y-4 font-mono text-[0.68rem] tracking-[0.16em]">
              <div>
                <dt className="text-faint">TYPE</dt>
                <dd className="mt-1 text-dim">BOOK CHAPTER</dd>
              </div>
              <div>
                <dt className="text-faint">IN</dt>
                <dd className="mt-1 normal-case text-dim tracking-[0.1em]">
                  {PUBLICATION.meta.book}
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-2 pt-1">
                <div>
                  <dt className="text-faint">PUBLISHER</dt>
                  <dd className="mt-1 text-dim">CRC PRESS</dd>
                </div>
                <div>
                  <dt className="text-faint">YEAR</dt>
                  <dd className="mt-1 text-dim">{PUBLICATION.meta.year}</dd>
                </div>
                <div>
                  <dt className="text-faint">PAGES</dt>
                  <dd className="mt-1 text-dim">{PUBLICATION.meta.pages}</dd>
                </div>
                <div>
                  <dt className="text-faint">EDITION</dt>
                  <dd className="mt-1 text-dim">{PUBLICATION.meta.edition}</dd>
                </div>
              </div>
              <div>
                <dt className="text-faint">DOI</dt>
                <dd className="mt-1">
                  <a
                    href={LINKS.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link inline-flex items-center gap-1 text-accent"
                  >
                    {PUBLICATION.meta.doi} <ArrowUpRight />
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* body */}
          <Reveal delay={110} className="lg:col-span-8">
            <p className="mono-label text-faint">{PUBLICATION.label}</p>
            <h3 className="mt-4 max-w-3xl font-sans text-2xl font-medium leading-snug tracking-tight md:text-[2rem]">
              <a
                href={PUBLICATION.href}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link decoration-accent/60 underline-offset-4"
              >
                {PUBLICATION.title}
              </a>
            </h3>
            <p className="mt-4 font-mono text-[0.72rem] tracking-[0.14em] text-dim">
              {PUBLICATION.authors.map((name, i) => (
                <span key={name}>
                  {i > 0 && <span className="text-faint"> · </span>}
                  {name}
                </span>
              ))}
            </p>
            <p className="mt-6 max-w-2xl leading-relaxed text-dim">{PUBLICATION.summary}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={PUBLICATION.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                READ PUBLICATION <ArrowUpRight />
              </a>
            </div>
          </Reveal>
        </article>
      </div>
    </section>
  );
}
