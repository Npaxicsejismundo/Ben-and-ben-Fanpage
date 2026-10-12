import type { Album } from '../data/types'
import { EraMotif } from './EraMotif'

/** How many notebook pages turn before the album shows. */
const SHEETS = 3

/**
 * Notebook pages laid over the Kuwaderno era on the pinned desktop layout: the
 * same ruled paper as the era's background, with a title page on top. The era
 * holds still in the middle of the screen while Discography.tsx turns them over
 * from the hole-punched left edge, one after another, and the last one uncovers
 * the album. Shown only while the discography is pinned (index.css), so the
 * content is never covered otherwise.
 */
export function PageFlip({ album }: { album: Album }) {
  const { bg: paper, fg: ink, accent } = album.palette
  const back = `color-mix(in srgb, ${paper} 88%, ${ink})`

  return (
    <div aria-hidden className="page-flip pointer-events-none absolute inset-0 z-20">
      {Array.from({ length: SHEETS }, (_, i) => (
        <div key={i} className="page-sheet absolute inset-0" style={{ zIndex: SHEETS - i }}>
          <div className="page-face absolute inset-0 overflow-hidden" style={{ background: paper }}>
            <EraMotif motif="journal" color={accent} />
            {i === 0 && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center pl-[8%] text-center"
                style={{ color: ink }}
              >
                <p className="kicker">Pebble House · Volume 1</p>
                <p className="display mt-5 text-[clamp(3.5rem,9vw,9.5rem)] italic leading-[0.9]">Kuwaderno</p>
                <p className="mt-6 text-lg">{album.year} · an open journal</p>
                <p className="mt-16 flex items-center gap-3 text-sm">
                  <span className="block h-px w-12 bg-current" /> Keep scrolling to turn the page
                  <span className="block h-px w-12 bg-current" />
                </p>
              </div>
            )}
            {/* Darkens as the page lifts away from the light. */}
            <div className="page-shade absolute inset-0 bg-linear-to-r from-[rgb(46_34_25/0.04)] to-[rgb(46_34_25/0.32)] opacity-0" />
          </div>
          <div className="page-face page-back absolute inset-0 overflow-hidden" style={{ background: back }}>
            <EraMotif motif="journal" color={accent} />
            <div className="page-shade-back absolute inset-0 bg-linear-to-l from-[rgb(46_34_25/0.3)] to-transparent" />
          </div>
        </div>
      ))}
    </div>
  )
}
