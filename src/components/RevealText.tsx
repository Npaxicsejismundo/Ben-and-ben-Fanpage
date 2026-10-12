import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap, SplitText } from '../lib/gsap'
import { motionEnabled, onceVisible } from '../lib/observe'

interface RevealTextProps {
  as?: ElementType
  children: ReactNode
  className?: string
  id?: string
  lang?: string
}

/**
 * Split-text headline: lines rise out of a mask the first time it scrolls into
 * view. The split happens only at that moment (fonts are loaded by then) and is
 * reverted when the animation ends, so the heading goes back to plain text.
 * With reduced motion, the text is simply there.
 */
export function RevealText({ as: Tag = 'h2', children, className, id, lang }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !motionEnabled()) return
    let split: SplitText | null = null
    let tween: gsap.core.Tween | null = null
    const stop = onceVisible(
      [el],
      () => {
        split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
        el.classList.add('is-split')
        tween = gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.15,
          ease: 'expo.out',
          stagger: 0.09,
          onComplete: () => {
            split?.revert()
            split = null
          },
        })
      },
      '0px 0px -8% 0px',
    )
    return () => {
      stop()
      tween?.kill()
      split?.revert()
      el.classList.remove('is-split')
    }
  }, [])

  return (
    <Tag ref={ref} id={id} lang={lang} data-split className={className}>
      {children}
    </Tag>
  )
}
