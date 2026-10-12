import { nav, SPOTIFY_ARTIST_URL } from '../data/site'
import { ExternalLink } from './ExternalLink'
import { Magnetic } from './Magnetic'
import { Mark } from './Mark'

/**
 * Floating pill: readable over every section color without blend tricks.
 * On a member page the section links point back to the home page.
 */
export function Nav({ onHome }: { onHome: boolean }) {
  const base = onHome ? '' : '/'
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[90] flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full bg-ink/70 py-2 pl-5 pr-2 text-light shadow-[0_8px_30px_rgb(26_18_16/0.18)] backdrop-blur-md"
      >
        <a
          href={onHome ? '#top' : '/'}
          className="rounded-full"
          aria-label={onHome ? 'Liwanag, back to top' : 'Liwanag, home'}
        >
          <Mark />
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={`${base}${item.href}`}
                className="rounded-full px-3 py-2 text-sm text-light/80 transition-colors hover:bg-light/10 hover:text-light"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <Magnetic strength={0.25}>
          <ExternalLink
            href={SPOTIFY_ARTIST_URL}
            className="inline-flex items-center gap-2 rounded-full bg-glow px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-light"
          >
            <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-ink" />
            Listen
          </ExternalLink>
        </Magnetic>
      </nav>
    </header>
  )
}
