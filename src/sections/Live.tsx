import { useEffect, useRef } from 'react'
import { gsap, MQ, useGSAP } from '../lib/gsap'
import { inBand } from '../lib/observe'
import { stages } from '../data/stages'
import { RevealText } from '../components/RevealText'
import { SourceList } from '../components/SourceList'

/** A dark-stage timeline. A spotlight lights each stop as it reaches the middle. */
export function Live() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = Array.from(root.current?.querySelectorAll('.stage-item') ?? [])
    return inBand(items, (el, inside) => el.classList.toggle('is-lit', inside), 36)
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '.live-progress',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.stage-list', start: 'top 60%', end: 'bottom 60%', scrub: true },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="live"
      data-bg="#231111"
      aria-labelledby="live-title"
      tabIndex={-1}
      className="cv-auto relative px-4 py-28 text-dawn [--cis:3000px] sm:px-8 lg:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <p data-reveal className="kicker text-glow">
          Live and big stages
        </p>
        <RevealText id="live-title" className="display mt-4 max-w-4xl text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92]">
          From Singapore to the Araneta
        </RevealText>
      </div>

      <div className="relative mx-auto mt-16 max-w-5xl lg:mt-24">
        <div aria-hidden className="absolute bottom-0 left-[0.375rem] top-0 w-px bg-dawn/15 sm:left-[11.75rem]">
          <div className="live-progress h-full w-full origin-top bg-glow" />
        </div>
        <ol className="stage-list">
          {stages.map((s) => (
            <li
              key={s.id}
              className="stage-item relative grid gap-x-12 py-10 pl-10 sm:grid-cols-[10rem_minmax(0,1fr)] sm:pl-0"
            >
              <div
                aria-hidden
                className="stage-spot pointer-events-none absolute -inset-x-8 inset-y-0 -z-0 rounded-[2rem]"
                style={{ background: 'radial-gradient(60% 80% at 30% 50%, rgb(242 207 58 / 0.12), transparent 70%)' }}
              />
              <span
                aria-hidden
                className="stage-dot absolute left-0 top-12 h-3 w-3 rounded-full bg-dawn/35 sm:left-[11.375rem]"
              />
              <p className="kicker relative pt-1 text-dawn/80 sm:pt-3 sm:text-right">
                <time>{s.date}</time>
              </p>
              <div className="relative mt-2 sm:mt-0">
                <h3 className="display text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.02]">
                  {s.title}
                  {s.upcoming && (
                    <span className="kicker ml-3 inline-block translate-y-[-0.4em] rounded-full bg-glow px-2.5 py-1 align-middle text-[0.6rem] text-ink">
                      Upcoming
                    </span>
                  )}
                </h3>
                <p className="mt-2 text-base text-dawn/85">{s.place}</p>
                <p className="mt-3 max-w-2xl leading-relaxed text-dawn/75">{s.detail}</p>
                <SourceList sources={s.sources} className="mt-3 text-dawn/80" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
