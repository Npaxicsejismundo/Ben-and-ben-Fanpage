import { useRef } from 'react'
import { gsap, MQ, useGSAP } from '../lib/gsap'
import { story } from '../data/site'
import { Img } from '../components/Img'
import { RevealText } from '../components/RevealText'
import { SourceList } from '../components/SourceList'

/** Three journal pages that stack on top of each other as you scroll. */
export function Story() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const cards = gsap.utils.toArray<HTMLElement>('.story-card')
        cards.forEach((card, i) => {
          const next = cards[i + 1]
          if (!next) return
          gsap.to(card.querySelector('.story-page'), {
            scale: 0.92,
            rotate: i % 2 ? 1.2 : -1.2,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 25%', scrub: true },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="story"
      data-bg="#E6D6B4"
      aria-labelledby="story-title"
      tabIndex={-1}
      className="relative px-4 pb-24 pt-28 text-ink sm:px-8 lg:pb-40 lg:pt-40"
    >
      <div className="mx-auto max-w-6xl">
        <p data-reveal className="kicker text-cocoa">
          The story
        </p>
        <RevealText id="story-title" className="display mt-4 max-w-4xl text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92]">
          From The Benjamins to Ben&amp;Ben
        </RevealText>
        <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-cocoa">
          Three pages from a nine-year journal.
        </p>
      </div>

      <ol className="mx-auto mt-16 max-w-6xl lg:mt-24">
        {story.map((chapter, i) => (
          <li
            key={chapter.id}
            className="story-card sticky mb-[14svh] last:mb-0"
            style={{ top: `calc(5.75rem + ${i * 1.5}rem)` }}
          >
            <article
              aria-labelledby={`story-${chapter.id}`}
              className="story-page paper-ruled relative grid min-h-[68svh] origin-top gap-10 overflow-hidden rounded-[1.75rem] border border-ink/10 bg-paper p-6 pl-16 shadow-[0_30px_80px_-40px_rgb(35_17_17/0.5)] sm:p-10 sm:pl-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:items-center lg:p-14 lg:pl-24"
            >
              <div>
                <p className="display text-[clamp(3.25rem,10vw,8.5rem)] leading-[0.85] text-[#A85B32]">
                  {chapter.kicker}
                </p>
                <h3 id={`story-${chapter.id}`} className="display mt-6 text-[clamp(1.75rem,3.6vw,3rem)] leading-tight">
                  {chapter.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-[2rem] text-cocoa sm:text-lg sm:leading-[2rem]">
                  {chapter.body}
                </p>
                <SourceList sources={chapter.sources} className="mt-6 text-cocoa" />
              </div>
              <figure className="relative mx-auto w-full max-w-sm rotate-2 bg-light p-3 pb-3 shadow-[0_20px_50px_-24px_rgb(35_17_17/0.55)]">
                <span aria-hidden className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
                {/* Each photo keeps its own shape, so nobody gets cropped out. */}
                <Img
                  image={chapter.image}
                  sizes="(min-width: 1024px) 24rem, 80vw"
                  deferMargin="400px 0px"
                  placeholderLabel={chapter.imageLabel ?? 'Photo TBD'}
                  placeholderColor="#E6D6B4"
                  className="block w-full object-cover"
                  style={{
                    aspectRatio: chapter.image ? `${chapter.image.width} / ${chapter.image.height}` : '4 / 3',
                  }}
                />
                <figcaption className="display flex min-h-10 items-end justify-center px-2 pt-2 text-lg italic text-cocoa">
                  {chapter.imageCaption}
                </figcaption>
              </figure>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
