import type { ProjectVisual as VisualKind } from "../data/content";

const INK = "#E8E6E1";

/* --------------------------------------------------------------------------
 * 01 — AI-SOC: deterministic analysis pipeline (schematic, not a live feed)
 * ------------------------------------------------------------------------ */
const INPUTS: Array<{ label: string; y: number }> = [
  { label: "URLS", y: 30 },
  { label: "PHISH EMAIL", y: 88 },
  { label: "AUTH LOGS", y: 146 },
  { label: "SHELL CMDS", y: 204 },
  { label: "SEC EVENTS", y: 262 },
];

function PipelineDiagram() {
  const inputRight = 140; // x of input boxes' right edge
  const riskL = 234; // risk box left edge
  const riskY = 156; // risk box centre y
  return (
    <svg
      viewBox="0 0 560 330"
      className="h-auto w-full"
      style={{ fontFamily: "var(--font-mono)" }}
      role="img"
      aria-label="Schematic: five categories of security signal flow into a risk scoring stage, which feeds explainable indicators and recommendations."
    >
      {/* converge paths */}
      {INPUTS.map((inp, i) => (
        <path
          key={`c${i}`}
          d={`M ${inputRight} ${inp.y + 16} C 196 ${inp.y + 16} 196 ${riskY} ${riskL} ${riskY}`}
          fill="none"
          stroke={i === 0 ? "#C7F36B" : INK}
          strokeOpacity={i === 0 ? 0.55 : 0.16}
          strokeDasharray={i === 0 ? "4 5" : undefined}
        />
      ))}
      {/* fan-out paths */}
      <path d={`M 354 ${riskY} C 396 ${riskY} 402 114 436 114`} fill="none" stroke={INK} strokeOpacity="0.28" />
      <path d={`M 354 ${riskY} C 396 ${riskY} 402 216 436 216`} fill="none" stroke={INK} strokeOpacity="0.28" />
      {/* entry notches */}
      <path d={`M ${riskL - 7} 149 L ${riskL} 156 L ${riskL - 7} 163`} fill="none" stroke={INK} strokeOpacity="0.45" />
      <path d="M 429 107 L 436 114 L 429 121" fill="none" stroke={INK} strokeOpacity="0.45" />
      <path d="M 429 209 L 436 216 L 429 223" fill="none" stroke={INK} strokeOpacity="0.45" />

      {INPUTS.map((inp) => (
        <g key={inp.label}>
          <rect
            x="24"
            y={inp.y}
            width="116"
            height="32"
            rx="2"
            fill="rgba(232,230,225,0.02)"
            stroke={INK}
            strokeOpacity="0.22"
          />
          <text
            x="82"
            y={inp.y + 20}
            textAnchor="middle"
            fontSize="9"
            letterSpacing="1.5"
            fill="#9B9993"
          >
            {inp.label}
          </text>
        </g>
      ))}
      <g>
        <rect x="234" y="134" width="120" height="44" rx="2" fill="rgba(199,243,107,0.05)" stroke="#C7F36B" strokeOpacity="0.7" />
        <text x="294" y="153" textAnchor="middle" fontSize="9" letterSpacing="1.5" fill="#C7F36B">RISK</text>
        <text x="294" y="166" textAnchor="middle" fontSize="9" letterSpacing="1.5" fill="#C7F36B">SCORE</text>
      </g>
      <g>
        <rect x="436" y="94" width="112" height="40" rx="2" fill="none" stroke={INK} strokeOpacity="0.3" />
        <text x="492" y="111" textAnchor="middle" fontSize="8.5" letterSpacing="1.2" fill="#9B9993">EXPLAINABLE</text>
        <text x="492" y="124" textAnchor="middle" fontSize="8.5" letterSpacing="1.2" fill="#9B9993">INDICATORS</text>
        <rect x="436" y="196" width="112" height="40" rx="2" fill="none" stroke={INK} strokeOpacity="0.3" />
        <text x="492" y="219" textAnchor="middle" fontSize="8.5" letterSpacing="1.2" fill="#9B9993">RECOMMENDATIONS</text>
      </g>
    </svg>
  );
}

/* --------------------------------------------------------------------------
 * 02 — SpatialDisplayResearch: layered depth planes
 * ------------------------------------------------------------------------ */
const PLANES = [
  {
    cls: "plane-3",
    tag: "PLANE A",
    style: { transform: "rotateX(52deg) rotateZ(-38deg) translateZ(-30px)" },
  },
  {
    cls: "plane-2",
    tag: "PLANE B",
    style: { transform: "rotateX(52deg) rotateZ(-38deg) translateZ(45px)" },
  },
  {
    cls: "plane-1",
    tag: "PLANE C",
    style: { transform: "rotateX(52deg) rotateZ(-38deg) translateZ(120px)" },
  },
];

function PlanesVisual() {
  return (
    <div className="plane-stage relative h-full w-full" aria-hidden="true">
      <div
        className="plane-wrap absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      />
      <div
        className="plane-wrap absolute top-[16%] left-[10%] h-[58%] w-[68%]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {PLANES.map((p) => (
          <div
            key={p.cls}
            className={`plane-wrap absolute inset-0 ${p.cls}`}
            style={{ ...p.style, transformStyle: "preserve-3d" }}
          >
            <div className="plane absolute inset-0">
              <span className="absolute left-3 top-2 font-mono text-[0.55rem] tracking-[0.3em] text-steel">
                {p.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* depth axis */}
      <div
        className="absolute right-[7%] top-[24%] h-[52%] w-px bg-line-strong"
        aria-hidden="true"
      />
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute right-[7%] h-[5px] w-[5px] translate-x-1/2 translate-y-1/2 rounded-full"
          style={{
            top: `${24 + i * 26}%`,
            background: i === 0 ? "#C7F36B" : "rgba(139,167,199,.8)",
          }}
        />
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------------
 * 03 — OSINT workspace: dossier sketch, explicitly planned
 * ------------------------------------------------------------------------ */
const DOSSIERS = [
  { label: "SOURCES", offset: "rotate-[0.8deg]" },
  { label: "LEADS", offset: "-rotate-[0.6deg]" },
  { label: "REFERENCES", offset: "rotate-[0.4deg]" },
];

function DossierVisual() {
  return (
    <div className="relative flex h-full w-full flex-col p-5 md:p-6" aria-hidden="true">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <span className="mono-label">CASE FILE — WORKSPACE</span>
        <span className="stamp">PLANNED · NOT BUILT</span>
      </div>
      <div className="mt-4 flex flex-1 flex-col gap-3 md:gap-4">
        {DOSSIERS.map((d, i) => (
          <div key={d.label} className={`dossier-card flex-1 p-3.5 md:p-4 ${d.offset}`}>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[0.6rem] tracking-[0.28em] text-dim">
                <span className="text-faint">{String(i + 1).padStart(2, "0")} — </span>
                {d.label}
              </span>
              <span className="dossier-line w-14 md:w-24" />
            </div>
            <div className="dossier-line mt-3 w-3/5" />
            <div className="dossier-line mt-2 w-2/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectVisual({ kind }: { kind: VisualKind }) {
  return (
    <div className="relative aspect-[7/5] w-full overflow-hidden border border-line bg-panel">
      {kind === "pipeline" && <PipelineDiagram />}
      {kind === "planes" && <PlanesVisual />}
      {kind === "dossier" && <DossierVisual />}
      <span className="absolute bottom-2.5 left-3 max-w-[85%] pr-2 font-mono text-[0.58rem] leading-tight tracking-[0.16em] text-faint">
        {kind === "pipeline" && "ANALYSIS PIPELINE — DETERMINISTIC SCHEMATIC"}
        {kind === "planes" && "DEPTH STACK — SPATIAL DISPLAY MODEL"}
        {kind === "dossier" && "SCOPE: PUBLIC-SOURCE COLLECTION ONLY"}
      </span>
    </div>
  );
}
