import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ScrollTrigger } from './lib/gsap'
import { registerBackgroundLayer, startBackgroundResolver } from './lib/background'
import { lockScroll, scrollToTarget, startSmoothScroll } from './lib/lenis'
import { onceVisible } from './lib/observe'
import { matchRoute, routeMeta } from './lib/routes'
import { Cursor } from './components/Cursor'
import { Loader } from './components/Loader'
import { Nav } from './components/Nav'
import { Footer } from './sections/Footer'
import { Home } from './pages/Home'
import { MemberPage } from './pages/MemberPage'

const INTRO_KEY = 'liwanag:intro-seen'

function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, '1')
  } catch {
    // Storage unavailable (private mode, blocked): the intro just plays again next time.
  }
}

/** Shared page chrome (background, grain, cursor, nav, footer) around the routed page. */
export default function App({ path }: { path: string }) {
  const route = matchRoute(path)
  const isHome = route.kind === 'home'

  // Server and first client render agree (loader present on the home page); the
  // boot script in index.html has already decided via `html.intro` whether it plays.
  const [introDone, setIntroDone] = useState(!isHome)
  const [heroReady, setHeroReady] = useState(false)
  const bgLayer = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    registerBackgroundLayer(bgLayer.current)
    if (!document.documentElement.classList.contains('intro')) setIntroDone(true)
  }, [])

  useEffect(() => {
    document.title = routeMeta(matchRoute(path)).title
  }, [path])

  // Smooth scrolling isn't needed for first paint; start it once the browser is idle.
  useEffect(() => {
    let stop = () => {}
    const start = () => (stop = startSmoothScroll())
    const idle = window.requestIdleCallback?.(start, { timeout: 1500 }) ?? window.setTimeout(start, 300)
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      stop()
    }
  }, [])

  useEffect(() => {
    lockScroll(!introDone)
  }, [introDone])

  // Arriving on the home page with a hash (e.g. "All nine" from a profile): land
  // on that section once the page has laid out.
  useEffect(() => {
    if (!isHome || !window.location.hash) return
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
    if (!target) return
    const raf = requestAnimationFrame(() => scrollToTarget(target, { immediate: true }))
    return () => cancelAnimationFrame(raf)
  }, [isHome])

  // Section colors: whichever section sits under the middle of the viewport
  // (the discography reports its current era's color itself).
  useEffect(() => startBackgroundResolver(), [])

  // One-shot fade-ups, done with CSS transitions (see [data-reveal] in index.css).
  useEffect(() => {
    if (!document.documentElement.classList.contains('motion')) return
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    return onceVisible(items, (batch) => {
      batch.forEach((el, i) => {
        ;(el as HTMLElement).style.setProperty('--reveal-delay', `${Math.min(i, 8) * 0.07}s`)
        el.classList.add('is-in')
      })
    })
  }, [])

  // Content that changes height after load (fonts, embeds, details, and
  // below-the-fold sections rendering in for the first time) shifts the
  // scroll-linked animations below it. Re-measure on the next frame, so the
  // positions are right before anyone scrolls into them.
  useEffect(() => {
    let raf = 0
    let lastHeight = -1
    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    }
    const ro = new ResizeObserver(([entry]) => {
      const h = Math.round(entry.contentRect.height)
      const first = lastHeight < 0
      if (h === lastHeight) return
      lastHeight = h
      if (!first) schedule()
    })
    ro.observe(document.body)
    // Fires when a content-visibility: auto section starts (or stops) rendering.
    const onCv = (e: Event) => {
      if ((e as Event & { skipped?: boolean }).skipped === false) schedule()
    }
    document.addEventListener('contentvisibilityautostatechange', onCv, true)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
      document.removeEventListener('contentvisibilityautostatechange', onCv, true)
    }
  }, [])

  // In-page links: smooth scroll, then move focus to the target for keyboard and screen reader users.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey) return
      const id = link.getAttribute('href')!.slice(1)
      const target = id ? document.getElementById(id) : null
      if (!target) return
      e.preventDefault()
      scrollToTarget(id === 'top' || id === 'main' ? 0 : target)
      target.focus({ preventScroll: true })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div ref={bgLayer} className="bg-layer" aria-hidden />
      <div className="grain" aria-hidden />
      <Cursor />
      {isHome && !introDone && (
        <Loader
          onReveal={() => {
            document.documentElement.classList.remove('intro-hide')
            setHeroReady(true)
          }}
          onDone={() => {
            markIntroSeen()
            document.documentElement.classList.remove('intro', 'intro-hide')
            setHeroReady(true)
            setIntroDone(true)
          }}
        />
      )}
      <Nav onHome={isHome} />
      <main id="main" tabIndex={-1} className="outline-none">
        {route.kind === 'member' ? <MemberPage member={route.member} /> : <Home heroReady={heroReady} />}
      </main>
      <Footer />
    </>
  )
}
