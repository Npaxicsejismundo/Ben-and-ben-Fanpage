import { useEffect, useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { members } from '../data/members'

interface LoaderProps {
  /** Called as the light spreads, so the hero can rise in underneath. */
  onReveal: () => void
  /** Called when the overlay is gone. */
  onDone: () => void
}

/**
 * A dark room. The hero wordmark already glows above it (it is lifted over
 * this overlay by the `html.intro` CSS). Nine lights switch on, one per member,
 * gather into one, and the room fills with light, leaving the wordmark in place.
 * Shown only when the boot script set `html.intro`; any key, click or the Skip
 * button jumps to the end.
 */
export function Loader({ onReveal, onDone }: LoaderProps) {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      if (!document.documentElement.classList.contains('intro')) return
      const bulbs = gsap.utils.toArray<HTMLElement>('.loader-bulb')
      const t = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: onDone })
      // About 4.5 s in all: the lights come on one by one (the counter keeps
      // step), all nine hold for a beat, then they gather and fill the room.
      const STAGGER = 0.22

      bulbs.forEach((b, i) => {
        const c = members[i]?.color.hex ?? '#F2CF3A'
        t.to(b, { backgroundColor: c, boxShadow: `0 0 22px 4px ${c}`, scale: 1.25, duration: 0.6 }, i * STAGGER)
        t.call(
          () => {
            if (count.current) count.current.textContent = String(i + 1).padStart(2, '0')
          },
          [],
          i * STAGGER,
        )
      })
      // Gather into one light, then let it fill the room.
      t.to(bulbs, { x: (i) => (4 - i) * 26, scale: 0.6, duration: 0.7, ease: 'expo.inOut' }, '+=0.35')
      t.to('.loader-meta', { autoAlpha: 0, duration: 0.35 }, '<')
      t.set('.loader-orb', { autoAlpha: 1 }, '-=0.15')
      t.to(bulbs, { autoAlpha: 0, duration: 0.2 }, '<')
      t.call(onReveal, [], '<')
      t.to('.loader-orb', { scale: 70, duration: 1.1, ease: 'expo.in' }, '<')
      // Opacity, not background-color: stays on the compositor instead of repainting the screen.
      t.to('.loader-bg', { autoAlpha: 0, duration: 0.6, ease: 'power2.out' }, '-=0.55')
      t.to('.loader-orb', { autoAlpha: 0, duration: 0.4, ease: 'power1.out' }, '-=0.3')
      tl.current = t
    },
    { scope: root },
  )

  useEffect(() => {
    const skip = () => tl.current?.progress(1)
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
  }, [])

  return (
    <div
      ref={root}
      className="loader fixed inset-0 z-[120] text-light"
      onClick={() => tl.current?.progress(1)}
      role="status"
      aria-label="Loading Liwanag"
    >
      <div aria-hidden className="loader-bg absolute inset-0 bg-stage" />
      <div className="absolute inset-x-0 bottom-[16svh] flex flex-col items-center gap-6">
        <div className="loader-row flex items-center gap-3.5" aria-hidden>
          {members.map((m) => (
            <span key={m.id} className="loader-bulb block h-3 w-3 rounded-full bg-[#4a352b]" />
          ))}
        </div>
        <p className="loader-meta display text-sm italic tracking-wide text-light/80">
          <span ref={count}>00</span> / 09 · turning on the lights
        </p>
      </div>
      <span
        aria-hidden
        className="loader-orb glow-orb pointer-events-none invisible absolute left-1/2 top-[45%] -ml-5 -mt-5 h-10 w-10 rounded-full opacity-0 will-change-transform"
      />
      <button
        type="button"
        className="loader-meta kicker absolute bottom-6 right-6 rounded-full border border-light/30 px-4 py-2 text-light/80 hover:text-light"
        onClick={(e) => {
          e.stopPropagation()
          tl.current?.progress(1)
        }}
      >
        Skip intro
      </button>
    </div>
  )
}
