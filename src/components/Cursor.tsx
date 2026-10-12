import { useRef } from 'react'
import { gsap, MQ, useGSAP } from '../lib/gsap'

/**
 * A small point of light with a trailing ring. It grows over anything
 * clickable, and shows a label for elements with `data-cursor="Label"`.
 * Only on fine pointers with motion allowed; the native cursor stays otherwise.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
      const el = root.current!
      document.documentElement.classList.add('has-custom-cursor')
      gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 })

      const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3.out' })
      const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3.out' })
      const rx = gsap.quickTo(ring.current, 'x', { duration: 0.55, ease: 'power3.out' })
      const ry = gsap.quickTo(ring.current, 'y', { duration: 0.55, ease: 'power3.out' })

      let shown = false
      let last = { x: 0, y: 0 }
      const move = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return
        last = { x: e.clientX, y: e.clientY }
        if (!shown) {
          shown = true
          gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY })
          gsap.to(el, { autoAlpha: 1, duration: 0.3 })
        }
        dx(e.clientX)
        dy(e.clientY)
        rx(e.clientX)
        ry(e.clientY)
      }
      const update = (node: Element | null) => {
        const target = node?.closest<HTMLElement>('a, button, [data-cursor], summary, label')
        const text = target?.dataset.cursor ?? ''
        // [data-cursor-hide]: the element brings its own visual (e.g. the song cover
        // reveal), so the ring steps aside and only the small dot remains.
        const quiet = target?.hasAttribute('data-cursor-hide') ?? false
        el.classList.toggle('is-quiet', quiet)
        el.classList.toggle('is-active', Boolean(target) && !quiet)
        el.classList.toggle('has-label', Boolean(text) && !quiet)
        if (label.current) label.current.textContent = text
      }
      const over = (e: PointerEvent) => update(e.target as Element | null)
      // Scrolling (and the pinned discography sliding sideways) moves content under
      // a still mouse without any pointer event, which left stale labels behind.
      let frame = 0
      const onScroll = () => {
        if (!shown || frame) return
        frame = requestAnimationFrame(() => {
          frame = 0
          update(document.elementFromPoint(last.x, last.y))
        })
      }
      const hide = () => {
        shown = false
        gsap.to(el, { autoAlpha: 0, duration: 0.3 })
      }

      window.addEventListener('pointermove', move, { passive: true })
      window.addEventListener('pointerover', over, { passive: true })
      window.addEventListener('scroll', onScroll, { passive: true })
      document.documentElement.addEventListener('pointerleave', hide)
      return () => {
        cancelAnimationFrame(frame)
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerover', over)
        window.removeEventListener('scroll', onScroll)
        document.documentElement.removeEventListener('pointerleave', hide)
        document.documentElement.classList.remove('has-custom-cursor')
      }
    })
    return () => mm.revert()
  })

  return (
    <div
      ref={root}
      aria-hidden
      className="cursor pointer-events-none fixed inset-0 z-[150] opacity-0 mix-blend-difference"
      style={{ visibility: 'hidden' }}
    >
      <div ref={ring} className="absolute left-0 top-0 h-9 w-9">
        <div className="cursor-ring-inner grid h-full w-full place-items-center rounded-full border border-light/80">
          <span ref={label} className="cursor-label kicker text-[0.32rem] tracking-[0.14em] text-ink" />
        </div>
      </div>
      <div ref={dot} className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-light" />
    </div>
  )
}
