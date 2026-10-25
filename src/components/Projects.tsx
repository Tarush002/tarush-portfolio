import { PROJECTS, type Project } from "../data/content";
import Reveal from "./Reveal";
import ProjectVisual from "./ProjectVisuals";
import { ArrowUpRight } from "./Icons";

interface RowProps {
  project: Project;
  flip: boolean;
}

function ProjectRow({ project, flip }: RowProps) {
  return (
    <article className="grid gap-10 border-b border-line py-16 last-of-type:border-b-0 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-14">
      {/* index + status */}
      <Reveal className={`lg:col-span-2 ${flip ? "lg:order-2" : ""}`}>
        <div className="flex items-center gap-6 lg:flex-col lg:items-start lg:gap-5">
          <p className="big-numeral" aria-hidden="true">
            {project.index}
          </p>
          <span className={`chip ${project.planned ? "chip-muted" : "chip-accent"}`}>
            {project.status}
          </span>
        </div>
      </Reveal>

      {/* narrative */}
      <Reveal
        delay={90}
        className={`lg:col-span-6 ${flip ? "lg:order-3" : ""}`}
      >
        <p className="mono-label">{project.category}</p>
        <h3 className="mt-3 break-words text-[clamp(1.8rem,3.2vw,2.7rem)] leading-tight font-medium tracking-[-0.02em] text-ink">
          {project.title}
        </h3>
        <p className="mt-4 max-w-xl leading-relaxed text-dim">{project.description}</p>

        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag} className={project.planned ? "chip chip-muted" : "chip"}>
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          {project.cta ? (
            <a
              href={project.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link inline-flex items-center gap-2 py-2 font-mono text-[0.72rem] font-semibold tracking-[0.2em] text-ink transition-colors hover:text-accent"
            >
              {project.cta.label} <ArrowUpRight />
            </a>
          ) : (
            <span className="font-mono text-[0.66rem] tracking-[0.2em] text-faint">
              REPOSITORY DEFERRED — CONCEPT PHASE
            </span>
          )}
        </div>
      </Reveal>

      {/* visual */}
      <Reveal delay={160} className={`lg:col-span-4 ${flip ? "lg:order-1" : ""}`}>
        <ProjectVisual kind={project.visual} />
      </Reveal>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div>
              <p className="eyebrow">02 · SELECTED PROJECTS</p>
              <h2 className="display-2 mt-6">
                Built on questions<span className="text-accent">.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-xs pb-2 text-sm leading-relaxed text-dim">
              Presented in their real state — in development or planned. No fake launches, no
              borrowed screenshots, no invented numbers.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-line">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.index} project={project} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
