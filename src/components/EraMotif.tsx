import type { EraMotif as Motif } from '../data/types'
import { Galaxy } from './Galaxy'

/**
 * Glowing panels for the Nine era: nine of them, one per member. Position, size
 * and tilt, all outside the cover and clear of the text column.
 */
const NINE_PANELS = [
  { x: 70, y: 150, s: 14, r: -6 },
  { x: 100, y: 360, s: 10, r: 4 },
  { x: 55, y: 520, s: 12, r: -3 },
  { x: 210, y: 95, s: 11, r: 5 },
  { x: 340, y: 70, s: 15, r: -4 },
  { x: 255, y: 520, s: 13, r: 3 },
  { x: 410, y: 545, s: 10, r: -5 },
  { x: 450, y: 130, s: 9, r: 6 },
  { x: 600, y: 555, s: 11, r: 4 },
]

/**
 * Light background art per era, drawn from the real covers:
 * dawn (the EP), a winding golden road (Limasawa Street), ruled journal lines
 * (Kuwaderno), a galaxy (Traveller, see Galaxy.tsx), glowing panels on stones (Nine).
 */
export function EraMotif({ motif, color }: { motif: Motif; color: string }) {
  const common = {
    'aria-hidden': true,
    className: 'pointer-events-none absolute inset-0 h-full w-full',
    viewBox: '0 0 1000 600',
    preserveAspectRatio: 'xMidYMid slice',
  } as const

  // Everything stays on the cover side (x < ~460 of 1000) or along the bottom
  // edge, so the art never sits under the text column.
  switch (motif) {
    case 'dawn':
      // A sun on the horizon (the panel's bottom edge), drawn around its center at
      // (320, 640). On the pinned desktop layout, Discography.tsx raises it as the
      // era comes in; the markup is the risen state.
      return (
        <svg {...common}>
          <defs>
            <radialGradient id="ep-sun">
              <stop offset="0" stopColor="#FFE3A3" stopOpacity="0.85" />
              <stop offset="0.5" stopColor={color} stopOpacity="0.22" />
              <stop offset="1" stopColor={color} stopOpacity="0" />
            </radialGradient>
          </defs>
          <g className="sunrise" transform="translate(320 640)">
            <circle className="sunrise-glow" r="320" fill="url(#ep-sun)" opacity="0.5" />
            <g stroke={color} fill="none" opacity="0.28">
              <circle r="230" strokeWidth="2" />
              <circle className="sunrise-ring" r="300" strokeWidth="1" strokeDasharray="2 10" />
              {Array.from({ length: 9 }, (_, i) => {
                const a = Math.PI + (i + 2) * (Math.PI / 12)
                return (
                  <line
                    key={i}
                    className="sunrise-ray"
                    x1={(Math.cos(a) * 330).toFixed(1)}
                    y1={(Math.sin(a) * 330).toFixed(1)}
                    x2={(Math.cos(a) * 400).toFixed(1)}
                    y2={(Math.sin(a) * 400).toFixed(1)}
                    pathLength={1}
                    strokeDasharray="1"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )
              })}
            </g>
          </g>
        </svg>
      )
    case 'road':
      // A golden road that winds in from the bottom, behind the cover, up to the lamp.
      // The lamp is drawn around (0, 0) and placed at the road's end (100, 80). On the
      // pinned desktop layout, Discography.tsx carries it along the road as it draws.
      return (
        <svg {...common}>
          <defs>
            <radialGradient id="limasawa-lamp">
              <stop offset="0" stopColor="#FFF6D8" stopOpacity="0.9" />
              <stop offset="1" stopColor={color} stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            className="draw"
            d="M -40 620 C 160 600 330 560 430 490 S 460 300 420 200 S 260 70 100 80"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            opacity="0.55"
          />
          <g className="draw-rider" transform="translate(100 80)">
            <circle className="draw-rider-glow" r="70" fill="url(#limasawa-lamp)" />
            <rect
              className="draw-rider-body"
              x="-14"
              y="-14"
              width="28"
              height="28"
              rx="4"
              fill={color}
              opacity="0.9"
              transform="rotate(8)"
            />
          </g>
        </svg>
      )
    case 'journal':
      return (
        <svg {...common}>
          <g stroke="#2E2219" opacity="0.14">
            {Array.from({ length: 16 }, (_, i) => (
              <line key={i} x1="0" x2="1000" y1={40 + i * 38} y2={40 + i * 38} strokeWidth="1" />
            ))}
          </g>
          <line x1="70" x2="70" y1="0" y2="600" stroke={color} strokeWidth="1.5" opacity="0.45" />
          <g fill="#2E2219" opacity="0.18">
            <circle cx="30" cy="120" r="7" />
            <circle cx="30" cy="300" r="7" />
            <circle cx="30" cy="480" r="7" />
          </g>
        </svg>
      )
    case 'stars':
      return <Galaxy color={color} />
    case 'stones':
      // Small glowing panels scattered around the cover, like the ones on the Nine
      // artwork, over feathered river stones along the bottom.
      return (
        <svg {...common}>
          <defs>
            <radialGradient id="nine-stone">
              <stop offset="0" stopColor={color} stopOpacity="0.2" />
              <stop offset="0.6" stopColor={color} stopOpacity="0.08" />
              <stop offset="1" stopColor={color} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nine-glow">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
              <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.12" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g fill="url(#nine-stone)">
            <ellipse cx="250" cy="620" rx="230" ry="95" />
            <ellipse cx="540" cy="640" rx="200" ry="85" />
            <ellipse cx="800" cy="635" rx="190" ry="90" />
          </g>
          {/* On the pinned desktop layout, Discography.tsx flies these in to the spots set here. */}
          {NINE_PANELS.map((p, i) => (
            <g key={i} className="light-box" transform={`translate(${p.x} ${p.y}) rotate(${p.r})`}>
              <circle r={p.s * 3.2} fill="url(#nine-glow)" />
              <rect x={-p.s / 2} y={-p.s * 0.7} width={p.s} height={p.s * 1.4} rx="1.5" fill="#FFFFFF" opacity="0.85" />
            </g>
          ))}
        </svg>
      )
  }
}
