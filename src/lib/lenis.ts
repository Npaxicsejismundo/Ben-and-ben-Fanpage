import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

let lenis: Lenis | null = null

/**
 * Smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis share
 * one animation frame. Skipped entirely when the visitor prefers reduced motion.
 * Returns a cleanup function.
 */
export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => {}

  lenis = new Lenis({ autoRaf: false, lerp: 0.1, wheelMultiplier: 1 })
  // Started late (on idle), so respect a lock that is already in place (intro, open dialog).
  if (document.documentElement.classList.contains('scroll-locked')) lenis.stop()
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function getLenis() {
  return lenis
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.classList.toggle('scroll-locked', locked)
}

/**
 * Scroll to an element (or y position), smoothly when Lenis is running.
 * Sections below the fold use content-visibility, so their real heights only
 * settle as they render on the way down; element targets get one corrective
 * pass after landing.
 */
export function scrollToTarget(target: HTMLElement | number, opts: { immediate?: boolean } = {}) {
  const settle = () => {
    if (typeof target === 'number') return
    const off = target.getBoundingClientRect().top
    if (Math.abs(off) > 4) scrollToTarget(window.scrollY + off, { immediate: true })
  }
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, immediate: opts.immediate, force: true, onComplete: settle })
    return
  }
  const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY
  const smooth = !opts.immediate && !prefersReducedMotion()
  window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' })
  if (smooth) window.addEventListener('scrollend', settle, { once: true })
  else requestAnimationFrame(settle)
}
