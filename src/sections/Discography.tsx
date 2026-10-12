import { useRef, type CSSProperties } from 'react'
import { gsap, MQ, useGSAP } from '../lib/gsap'
import { setDynamicBackground } from '../lib/background'
import { scrollToTarget } from '../lib/lenis'
import { inBand } from '../lib/observe'
import { albums } from '../data/albums'
import { EraMotif } from '../components/EraMotif'
import { PageFlip } from '../components/PageFlip'
import { ExternalLink } from '../components/ExternalLink'
import { Img } from '../components/Img'
import { Magnetic } from '../components/Magnetic'
import { SourceList } from '../components/SourceList'

const PINNED = `${MQ.desktop} and ${MQ.motion}`
const STACKED = `not all and ${MQ.desktop} and ${MQ.motion}`

/**
 * Extra scroll (as panel width) during which the Kuwaderno era holds still in
 * the middle of the screen while its notebook pages turn.
 */
const FLIP_HOLD = '100vw'

/**
 * Keeps `rider` (an SVG group drawn around 0, 0, like the Limasawa lamp) on the
 * tip of `path` as the path draws in. It spins a little and its glow grows on
 * the way, then it settles exactly where the markup put it once the path is done.
 */
function rideAlong(path: SVGPathElement, rider: SVGGElement) {
  const glow = rider.querySelector('.draw-rider-glow')
  const body = rider.querySelector('.draw-rider-body')
  const home = { rider: rider.getAttribute('transform'), body: body?.getAttribute('transform') }
  let length = 0

  const update = (progress: number) => {
    length ||= path.getTotalLength()
    const { x, y } = path.getPointAtLength(progress * length)
    const rest = 1 - progress
    rider.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`)
    glow?.setAttribute('transform', `scale(${(1 - 0.45 * rest).toFixed(3)})`)
    body?.setAttribute('transform', `rotate(${(8 - 120 * rest).toFixed(1)})`)
  }
  const restore = () => {
    if (home.rider) rider.setAttribute('transform', home.rider)
    if (home.body) body?.setAttribute('transform', home.body)
    glow?.removeAttribute('transform')
  }
  return { update, restore }
}

const riseEase = gsap.parseEase('sine.out')

/**
 * Raises the EP's sun (the `.sunrise` group, drawn around its center) from below
 * the horizon. Its rays draw outward from the middle ray out, the dotted ring
 * turns into place, and the glow warms. At 1 everything matches the markup.
 */
function sunrise(sun: SVGGElement) {
  const home = sun.getAttribute('transform') ?? ''
  const [cx = 0, cy = 0] = home.match(/-?[\d.]+/g)?.map(Number) ?? []
  const glow = sun.querySelector('.sunrise-glow')
  const ring = sun.querySelector('.sunrise-ring')
  const rays = Array.from(sun.querySelectorAll<SVGLineElement>('.sunrise-ray'))
  const middle = (rays.length - 1) / 2

  const update = (progress: number) => {
    const rest = 1 - riseEase(gsap.utils.clamp(0, 1, progress / 0.8))
    sun.setAttribute('transform', `translate(${cx} ${(cy + 340 * rest).toFixed(1)})`)
    glow?.setAttribute('transform', `scale(${(1 - 0.35 * rest).toFixed(3)})`)
    glow?.setAttribute('opacity', (0.5 - 0.35 * rest).toFixed(3))
    ring?.setAttribute('transform', `rotate(${(-30 * rest).toFixed(1)})`)
    rays.forEach((ray, i) => {
      const from = 0.4 + Math.abs(i - middle) * 0.1
      const drawn = gsap.utils.clamp(0, 1, (progress - from) / 0.2)
      ray.style.strokeDashoffset = String(1 - drawn)
      ray.style.opacity = String(Math.min(1, drawn * 4))
    })
  }
  const restore = () => {
    update(1)
    rays.forEach((ray) => ray.removeAttribute('style'))
  }
  return { update, restore }
}

const flightEase = gsap.parseEase('power2.out')

/**
 * Flies Nine's light boxes (`.light-box` groups, each placed with
 * `translate(x y) rotate(r)` in the motif's 1000×600 space) in to those spots.
 * Each comes in from beyond the top or bottom of the screen (never across the
 * panel's sides, which are mid-screen while it slides in and would cut a box
 * off in a hard line), curving in spinning and growing, its glow flaring on the
 * way. They land one after another, in order around the cover. At 1 everything
 * matches the markup.
 */
function lightsFlyIn(boxes: SVGGElement[]) {
  // Roughly behind the cover, in the motif's coordinates.
  const center = { x: 290, y: 300 }
  const flights = boxes
    .map((box, i) => {
      const home = box.getAttribute('transform') ?? ''
      const [x = 0, y = 0, r = 0] = home.match(/-?[\d.]+/g)?.map(Number) ?? []
      const dx = x - center.x
      const dy = y - center.y
      const from = {
        x: gsap.utils.clamp(40, 960, x + (dx / (Math.hypot(dx, dy) || 1)) * 260),
        y: y < center.y ? -160 : 760,
      }
      // Bend each path sideways, alternating direction, so they swirl in.
      const vx = x - from.x
      const vy = y - from.y
      const length = Math.hypot(vx, vy) || 1
      const side = i % 2 ? 1 : -1
      // Kept between the sides too: a curve stays inside its three points.
      const bend = {
        x: gsap.utils.clamp(40, 960, (x + from.x) / 2 - (vy / length) * 150 * side),
        y: (y + from.y) / 2 + (vx / length) * 150 * side,
      }
      return { box, home, x, y, r, from, bend, angle: Math.atan2(dy, dx), glow: box.querySelector('circle'), at: 0 }
    })
    .sort((a, b) => a.angle - b.angle)
  flights.forEach((f, i) => (f.at = (i / Math.max(1, flights.length - 1)) * 0.5))

  const update = (progress: number) => {
    for (const f of flights) {
      const t = flightEase(gsap.utils.clamp(0, 1, (progress - f.at) / 0.5))
      const u = 1 - t
      const x = u * u * f.from.x + 2 * u * t * f.bend.x + t * t * f.x
      const y = u * u * f.from.y + 2 * u * t * f.bend.y + t * t * f.y
      f.box.setAttribute(
        'transform',
        `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(f.r - 300 * u).toFixed(1)}) scale(${(0.45 + 0.55 * t).toFixed(3)})`,
      )
      f.glow?.setAttribute('transform', `scale(${(1 + 0.7 * Math.sin(Math.PI * t)).toFixed(3)})`)
    }
  }
  const restore = () => {
    for (const f of flights) {
      f.box.setAttribute('transform', f.home)
      f.glow?.removeAttribute('transform')
    }
  }
  return { update, restore }
}

/**
 * Desktop with motion: the section pins and the eras slide past horizontally,
 * recoloring the page as each one reaches the center.
 * Everywhere else: the eras stack vertically, each on its own color.
 */
export function Discography() {
  const section = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>('.album-panel')
      const mm = gsap.matchMedia()

      mm.add({ pinned: PINNED, stacked: STACKED }, (ctx) => {
        const { pinned } = ctx.conditions as { pinned: boolean }
        let active = 0
        // Reported to the page's background resolver, which uses it while this
        // section is under the middle of the viewport.
        const apply = () => setDynamicBackground(albums[active].palette.bg)
        apply()
        let tween: gsap.core.Tween | undefined
        const restores: (() => void)[] = []
        const distance = () => (track.current?.scrollWidth ?? 0) - window.innerWidth

        // Which era is "current" comes straight from where the track actually is
        // on screen (the era under the 55% line), checked on every frame of the
        // scrub. Per-panel triggers drifted out of sync after fast jumps.
        let bounds: { left: number; right: number }[] = []
        const measure = () => {
          bounds = panels.map((p) => ({ left: p.offsetLeft, right: p.offsetLeft + p.offsetWidth }))
        }
        const syncCurrent = (force = false) => {
          if (!track.current || !bounds.length) return
          const line = -Number(gsap.getProperty(track.current, 'x')) + window.innerWidth * 0.55
          let i = bounds.findIndex((b) => line >= b.left && line < b.right)
          if (i < 0) i = line < bounds[0].left ? 0 : bounds.length - 1
          if (i === active && !force) return
          active = i
          panels.forEach((p, j) => p.classList.toggle('is-current', j === i))
          apply()
        }

        // Kuwaderno holds still while its notebook pages turn. Its panel is a screen
        // wider (--hold), and its stage slides right exactly as far as the track
        // moves left until that extra width runs out, so it stays put in the
        // middle of the screen. Over the hold: the title page shows first, then
        // the pages turn, then the album gets a moment before the track moves on.
        const holds = panels.flatMap((panel) => {
          const stage = panel.querySelector<HTMLElement>('.album-stage')
          const sheets = gsap.utils.toArray<HTMLElement>(panel.querySelectorAll('.page-sheet'))
          if (!pinned || !stage || !sheets.length) return []
          // Each page darkens as it lifts, shows its back past halfway, and fades
          // once it has fallen to the left.
          const turn = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
          sheets.forEach((sheet, i) => {
            const at = i * 0.22
            turn
              .fromTo(sheet, { rotateY: 0 }, { rotateY: -180, duration: 1, ease: 'power1.inOut' }, at)
              .fromTo(sheet.querySelector('.page-shade'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, at)
              .fromTo(sheet.querySelector('.page-shade-back'), { opacity: 1 }, { opacity: 0, duration: 0.5 }, at + 0.5)
              .fromTo(sheet, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3, immediateRender: false }, at + 0.7)
          })
          restores.push(() => gsap.set(stage, { clearProps: 'transform' }))
          return [{ panel, stage, turn, start: 0, length: 0 }]
        })
        const measureHolds = () => {
          for (const hold of holds) {
            // Where the track is when the stage reaches the middle (8vw from the left).
            hold.start = hold.panel.offsetLeft - window.innerWidth * 0.08
            hold.length = hold.panel.offsetWidth - hold.stage.offsetWidth
          }
        }
        const syncHolds = () => {
          if (!track.current || !holds.length) return
          const travelled = -Number(gsap.getProperty(track.current, 'x'))
          for (const { stage, turn, start, length } of holds) {
            const held = gsap.utils.clamp(0, length, travelled - start)
            gsap.set(stage, { x: held })
            // First fifth: the title page. Next three fifths: the pages turn. Last fifth: the album.
            turn.progress(gsap.utils.clamp(0, 1, (held / Math.max(1, length) - 0.2) / 0.6))
          }
        }

        if (pinned) {
          tween = gsap.to(track.current, {
            x: () => -distance(),
            ease: 'none',
            onUpdate: () => {
              syncCurrent()
              syncHolds()
            },
            scrollTrigger: {
              trigger: pin.current,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: () => {
                measure()
                measureHolds()
                syncCurrent(true)
                syncHolds()
              },
            },
          })
          measure()
          measureHolds()
          syncCurrent(true)
          syncHolds()

          panels.forEach((panel) => {
            const cover = panel.querySelector('.album-cover')
            if (cover) {
              gsap.fromTo(
                cover,
                { xPercent: 10, rotate: 3 },
                {
                  xPercent: -10,
                  rotate: -2,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: tween,
                    start: 'left right',
                    end: 'right left',
                    scrub: true,
                  },
                },
              )
            }
            panel.querySelectorAll<SVGPathElement>('.draw').forEach((path) => {
              // A light riding the line (the Limasawa lamp) travels up the road with
              // its tip and reaches its place as the road finishes drawing.
              const rider = path.ownerSVGElement?.querySelector<SVGGElement>('.draw-rider')
              const ride = rider ? rideAlong(path, rider) : null
              // Drawn by hand from one progress value: the path's length is 1 (pathLength),
              // and GSAP rounds px values, so tweening strokeDashoffset directly would
              // jump from 1 to 0 instead of drawing.
              const drawn = { progress: 0 }
              const render = () => {
                path.style.strokeDashoffset = String(1 - drawn.progress)
                ride?.update(drawn.progress)
              }
              render()
              gsap.to(drawn, {
                progress: 1,
                ease: 'none',
                onUpdate: render,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: 'left 85%',
                  // Done just before the era settles in the middle of the screen.
                  end: 'center 58%',
                  scrub: true,
                  // A refresh briefly rewinds the tween to measure, without redrawing on the way back.
                  onRefresh: render,
                },
              })
              restores.push(() => {
                path.style.removeProperty('stroke-dashoffset')
                ride?.restore()
              })
            })

            // Traveller: the galaxy's layers slide by their depth (nearer stars
            // further) and the spiral turns while the era passes.
            const passing = () => ({
              trigger: panel,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            })
            panel.querySelectorAll<HTMLElement | SVGSVGElement>('[data-depth]').forEach((layer) => {
              const depth = Number(layer.dataset.depth)
              gsap.fromTo(layer, { xPercent: depth }, { xPercent: -depth, ease: 'none', scrollTrigger: passing() })
            })
            const spiral = panel.querySelector('.galaxy-spiral')
            if (spiral) {
              gsap.fromTo(spiral, { rotation: -50 }, { rotation: 50, ease: 'none', scrollTrigger: passing() })
            }

            // Nine: the light boxes fly in to their places as the last era arrives.
            // It rests a little right of center (the track ends there), so they
            // are all home just before it stops.
            const boxes = gsap.utils.toArray<SVGGElement>(panel.querySelectorAll('.light-box'))
            if (boxes.length) {
              const fly = lightsFlyIn(boxes)
              const flown = { progress: 0 }
              const render = () => fly.update(flown.progress)
              render()
              restores.push(fly.restore)
              gsap.to(flown, {
                progress: 1,
                ease: 'none',
                onUpdate: render,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: 'left 95%',
                  end: 'left 22%',
                  scrub: true,
                  onRefresh: render,
                },
              })
            }
          })

          // The EP's sun rises while the section scrolls up into place and the first
          // era slides toward the middle. It starts once the horizon (the panel's
          // bottom edge) is close to the screen and is fully up just before the EP settles.
          const sun = section.current?.querySelector<SVGGElement>('.sunrise')
          if (sun) {
            const rise = sunrise(sun)
            const risen = { progress: 0 }
            const render = () => rise.update(risen.progress)
            render()
            restores.push(rise.restore)
            gsap.to(risen, {
              progress: 1,
              ease: 'none',
              onUpdate: render,
              scrollTrigger: {
                trigger: pin.current,
                start: 'top 40%',
                end: () => (tween?.scrollTrigger?.start ?? 0) + window.innerWidth * 0.3,
                scrub: 0.8,
                invalidateOnRefresh: true,
                onRefresh: render,
              },
            })
          }
        }

        if (!pinned) {
          // Stacked: each era (and the intro) recolors the page as it crosses the middle.
          const blocks = [track.current?.querySelector('header'), ...panels].filter(Boolean) as Element[]
          return inBand(blocks, (el, inside) => {
            if (!inside) return
            active = Number((el as HTMLElement).dataset.index ?? 0)
            apply()
          })
        }

        track.current?.classList.add('is-pinned')

        // Keyboard users: tabbing into a panel scrolls the page to it.
        const onFocus = (e: FocusEvent) => {
          if (!tween?.scrollTrigger || !pin.current) return
          const panel = (e.target as Element).closest<HTMLElement>('.album-panel')
          if (!panel) return
          pin.current.scrollLeft = 0
          const st = tween.scrollTrigger
          // A holding era (Kuwaderno) is shown with its pages already turned.
          const hold = holds.find((h) => h.panel === panel)
          const offset = hold ? hold.start + hold.length * 0.9 : panel.offsetLeft
          const progress = gsap.utils.clamp(0, 1, offset / Math.max(1, distance()))
          scrollToTarget(st.start + (st.end - st.start) * progress, { immediate: true })
        }
        const el = section.current
        el?.addEventListener('focusin', onFocus)
        return () => {
          el?.removeEventListener('focusin', onFocus)
          track.current?.classList.remove('is-pinned')
          panels.forEach((p) => p.classList.remove('is-current'))
          restores.forEach((restore) => restore())
        }
      })

      return () => mm.revert()
    },
    { scope: section },
  )

  return (
    <section ref={section} id="music" data-bg-dynamic aria-labelledby="music-title" tabIndex={-1} className="relative">
      <div ref={pin} className="relative pin:h-svh pin:overflow-x-clip">
        <div ref={track} className="relative flex flex-col pin:h-full pin:w-max pin:flex-row">
          <header className="relative flex shrink-0 flex-col justify-center px-4 pb-12 pt-28 text-ink sm:px-8 pin:w-[42vw] pin:pl-[6vw] pin:pr-[4vw] lg:pt-36">
            <p className="kicker text-cocoa">Discography</p>
            <h2 id="music-title" className="display mt-4 text-[clamp(2.75rem,7vw,7rem)] leading-[0.92]">
              Five records, nine years
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-cocoa">
              Each era recolors the page in its own cover’s palette.
              <span className="hidden pin:inline"> Keep scrolling to move through them.</span>
            </p>
            <span aria-hidden className="mt-10 hidden items-center gap-3 text-sm text-cocoa pin:flex">
              <span className="block h-px w-16 bg-current" /> Scroll
            </span>
          </header>

          {albums.map((album, index) => (
            <article
              key={album.id}
              data-index={index}
              aria-labelledby={`album-${album.id}`}
              className="album-panel cv-auto relative shrink-0 overflow-hidden [--cis:1100px] bg-[var(--panel-bg)] pin:h-full pin:w-[calc(84vw+var(--hold))] pin:overflow-visible pin:bg-transparent"
              style={
                {
                  '--panel-bg': album.palette.bg,
                  '--hold': album.motif === 'journal' ? FLIP_HOLD : '0px',
                  color: album.palette.fg,
                } as CSSProperties
              }
            >
              <div className="album-stage relative flex h-full items-center px-4 py-20 sm:px-8 pin:w-[84vw] pin:px-[5vw] pin:py-0 lg:py-28">
                <EraMotif motif={album.motif} color={album.palette.accent} />
                <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-[4.5vw]">
                  <div className="album-cover relative mx-auto w-full max-w-[24rem] lg:max-w-[min(34vw,58svh)]">
                    <div
                      aria-hidden
                      className="absolute -inset-[22%] rounded-full opacity-60"
                      style={{ background: `radial-gradient(circle, ${album.palette.accent} 0%, transparent 65%)` }}
                    />
                    <Img
                      image={album.cover}
                      sizes="(min-width: 1024px) 34vw, 24rem"
                      deferMargin="400px"
                      placeholderLabel="Cover TBD"
                      placeholderColor={album.palette.accent}
                      className="relative block aspect-square w-full rounded-2xl object-cover shadow-[0_40px_90px_-30px_rgb(0_0_0/0.6)]"
                    />
                  </div>

                  <div className="album-body">
                    <p className="album-in kicker opacity-80">
                      {album.kind} · {album.year}
                    </p>
                    <h3
                      id={`album-${album.id}`}
                      className="album-in display mt-4 text-[clamp(2.25rem,4.6vw,5rem)] leading-[0.92]"
                    >
                      {album.title}
                    </h3>
                    <p className="album-in mt-4 text-sm opacity-80">
                      Released {album.released} · {album.label}
                    </p>
                    <p className="album-in mt-6 max-w-xl text-lg leading-relaxed">{album.description}</p>

                    <div className="album-in mt-7">
                      <p className="kicker opacity-80">Key tracks</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {album.keyTracks.map((t) => (
                          <li key={t} className="rounded-full border border-current/25 px-3 py-1 text-sm">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {album.availability && (
                      <p className="album-in mt-5 text-sm italic opacity-85">{album.availability}</p>
                    )}

                    <ul className="album-in mt-7 flex flex-wrap gap-3">
                      {album.links.map((l) => (
                        <li key={l.url}>
                          <Magnetic strength={0.25}>
                            <ExternalLink
                              href={l.url}
                              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-85"
                              style={{ background: album.palette.fg, color: album.palette.bg }}
                            >
                              {l.label}
                              <span aria-hidden>↗</span>
                            </ExternalLink>
                          </Magnetic>
                        </li>
                      ))}
                    </ul>
                    <SourceList sources={album.sources} className="album-in mt-6" />
                  </div>
                </div>
                {album.motif === 'journal' && <PageFlip album={album} />}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
