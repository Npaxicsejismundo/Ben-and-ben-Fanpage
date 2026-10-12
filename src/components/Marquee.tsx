import { useRef } from 'react'
import { onAwake } from '../lib/awake'
import { gsap, MQ, ScrollTrigger, useGSAP } from '../lib/gsap'

interface MarqueeProps {
  items: { title: string; lang: 'en' | 'fil' }[]
  label: string
  className?: string
}

/**
 * Endless row of song titles. It drifts on its own, speeds up with scroll
 * velocity and flips direction with the scroll. Static (and wrapped) with
 * reduced motion.
 */
export function Marquee({ items, label, className = '' }: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const loop = gsap.to(track.current, { xPercent: -50, ease: 'none', duration: 60, repeat: -1, paused: true })
        // Start far from zero so the loop can also play backwards.
        loop.totalTime(loop.duration() * 1000)

        let dir = 1
        let boost = 0
        let visible = true
        let started = false
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            dir = self.direction
            boost = Math.min(Math.abs(self.getVelocity()) / 300, 8)
          },
          onToggle: (self) => {
            visible = self.isActive
            loop.paused(!(visible && started))
          },
        })
        const tick = () => {
          boost *= 0.93
          const target = dir * (1 + boost)
          loop.timeScale(gsap.utils.interpolate(loop.timeScale(), target, 0.08))
        }
        const stopWaiting = onAwake(() => {
          started = true
          loop.paused(!visible)
          gsap.ticker.add(tick)
        })
        return () => {
          stopWaiting()
          gsap.ticker.remove(tick)
          st.kill()
        }
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  const row = (dup: boolean) => (
    <ul
      aria-hidden={dup || undefined}
      aria-label={dup ? undefined : label}
      className={`flex shrink-0 items-center ${dup ? 'marquee-dup' : ''}`}
    >
      {items.map((it) => (
        <li key={it.title} lang={it.lang} className="flex items-center">
          <span className="display whitespace-nowrap px-5 text-4xl italic sm:text-6xl lg:text-7xl">{it.title}</span>
          <span aria-hidden className="glow-orb inline-block h-4 w-4 shrink-0 rounded-full sm:h-6 sm:w-6" />
        </li>
      ))}
    </ul>
  )

  return (
    <div ref={root} className={`overflow-hidden py-6 ${className}`}>
      <div ref={track} className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
