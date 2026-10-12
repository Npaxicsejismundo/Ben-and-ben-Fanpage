import { gsap, prefersReducedMotion } from './gsap'

/**
 * One fixed layer behind the page carries the background color, and a single
 * resolver decides it: on every scroll frame, whichever section sits under the
 * middle of the viewport wins. Sections declare `data-bg="#hex"`; the
 * discography declares `data-bg-dynamic` and reports its current era's color
 * via `setDynamicBackground`. One source of truth, so the color can't get stuck
 * on a section you've already left.
 */
let layer: HTMLElement | null = null
let current = ''
let dynamicColor: string | null = null
let raf = 0

export function registerBackgroundLayer(el: HTMLElement | null) {
  layer = el
}

function setBackground(color: string) {
  if (!layer || color === current) return
  current = color
  gsap.to(layer, {
    backgroundColor: color,
    duration: prefersReducedMotion() ? 0.2 : 0.9,
    ease: 'power2.out',
    overwrite: 'auto',
  })
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color)
}

function resolve() {
  raf = 0
  const mid = window.innerHeight / 2
  for (const el of document.querySelectorAll<HTMLElement>('[data-bg], [data-bg-dynamic]')) {
    const r = el.getBoundingClientRect()
    if (r.top > mid || r.bottom <= mid) continue
    const color = el.hasAttribute('data-bg-dynamic') ? dynamicColor : el.dataset.bg
    if (color) setBackground(color)
    return
  }
}

export function requestBackgroundUpdate() {
  if (!raf) raf = requestAnimationFrame(resolve)
}

/** The discography's current era color (used while it is under the middle line). */
export function setDynamicBackground(color: string) {
  dynamicColor = color
  requestBackgroundUpdate()
}

/** Starts the resolver. Returns a cleanup function. */
export function startBackgroundResolver() {
  window.addEventListener('scroll', requestBackgroundUpdate, { passive: true })
  window.addEventListener('resize', requestBackgroundUpdate)
  requestBackgroundUpdate()
  return () => {
    window.removeEventListener('scroll', requestBackgroundUpdate)
    window.removeEventListener('resize', requestBackgroundUpdate)
    cancelAnimationFrame(raf)
    raf = 0
  }
}
