import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap, MQ, useGSAP } from '../lib/gsap'
import { songs } from '../data/songs'
import { ExternalLink } from '../components/ExternalLink'
import { Img } from '../components/Img'
import { RevealText } from '../components/RevealText'
import { SourceList } from '../components/SourceList'
import { SpotifyEmbed } from '../components/SpotifyEmbed'

/**
 * A list of songs. Hovering a row (desktop) floats its cover beside the
 * pointer; pressing it loads the official Spotify player inline.
 */
export function TopSongs() {
  const root = useRef<HTMLElement>(null)
  const reveal = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<string | null>(null)
  const [hovered, setHovered] = useState(0)
  // Covers for the hover reveal load on first hover, not with the page.
  const [armed, setArmed] = useState(false)
  // The floating cover is position: fixed, so it lives in <body>, outside this
  // section's content-visibility containment. Portals only exist after mount.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const { contextSafe } = useGSAP(
    () => {
      if (!reveal.current) return
      const mm = gsap.matchMedia()
      mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
        const el = reveal.current!
        gsap.set(el, { autoAlpha: 0, scale: 0.6 })
        const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
        const list = root.current!.querySelector<HTMLElement>('.song-list')!
        const GAP = 28
        // The cover rides just right of the pointer, vertically centered on it, and
        // flips to the left before it would reach the Play buttons.
        const move = (e: PointerEvent) => {
          const size = el.offsetWidth
          const limit = list.getBoundingClientRect().right - 150
          let x = e.clientX + GAP
          if (x + size > limit) x = e.clientX - GAP - size
          xTo(x)
          yTo(e.clientY - size / 2)
        }
        list.addEventListener('pointermove', move)
        return () => list.removeEventListener('pointermove', move)
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [mounted] },
  )

  const showReveal = contextSafe((show: boolean) => {
    if (!window.matchMedia(`${MQ.fine} and ${MQ.motion}`).matches) return
    if (show) setArmed(true)
    gsap.to(reveal.current, {
      autoAlpha: show ? 1 : 0,
      scale: show ? 1 : 0.6,
      duration: 0.5,
      ease: 'expo.out',
      overwrite: 'auto',
    })
  })

  return (
    <section
      ref={root}
      id="songs"
      data-bg="#131B37"
      aria-labelledby="songs-title"
      tabIndex={-1}
      className="cv-auto relative px-4 py-28 text-moon [--cis:1800px] sm:px-8 lg:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <p data-reveal className="kicker text-[#E8C66A]">
          Top songs
        </p>
        <RevealText id="songs-title" className="display mt-4 text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92]">
          Seven songs to start with
        </RevealText>
        <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-moon/80">
          Press a song to load the official Spotify player. Nothing from Spotify loads until you do.
        </p>

        <ol className="song-list mt-14 border-b border-moon/15 lg:mt-20" onPointerLeave={() => showReveal(false)}>
          {songs.map((song, i) => {
            const isOpen = open === song.id
            const panelId = `song-${song.id}-panel`
            return (
              <li key={song.id} data-reveal className="border-t border-moon/15">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  data-cursor-hide
                  onClick={() => setOpen(isOpen ? null : song.id)}
                  onPointerEnter={() => {
                    setHovered(i)
                    showReveal(true)
                  }}
                  onPointerLeave={() => showReveal(false)}
                  className="song-row flex w-full items-center gap-4 py-6 text-left sm:gap-8 sm:py-8"
                >
                  <span aria-hidden className="kicker w-7 shrink-0 text-moon/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Img
                    image={song.cover}
                    sizes="56px"
                    deferMargin="300px 0px"
                    className="h-12 w-12 shrink-0 rounded-md object-cover sm:hidden"
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      lang={song.lang}
                      className="song-row-title display block text-[clamp(1.6rem,5vw,4.5rem)] leading-[0.95]"
                    >
                      {song.title}
                    </span>
                    <span className="mt-2 block text-sm text-moon/70">
                      {song.year} · {song.release}
                    </span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-moon/30 px-3 py-2 text-sm sm:px-5">
                    <span aria-hidden className="text-xs">
                      {isOpen ? '■' : '▶'}
                    </span>
                    <span className="hidden sm:inline">{isOpen ? 'Close' : 'Play'}</span>
                    <span className="sr-only sm:hidden">{isOpen ? 'Close' : 'Play'}</span>
                  </span>
                </button>
                <div id={panelId} hidden={!isOpen} className="pb-8 sm:pl-[3.75rem]">
                  {isOpen && (
                    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
                      <SpotifyEmbed trackId={song.spotifyTrackId} title={song.title} />
                      <div className="space-y-4 text-sm text-moon/85">
                        {song.note && (
                          <div>
                            <p className="leading-relaxed">{song.note.text}</p>
                            <SourceList sources={song.note.sources} className="mt-2" />
                          </div>
                        )}
                        {song.youtube && (
                          <ExternalLink
                            href={`https://www.youtube.com/watch?v=${song.youtube.id}`}
                            className="inline-flex items-center gap-2 rounded-full bg-moon px-4 py-2 font-semibold text-night transition-opacity hover:opacity-85"
                          >
                            Watch on YouTube: {song.youtube.label}
                            <span aria-hidden>↗</span>
                          </ExternalLink>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {mounted &&
        createPortal(
          <div
            ref={reveal}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-30 hidden w-48 [@media(hover:hover)_and_(pointer:fine)]:block"
            style={{ visibility: 'hidden' }}
          >
            <div className="relative aspect-square w-full -rotate-3 overflow-hidden rounded-xl shadow-[0_30px_70px_-20px_rgb(0_0_0/0.7)]">
              {armed &&
                songs.map((song, i) => (
                  <img
                    key={song.id}
                    src={song.cover.src}
                    srcSet={song.cover.srcSet}
                    sizes="192px"
                    alt=""
                    width={song.cover.width}
                    height={song.cover.height}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
                    style={{ opacity: hovered === i ? 1 : 0 }}
                  />
                ))}
            </div>
          </div>,
          document.body,
        )}
    </section>
  )
}
