import { singles } from '../data/singles'
import { SPOTIFY_ARTIST_URL } from '../data/site'
import { ExternalLink } from '../components/ExternalLink'
import { Img } from '../components/Img'
import { RevealText } from '../components/RevealText'
import { SourceList } from '../components/SourceList'

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})
const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`))

/** The standalone singles from the official site's grid, newest first. */
export function Singles() {
  return (
    <section
      id="singles"
      data-bg="#F4ECD8"
      aria-labelledby="singles-title"
      tabIndex={-1}
      className="cv-auto relative px-4 py-28 text-ink [--cis:2200px] sm:px-8 lg:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p data-reveal className="kicker text-cocoa">
              Singles
            </p>
            <RevealText id="singles-title" className="display mt-4 text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92]">
              Between the albums
            </RevealText>
          </div>
          <p data-reveal className="max-w-md text-lg leading-relaxed text-cocoa">
            The standalone releases featured on the band’s official site, newest first. Press a cover to listen on
            Spotify.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:mt-20 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
          {singles.map((s) => {
            const href = s.spotify ?? SPOTIFY_ARTIST_URL
            return (
              <li key={s.id} data-reveal className="group flex flex-col">
                <ExternalLink
                  href={href}
                  aria-label={`${s.title}${s.spotify ? ', listen on Spotify' : ', open Ben&Ben on Spotify'} (opens in a new tab)`}
                  data-cursor="Listen"
                  className="block rounded-xl"
                >
                  <span className="relative block overflow-hidden rounded-xl shadow-[0_18px_40px_-22px_rgb(35_17_17/0.6)] transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:-rotate-1 group-hover:shadow-[0_34px_60px_-26px_rgb(35_17_17/0.7)]">
                    <Img
                      image={s.cover}
                      deferMargin="300px 0px"
                      sizes="(min-width: 1024px) 16rem, (min-width: 640px) 30vw, 46vw"
                      className="block aspect-square w-full object-cover"
                    />
                  </span>
                </ExternalLink>
                <h3 lang={s.lang} className="display mt-4 text-xl leading-tight sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-cocoa">
                  {s.released ? (
                    <time dateTime={s.released}>Single · {formatDate(s.released)}</time>
                  ) : (
                    <span>Single · date TBD</span>
                  )}
                </p>
                {s.note && <p className="mt-1 text-sm leading-relaxed text-cocoa">{s.note}</p>}
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                  {s.spotify ? (
                    <ExternalLink href={s.spotify} className="underline decoration-ink/30 hover:decoration-ink">
                      Spotify
                    </ExternalLink>
                  ) : (
                    <span className="font-normal italic text-cocoa">Streaming link TBD</span>
                  )}
                  {s.apple && (
                    <ExternalLink href={s.apple} className="underline decoration-ink/30 hover:decoration-ink">
                      Apple Music
                    </ExternalLink>
                  )}
                </p>
              </li>
            )
          })}
        </ul>

        <SourceList
          sources={[
            { label: 'benandbenmusic.com', url: 'https://www.benandbenmusic.com/' },
            { label: 'Release dates: Spotify', url: SPOTIFY_ARTIST_URL },
          ]}
          className="mt-16 text-cocoa"
        />
      </div>
    </section>
  )
}
