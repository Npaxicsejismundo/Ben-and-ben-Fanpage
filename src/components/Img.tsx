import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { ImageAsset } from '../data/types'

/** 1×1 transparent GIF, shown until a deferred image comes near the viewport. */
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

interface ImgProps {
  image: ImageAsset | null
  className?: string
  sizes?: string
  priority?: boolean
  /**
   * Hold the real source until the image is within this margin of the viewport
   * (an IntersectionObserver rootMargin). Native lazy-loading starts far earlier
   * on slow connections and competes with the hero for bandwidth.
   */
  deferMargin?: string
  /** Shown (and announced) when there is no image yet. */
  placeholderLabel?: string
  placeholderColor?: string
  style?: CSSProperties
}

/** An image from data/images.ts, or a tasteful placeholder when it is TBD. */
export function Img({
  image,
  className = '',
  sizes,
  priority = false,
  deferMargin,
  placeholderLabel = 'Image TBD',
  placeholderColor = '#e6d6b4',
  style,
}: ImgProps) {
  const ref = useRef<HTMLImageElement>(null)
  const [near, setNear] = useState(!deferMargin)

  useEffect(() => {
    const el = ref.current
    if (near || !el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setNear(true)
        io.disconnect()
      },
      { rootMargin: deferMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [near, deferMargin])

  if (!image) {
    return <Placeholder label={placeholderLabel} color={placeholderColor} className={className} style={style} />
  }
  return (
    <img
      ref={ref}
      src={near ? image.src : BLANK}
      srcSet={near ? image.srcSet : undefined}
      sizes={near && image.srcSet ? sizes : undefined}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      style={style}
    />
  )
}

export function Placeholder({
  label,
  color,
  className = '',
  style,
}: {
  label: string
  color: string
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative grid place-items-center overflow-hidden ${className}`}
      style={{ background: color, ...style }}
    >
      <div aria-hidden className="glow-orb absolute h-2/3 w-2/3 rounded-full opacity-70" />
      <span
        aria-hidden
        className="kicker relative rounded-full border border-current/30 px-3 py-1 text-[0.65rem] opacity-80"
      >
        {label}
      </span>
    </div>
  )
}
