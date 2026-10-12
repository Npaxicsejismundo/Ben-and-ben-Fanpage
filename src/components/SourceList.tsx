import type { Source } from '../data/types'
import { ExternalLink } from './ExternalLink'

/** "Source: Publication, Date · Publication, Date" with real links. */
export function SourceList({ sources, className = '' }: { sources: Source[]; className?: string }) {
  if (!sources.length) return null
  return (
    <p className={`text-xs leading-relaxed opacity-75 ${className}`}>
      <span>{sources.length > 1 ? 'Sources: ' : 'Source: '}</span>
      {sources.map((s, i) => (
        <span key={s.url + i}>
          {i > 0 && <span aria-hidden> · </span>}
          <ExternalLink href={s.url} className="underline decoration-current/40 hover:decoration-current">
            {s.label}
          </ExternalLink>
        </span>
      ))}
    </p>
  )
}
