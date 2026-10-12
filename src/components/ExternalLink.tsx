import type { AnchorHTMLAttributes, ReactNode } from 'react'

/** Opens in a new tab and says so to screen readers. */
export function ExternalLink({
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
