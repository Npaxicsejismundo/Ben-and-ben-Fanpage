import { useRef, type ReactNode } from 'react'
import { gsap, MQ, useGSAP } from '../lib/gsap'

/**
 * Wraps a link or button so it leans toward the pointer. Desktop pointers with
 * motion allowed only; everywhere else it is a plain wrapper.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          xTo((e.clientX - (r.left + r.width / 2)) * strength)
          yTo((e.clientY - (r.top + r.height / 2)) * strength)
        }
        const leave = () => {
          xTo(0)
          yTo(0)
        }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        return () => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
        }
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  )
}
