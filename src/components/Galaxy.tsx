import type { CSSProperties } from 'react'

/** Deterministic pseudo-random numbers, so the sky is identical on every render. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
}

/** Colors from The Traveller Across Dimensions cover: cream, gold, pink and sky blue. */
const STAR_COLORS = ['#F2F0DC', '#F2F0DC', '#E8C66A', '#EDB8E6', '#A9C2FF']

/**
 * Three star layers, far to near. Each is 116% of the panel wide so it can slide
 * sideways (`data-depth`, in percent) without showing an edge; nearer layers
 * have fewer, bigger, brighter stars and move further.
 */
const LAYERS = [
  { depth: 1.5, count: 70, size: [0.4, 0.9], opacity: 0.4 },
  { depth: 3.5, count: 34, size: [0.8, 1.4], opacity: 0.6 },
  { depth: 6, count: 14, size: [1.4, 2.3], opacity: 0.9 },
].map((layer, i) => {
  const rand = seeded(9 + i * 31)
  return {
    depth: layer.depth,
    stars: Array.from({ length: layer.count }, () => ({
      x: rand() * 1160,
      y: rand() * 600,
      r: layer.size[0] + rand() * (layer.size[1] - layer.size[0]),
      color: STAR_COLORS[Math.floor(rand() * STAR_COLORS.length)],
      opacity: layer.opacity * (0.6 + rand() * 0.4),
    })),
  }
})

/** A point `t` (0 at the core, 1 at the rim) along spiral arm `arm`, in a -400..400 square. */
function armPoint(arm: number, t: number) {
  const radius = 60 + t * 320
  const angle = arm * Math.PI + t * 4.4
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, angle, radius }
}

/** Each arm's center line, for the glowing dust lane drawn under its stars. */
const ARM_PATHS = [0, 1].map((arm) =>
  Array.from({ length: 41 }, (_, i) => {
    const { x, y } = armPoint(arm, i / 40)
    return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' '),
)

/** Stars scattered along the two arms, denser and brighter toward the core. */
const SPIRAL = (() => {
  const rand = seeded(23)
  const dots: { x: number; y: number; r: number; color: string; opacity: number }[] = []
  for (let arm = 0; arm < 2; arm++) {
    for (let i = 0; i < 150; i++) {
      const t = i / 149
      const { angle, radius } = armPoint(arm, t)
      const a = angle + (rand() - 0.5) * 0.35
      const spread = 10 + t * 40
      dots.push({
        x: Math.cos(a) * radius + (rand() - 0.5) * spread,
        y: Math.sin(a) * radius + (rand() - 0.5) * spread,
        r: (1 + rand() * 2.2) * (1 - t * 0.4),
        color: STAR_COLORS[Math.floor(rand() * STAR_COLORS.length)],
        opacity: 1 - t * 0.5,
      })
    }
  }
  return dots
})()

/** Stars that twinkle (percent positions, size in px, twinkle period in s). */
const TWINKLES = (() => {
  const rand = seeded(57)
  return Array.from({ length: 16 }, (_, i) => ({
    x: 3 + rand() * 94,
    y: 4 + rand() * 92,
    size: 2.5 + rand() * 2.5,
    gold: i % 4 === 0,
    period: 2.6 + rand() * 2.8,
    delay: -rand() * 5,
  }))
})()

/** Shooting stars, a nod to "Comets": where each starts, how far it flies, how often. */
const COMETS = [
  { x: 74, y: 6, dx: -460, dy: 200, every: 11, delay: 2 },
  { x: 96, y: 38, dx: -520, dy: 230, every: 15, delay: 7.5 },
  { x: 46, y: 2, dx: -380, dy: 165, every: 19, delay: 12 },
]

/**
 * Soft clouds in the cover's colors. Each fades to nothing at its own edges and
 * stays clear of the panel's sides (allowing for drift), so the panel edge never
 * cuts one off in a hard line.
 */
const NEBULAE = [
  // Behind the cover: violet.
  { className: 'left-[6%] top-[6%] w-[60%] lg:top-[2%] lg:w-[52%]', color: 'rgb(141 123 234 / 0.36)', delay: 0 },
  // Bottom right: pink.
  { className: 'right-[6%] -bottom-[16%] w-[48%]', color: 'rgb(231 163 217 / 0.24)', delay: -9 },
  // Top, toward the middle: sky blue.
  { className: 'left-[34%] -top-[28%] w-[44%]', color: 'rgb(111 168 245 / 0.2)', delay: -17 },
]

/**
 * The Traveller era's sky: drifting nebulae in the cover's colors, a starfield in
 * three depths, a tilted spiral galaxy turning around the cover, twinkling stars
 * and the odd shooting star.
 *
 * Motion comes from two places. On the pinned desktop layout, Discography.tsx
 * slides the star layers at different speeds (`data-depth`) and turns the
 * galaxy with the scroll. Ambient twinkling, drifting and shooting stars are CSS
 * (index.css) and start with the visitor's first interaction. With reduced
 * motion, it is a still sky.
 */
export function Galaxy({ color }: { color: string }) {
  return (
    <div aria-hidden className="galaxy pointer-events-none absolute inset-0 overflow-hidden">
      {NEBULAE.map((n, i) => (
        <div
          key={i}
          data-depth="1"
          className={`nebula absolute aspect-[6/5] rounded-full will-change-transform ${n.className}`}
          style={{ background: `radial-gradient(closest-side, ${n.color}, transparent)`, '--delay': `${n.delay}s` } as CSSProperties}
        />
      ))}

      {LAYERS.map((layer, i) => (
        <svg
          key={i}
          data-depth={layer.depth}
          className="absolute inset-y-0 -left-[8%] h-full w-[116%] will-change-transform"
          viewBox="0 0 1160 600"
          preserveAspectRatio="xMidYMid slice"
        >
          {layer.stars.map((s, j) => (
            <circle
              key={j}
              cx={s.x.toFixed(1)}
              cy={s.y.toFixed(1)}
              r={s.r.toFixed(2)}
              fill={s.color}
              opacity={s.opacity.toFixed(2)}
            />
          ))}
        </svg>
      ))}

      {/* Tilted (squashed) and turned a little; the inner disc spins in its own plane. */}
      <div
        className="absolute left-1/2 top-[24%] aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 lg:left-[28%] lg:top-[48%] lg:w-[58%]"
        style={{ transform: 'rotate(-14deg) scaleY(0.5)' }}
      >
        <svg className="galaxy-spiral galaxy-spin block h-full w-full will-change-transform" viewBox="-400 -400 800 800">
          <defs>
            <radialGradient id="galaxy-core">
              <stop offset="0" stopColor="#FFF4D6" stopOpacity="0.9" />
              <stop offset="0.35" stopColor={color} stopOpacity="0.35" />
              <stop offset="1" stopColor={color} stopOpacity="0" />
            </radialGradient>
            {/* Dust lanes fade out toward the rim. */}
            <radialGradient id="galaxy-dust" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="400">
              <stop offset="0" stopColor="#C9B6FF" stopOpacity="0.5" />
              <stop offset="0.5" stopColor="#E7A3D9" stopOpacity="0.24" />
              <stop offset="0.8" stopColor="#E7A3D9" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle r="170" fill="url(#galaxy-core)" />
          <g fill="none" stroke="url(#galaxy-dust)" strokeLinecap="round" strokeLinejoin="round">
            {ARM_PATHS.map((d, i) => (
              <g key={i}>
                <path d={d} strokeWidth="64" opacity="0.35" />
                <path d={d} strokeWidth="20" opacity="0.6" />
              </g>
            ))}
          </g>
          {SPIRAL.map((d, i) => (
            <circle
              key={i}
              cx={d.x.toFixed(1)}
              cy={d.y.toFixed(1)}
              r={d.r.toFixed(2)}
              fill={d.color}
              opacity={d.opacity.toFixed(2)}
            />
          ))}
        </svg>
      </div>

      {TWINKLES.map((t, i) => (
        <span
          key={i}
          className="twinkle absolute rounded-full"
          style={
            {
              left: `${t.x}%`,
              top: `${t.y}%`,
              width: t.size,
              height: t.size,
              background: t.gold ? color : '#F7F4E4',
              boxShadow: `0 0 ${t.size * 3}px ${t.gold ? color : '#F7F4E4'}`,
              '--twinkle': `${t.period.toFixed(2)}s`,
              '--delay': `${t.delay.toFixed(2)}s`,
            } as CSSProperties
          }
        />
      ))}

      {COMETS.map((c, i) => (
        <span
          key={i}
          className="comet absolute h-[1.5px] w-36 rounded-full bg-linear-to-r from-transparent to-[#FFF8E6]"
          style={
            {
              left: `${c.x}%`,
              top: `${c.y}%`,
              rotate: `${Math.atan2(c.dy, c.dx)}rad`,
              '--dx': `${c.dx}px`,
              '--dy': `${c.dy}px`,
              '--every': `${c.every}s`,
              '--delay': `${c.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
