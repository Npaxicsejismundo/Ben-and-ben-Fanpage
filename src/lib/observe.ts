/**
 * IntersectionObserver helpers. One-shot reveals and "which section is in the
 * middle" checks run here instead of ScrollTrigger: they need no scroll
 * listeners and no layout refreshes, which keeps the main thread quiet.
 */

/** Calls `cb` once per batch of elements as they first come into view. */
export function onceVisible(els: Element[], cb: (visible: Element[]) => void, rootMargin = '0px 0px -10% 0px') {
  if (!els.length) return () => {}
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).map((e) => e.target)
      if (!visible.length) return
      visible.forEach((el) => io.unobserve(el))
      cb(visible)
    },
    { rootMargin },
  )
  els.forEach((el) => io.observe(el))
  return () => io.disconnect()
}

/**
 * Tracks elements crossing a horizontal band of the viewport.
 * `band` is the top and bottom inset, e.g. 49.5 for a thin line at the center.
 */
export function inBand(els: Element[], cb: (el: Element, inside: boolean) => void, band = 49.5) {
  if (!els.length) return () => {}
  const io = new IntersectionObserver((entries) => entries.forEach((e) => cb(e.target, e.isIntersecting)), {
    rootMargin: `-${band}% 0px -${band}% 0px`,
  })
  els.forEach((el) => io.observe(el))
  return () => io.disconnect()
}

/** True when the inline boot script enabled motion (JS on, no reduced-motion preference). */
export function motionEnabled() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('motion')
}
