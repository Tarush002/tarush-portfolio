/**
 * Generative hero visual — "signal field".
 * Synthesitc geometry (deterministic, seeded from fixed coefficients):
 * concentric organic contour lines, a node/link network, rotating
 * instrument rings and a vertical scan sweep. Explicitly NOT real data,
 * and labelled as such on the page.
 */

type Pt = [number, number];

const CX = 450;
const CY = 450;

function contourPath(
  meanR: number,
  wob: number,
  p1: number,
  p2: number,
  p3: number,
  steps = 44,
): string {
  const pts: Pt[] = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r =
      meanR *
      (1 +
        wob *
          (0.55 * Math.sin(2 * t + p1) +
            0.3 * Math.sin(3 * t + p2) +
            0.15 * Math.sin(5 * t + p3)));
    pts.push([CX + r * Math.cos(t), CY + r * Math.sin(t)]);
  }
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const a = pts[i];
    const b = pts[(i + 1) % n];
    const c = pts[(i + 2) % n];
    const c1x = a[0] + (b[0] - p0[0]) / 6;
    const c1y = a[1] + (b[1] - p0[1]) / 6;
    const c2x = b[0] - (c[0] - a[0]) / 6;
    const c2y = b[1] - (c[1] - a[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
  }
  return `${d} Z`;
}

const RINGS = Array.from({ length: 9 }, (_, i) => ({
  d: contourPath(104 + i * 35, 0.05 + i * 0.011, i * 1.7, i * 0.93 + 1.1, i * 2.31),
  opacity: 0.05 + i * 0.011,
}));

const ACCENT_RING_INDEX = 5;

const POLAR_NODES: Array<[number, number]> = [
  [16, 302],
  [72, 414],
  [139, 318],
  [204, 404],
  [252, 262],
  [312, 356],
];

const NODES = POLAR_NODES.map(([deg, r]) => {
  const rad = (deg * Math.PI) / 180;
  return {
    x: CX + r * Math.cos(rad),
    y: CY + r * Math.sin(rad),
  };
});

const LINKS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [2, 5],
  [0, 5],
];

export default function TopoField() {
  return (
    <svg
      viewBox="0 0 900 900"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      {/* architecture grid ticks */}
      <g stroke="#E8E6E1" strokeOpacity="0.1">
        <path d="M450 0v52M450 848v52M0 450h52M848 450h52" />
      </g>

      {/* contours */}
      <g fill="none" strokeLinecap="round">
        {RINGS.map((ring, i) => (
          <path
            key={i}
            d={ring.d}
            stroke={i === ACCENT_RING_INDEX ? "#C7F36B" : "#E8E6E1"}
            strokeOpacity={i === ACCENT_RING_INDEX ? 0.5 : ring.opacity}
            strokeWidth={i === ACCENT_RING_INDEX ? 1.3 : 1}
          />
        ))}
      </g>

      {/* rotating instrument rings */}
      <g fill="none">
        <circle
          cx={CX}
          cy={CY}
          r="318"
          stroke="#E8E6E1"
          strokeOpacity="0.22"
          strokeDasharray="2 10"
          className="anim-spin-slow"
        />
        <circle
          cx={CX}
          cy={CY}
          r="418"
          stroke="#E8E6E1"
          strokeOpacity="0.14"
          strokeDasharray="3 16"
          className="anim-spin-rev"
        />
        {/* tick marks on the inner dial */}
        <g stroke="#E8E6E1" strokeOpacity="0.28" className="anim-spin-slow">
          {Array.from({ length: 24 }, (_, i) => {
            const rad = ((i * 15 - 90) * Math.PI) / 180;
            const r1 = 268;
            const r2 = i % 6 === 0 ? 280 : 275;
            return (
              <line
                key={i}
                x1={CX + r1 * Math.cos(rad)}
                y1={CY + r1 * Math.sin(rad)}
                x2={CX + r2 * Math.cos(rad)}
                y2={CY + r2 * Math.sin(rad)}
                strokeWidth={i % 6 === 0 ? 1.4 : 1}
              />
            );
          })}
        </g>
      </g>

      {/* scan sweep */}
      <g stroke="#C7F36B" className="anim-scan">
        <line x1="0" y1="70" x2="0" y2="830" strokeOpacity="0.3" />
        <line x1="14" y1="70" x2="14" y2="830" strokeOpacity="0.1" />
      </g>

      {/* network — nodes and observed links */}
      <g>
        {LINKS.map(([a, b], i) => {
          const p = NODES[a];
          const q = NODES[b];
          return (
            <line
              key={i}
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              stroke="#E8E6E1"
              strokeOpacity="0.12"
              strokeWidth="1"
            />
          );
        })}
        {NODES.map((n, i) => (
          <circle
            key={`n${i}`}
            cx={n.x}
            cy={n.y}
            r={i === 0 ? 3 : 2.2}
            fill={i === 0 ? "#C7F36B" : "#E8E6E1"}
            fillOpacity={i === 0 ? 1 : 0.7}
            className={i === 0 ? "anim-pulse-node" : undefined}
          />
        ))}
      </g>

      {/* core */}
      <g stroke="#E8E6E1">
        <circle cx={CX} cy={CY} r="11" fill="none" strokeOpacity="0.3" />
        <circle cx={CX} cy={CY} r="3.5" fill="#E8E6E1" fillOpacity="0.85" stroke="none" />
        <g strokeOpacity="0.25">
          <line x1={CX - 30} y1={CY} x2={CX + 30} y2={CY} />
          <line x1={CX} y1={CY - 30} x2={CX} y2={CY + 30} />
        </g>
      </g>
    </svg>
  );
}
