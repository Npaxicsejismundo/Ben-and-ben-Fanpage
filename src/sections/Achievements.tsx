import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { motionEnabled, onceVisible } from '../lib/observe'
import { counters, highlights } from '../data/achievements'
import { RevealText } from '../components/RevealText'
import { SourceList } from '../components/SourceList'

/** Counters count up once on view; the final value is in the markup for everyone else. */
export function Achievements() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!motionEnabled() || !root.current) return
    const els = Array.from(root.current.querySelectorAll<HTMLElement>('[data-count]'))
    els.forEach((el) => (el.textContent = '0'))
    const tweens: gsap.core.Tween[] = []
    const stop = onceVisible(els, (visible) => {
      visible.forEach((node, i) => {
        const el = node as HTMLElement
        const state = { v: 0 }
        tweens.push(
          gsap.to(state, {
            v: Number(el.dataset.count),
            duration: 2.2,
            delay: i * 0.12,
            ease: 'power3.out',
            onUpdate: () => {
              el.textContent = String(Math.round(state.v))
            },
          }),
        )
      })
    })
    return () => {
      stop()
      tweens.forEach((t) => t.kill())
      els.forEach((el) => (el.textContent = el.dataset.count ?? ''))
    }
  }, [])

  return (
    <section
      ref={root}
      id="achievements"
      data-bg="#E9B949"
      aria-labelledby="achievements-title"
      tabIndex={-1}
      className="cv-auto relative px-4 py-28 text-ink [--cis:2400px] sm:px-8 lg:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <p data-reveal className="kicker">
          Achievements
        </p>
        <RevealText id="achievements-title" className="display mt-4 text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92]">
          A few milestones
        </RevealText>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-ink/15 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {counters.map((c) => (
            <div key={c.id} data-reveal className="flex flex-col bg-[#EDC35E] p-6 sm:p-8">
              <dt className="order-2 mt-3 text-lg font-semibold">{c.label}</dt>
              <dd className="order-1 display text-[clamp(4rem,9vw,7.5rem)] leading-[0.85]">
                <span className="sr-only">
                  {c.prefix}
                  {c.value}
                  {c.suffix}
                </span>
                <span aria-hidden>
                  {c.prefix}
                  <span data-count={c.value}>{c.value}</span>
                  {c.suffix}
                </span>
              </dd>
              <dd className="order-3 mt-3 text-sm leading-relaxed text-cocoa">{c.detail}</dd>
              <dd className="order-4 mt-auto pt-5">
                <SourceList sources={c.sources} className="text-cocoa" />
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-16 lg:mt-24">
          {highlights.map((h) => (
            <li
              key={h.id}
              data-reveal
              className="grid gap-2 border-t border-ink/20 py-7 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[10rem_minmax(0,1.2fr)_minmax(0,1fr)]"
            >
              <p className="kicker pt-2 text-cocoa">{h.year}</p>
              <h3 className="display text-[clamp(1.5rem,3vw,2.5rem)] leading-tight">{h.title}</h3>
              <div className="sm:col-start-2 lg:col-start-auto">
                <p className="leading-relaxed text-cocoa">{h.detail}</p>
                <SourceList sources={h.sources} className="mt-2 text-cocoa" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
