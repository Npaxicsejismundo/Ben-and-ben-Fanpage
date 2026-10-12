import { useEffect, useRef } from 'react'
import { gsap, MQ, useGSAP } from '../lib/gsap'
import { bandPhoto, covers } from '../data/images'
import { intro, SPOTIFY_ARTIST_URL, tagline } from '../data/site'
import { marqueeTitles } from '../data/songs'
import type { ImageAsset } from '../data/types'
import { ExternalLink } from '../components/ExternalLink'
import { Img } from '../components/Img'
import { Magnetic } from '../components/Magnetic'
import { Marquee } from '../components/Marquee'

/**
 * Floating covers around the wordmark (desktop only), mirrored left and right.
 * From xl up the bottom right belongs to the band photo, so Traveller moves to
 * the top. `speed` drives parallax.
 */
const collage: { image: ImageAsset; className: string; speed: number }[] = [
  { image: covers.limasawa, className: 'left-[4vw] top-[17svh] w-[12.5vw] -rotate-6', speed: 0.9 },
  { image: covers.saranggola, className: 'left-[31vw] top-[10svh] w-[8.5vw] rotate-[5deg]', speed: 0.6 },
  { image: covers.kuwaderno, className: 'left-[11vw] bottom-[19svh] w-[11vw] rotate-[4deg]', speed: 0.5 },
  {
    image: covers.traveller,
    className: 'right-[12vw] bottom-[17svh] w-[10.5vw] -rotate-3 xl:bottom-auto xl:right-[27vw] xl:top-[9svh] xl:w-[8.5vw]',
    speed: 1.1,
  },
  { image: covers.nine, className: 'right-[4vw] top-[15svh] w-[11.5vw] rotate-[5deg]', speed: 0.75 },
]

const bandPhotoFrame = 'hero-band overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgb(35_17_17/0.55)]'

/**
 * During the intro the wordmark sits above the loader's dark overlay (see the
 * `html.intro` rules in index.css). When the lights are on, the overlay lifts,
 * the wordmark warms from cream to ink, and the rest of the hero rises in.
 */
export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const revealTl = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      if (document.documentElement.classList.contains('intro')) {
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
        // Cross-fade the glowing cream copy away (opacity is compositor-only; a color tween would repaint).
        tl.to('.hero-glow', { autoAlpha: 0, duration: 1, ease: 'power2.inOut' }, 0.1)
          .from(
            '.hero-photo',
            { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut', stagger: 0.06 },
            0.1,
          )
          .from('.hero-band', { scale: 1.12, duration: 1.4 }, 0)
          .from('.hero-fade', { autoAlpha: 0, y: 26, duration: 1, stagger: 0.07 }, 0.25)
        revealTl.current = tl
      }

      mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
        const scrub = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
          gsap.to(el, { yPercent: -Number(el.dataset.speed) * 45, ease: 'none', scrollTrigger: scrub })
        })
        gsap.to('.hero-wordmark', { yPercent: 22, ease: 'none', scrollTrigger: scrub })
        // The band photo drifts down with the wordmark, so the letters never slide over anyone.
        const wordmark = root.current?.querySelector<HTMLElement>('.hero-wordmark')
        gsap.to('.hero-band-desk', {
          y: () => (wordmark?.offsetHeight ?? 0) * 0.22,
          ease: 'none',
          scrollTrigger: { ...scrub, invalidateOnRefresh: true },
        })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  useEffect(() => {
    if (ready) revealTl.current?.play()
  }, [ready])

  return (
    <section
      ref={root}
      id="top"
      data-bg="#F4ECD8"
      aria-labelledby="hero-title"
      tabIndex={-1}
      className="relative overflow-x-clip text-ink"
    >
      <div className="relative flex min-h-svh flex-col">
        <div
          aria-hidden
          className="glow-orb breathe pointer-events-none absolute left-1/2 top-[40%] h-[78vmin] w-[78vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        />

        <div aria-hidden className="hero-collage pointer-events-none absolute inset-0 hidden lg:block">
          {collage.map(({ image, className, speed }) => (
            <div key={image.src} data-speed={speed} className={`absolute ${className}`}>
              <div className="hero-photo overflow-hidden rounded-xl shadow-[0_24px_60px_-20px_rgb(35_17_17/0.45)]">
                <Img image={image} sizes="13vw" deferMargin="0px" className="block aspect-square w-full object-cover" />
              </div>
            </div>
          ))}
        </div>

        <div className="hero-content relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-10 pt-28 text-center sm:px-8 lg:pt-24">
          <p className="hero-fade kicker mb-6 text-cocoa">An unofficial fan tribute · Since 2016</p>
          <h1
            id="hero-title"
            className="hero-wordmark display relative font-[560] leading-[0.8] text-[clamp(4.6rem,21vw,21rem)]"
          >
            Ben<span className="italic text-[#A85B32]">&amp;</span>Ben
            {/* The glowing copy shown over the intro's dark room; it fades to reveal the ink wordmark. */}
            <span aria-hidden className="hero-glow pointer-events-none absolute inset-0 text-light">
              Ben<span className="italic text-glow">&amp;</span>Ben
            </span>
          </h1>
          {/* Everything under the wordmark. On wide screens the band photo sits in this row, to the right of the
              copy and fully below the letters, so every member stays in view. */}
          <div className="relative flex flex-col items-center self-stretch">
            <p className="hero-fade display mt-4 text-[clamp(1.6rem,4.2vw,3.25rem)] italic text-cocoa">{tagline}</p>
            <p className="hero-fade mt-5 max-w-md text-balance text-base leading-relaxed text-cocoa sm:text-lg">
              {intro}
            </p>
            <div className="hero-fade mt-9 flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <ExternalLink
                  href={SPOTIFY_ARTIST_URL}
                  data-cursor="Listen"
                  className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-base font-semibold text-light transition-colors hover:bg-[#3a2418]"
                >
                  <span aria-hidden className="relative block h-2.5 w-2.5 rounded-full bg-glow">
                    <span className="glow-orb absolute -inset-3 rounded-full opacity-80" />
                  </span>
                  Listen on Spotify
                </ExternalLink>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="#members"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-4 text-base font-semibold transition-colors hover:border-ink hover:bg-ink/5"
                >
                  Meet the band
                </a>
              </Magnetic>
            </div>
            {/* Bottom-anchored, and never wider than the space beside the copy. */}
            <div className="hero-band-desk absolute bottom-[-1.25rem] right-[calc(4vw-2rem)] hidden w-[min(24vw,26rem,calc((100%-28rem)/2-2.5rem-(4vw-2rem)))] xl:block">
              <div className={`${bandPhotoFrame} rotate-2`}>
                <Img image={bandPhoto} sizes="min(24vw, 26rem)" className="block aspect-[25/18] w-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-ink/10 text-ink">
          <Marquee items={marqueeTitles} label="Ben&Ben song titles" />
        </div>
      </div>

      {/* Phones and tablets: a full-width photo just below the fold. Wide screens show the photo beside the hero
          text instead. Both images are lazy, so only the visible one loads. */}
      <div className="relative mx-auto w-full max-w-xl px-4 pb-4 pt-8 sm:px-8 xl:hidden">
        <div className={bandPhotoFrame}>
          <Img
            image={bandPhoto}
            sizes="(min-width: 576px) 544px, 92vw"
            className="block aspect-[25/18] w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
