/**
 * Ambient motion (the drifting marquee, breathing glows) waits for the visitor's
 * first interaction. The page settles visually right after it loads, and the
 * motion arrives the moment someone engages with it.
 */
const EVENTS = ['pointermove', 'pointerdown', 'wheel', 'touchstart', 'keydown', 'scroll'] as const

let awake = false
const callbacks = new Set<() => void>()

function wake() {
  if (awake) return
  awake = true
  document.documentElement.classList.add('awake')
  EVENTS.forEach((e) => window.removeEventListener(e, wake))
  callbacks.forEach((cb) => cb())
  callbacks.clear()
}

/** Runs `cb` on the first interaction (or now, if that already happened). Returns an unsubscribe. */
export function onAwake(cb: () => void) {
  if (typeof window === 'undefined') return () => {}
  if (awake) {
    cb()
    return () => {}
  }
  if (callbacks.size === 0) EVENTS.forEach((e) => window.addEventListener(e, wake, { passive: true, once: true }))
  callbacks.add(cb)
  return () => callbacks.delete(cb)
}
