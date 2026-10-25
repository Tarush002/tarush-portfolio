import { EDUCATION } from "../data/content";
import Reveal from "./Reveal";

const APPROACH: Array<[string, string]> = [
  ["METHOD", "Collect. Corroborate. Document."],
  ["LENS", "Behaviour, infrastructure, anomalies"],
  ["GROUND RULE", "Public data only, chain of sources intact"],
  ["DEFAULT", "Patient, evidence-first, reproducible"],
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">01 · ABOUT</p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="display-2 mt-6 max-w-4xl">
            Curiosity is the starting point.{" "}
            <span className="serif-it block sm:inline">Evidence is the objective.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-xl text-lg leading-relaxed text-ink">
                I'm drawn to the traces people and systems leave in public view — mapping digital
                footprints, analysing suspicious activity, and understanding where the next class of
                threats is taking shape. Not the loud kind of security; the patient kind.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-7 max-w-xl leading-relaxed text-dim">
                I am currently pursuing a Master of Computer Applications (MCA) in Cyber Security
                at {EDUCATION[0].school}, after completing a Bachelor of Computer Applications
                (BCA) at the University of Lucknow (2022–2025). The rest of my time goes into
                open-source research: OSINT methodology, threat analysis, and small tools — like
                AI-SOC — built to turn raw signals into scored, explainable findings. A published
                book chapter on AI-enabled crime sits on the shelf as evidence the curiosity goes
                somewhere.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-7 max-w-xl leading-relaxed text-dim">
                No invented job titles here. What you'll find below is what exists: projects in
                progress, one verified publication, and defined focus areas.
              </p>
            </Reveal>
          </div>

          <Reveal delay={140} className="lg:col-span-5">
            <dl className="border-t border-line">
              {APPROACH.map(([term, def]) => (
                <div key={term} className="grid grid-cols-[7rem_1fr] gap-6 border-b border-line py-5">
                  <dt className="mono-label pt-[3px]">{term}</dt>
                  <dd className="text-[0.95rem] text-ink">{def}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 font-mono text-[0.62rem] leading-relaxed tracking-[0.18em] text-faint">
              WORKING PRINCIPLES — WHAT EVERY FINDING HAS TO SURVIVE
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
