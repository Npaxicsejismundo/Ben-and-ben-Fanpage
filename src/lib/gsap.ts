import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
gsap.defaults({ ease: 'expo.out', duration: 1 })

export { gsap, ScrollTrigger, SplitText, useGSAP }

/** Media queries shared by every gsap.matchMedia() call. */
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1024px)',
  fine: '(hover: hover) and (pointer: fine)',
} as const

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(MQ.reduce).matches
}

export function hasFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia(MQ.fine).matches
}
