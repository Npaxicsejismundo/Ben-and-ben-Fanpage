import { causes, fandom, helpline } from '../data/site'
import { ExternalLink } from '../components/ExternalLink'
import { Magnetic } from '../components/Magnetic'
import { RevealText } from '../components/RevealText'
import { SourceList } from '../components/SourceList'

/** The fandom, and the causes the band has put its light behind. */
export function Liwanag() {
  return (
    <section
      id="liwanag"
      data-bg="#F3C66B"
      aria-labelledby="liwanag-title"
      tabIndex={-1}
      className="cv-auto relative overflow-x-clip px-4 py-28 text-ink [--cis:2200px] sm:px-8 lg:py-40"
    >
      <div
        aria-hidden
        className="glow-orb breathe pointer-events-none absolute left-1/2 top-24 h-[90vmin] w-[90vmin] -translate-x-1/2 rounded-full"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="kicker">
            For the fans
          </p>
          <RevealText id="liwanag-title" className="display mt-4 text-[clamp(3rem,10vw,9rem)] leading-[0.88]">
            {fandom.title}
          </RevealText>
          <p data-reveal className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cocoa">
            {fandom.body}
          </p>
          <SourceList sources={fandom.sources} className="mt-3 text-cocoa" />
          <div data-reveal className="mt-8">
            <Magnetic>
              <ExternalLink
                href={fandom.community.url}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-4 font-semibold text-light transition-colors hover:bg-[#3a2418]"
              >
                {fandom.community.label}
                <span aria-hidden>↗</span>
              </ExternalLink>
            </Magnetic>
          </div>
        </div>

        <h3 data-reveal className="kicker mt-24 text-center lg:mt-32">
          Where the band puts its light
        </h3>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {causes.map((c) => (
            <li key={c.id} data-reveal className="flex flex-col rounded-[1.5rem] bg-light/70 p-6 sm:p-8">
              <p className="display text-3xl">{c.title}</p>
              <p className="mt-3 leading-relaxed text-cocoa">{c.body}</p>
              <SourceList sources={c.sources} className="mt-auto pt-5 text-cocoa" />
            </li>
          ))}
        </ul>

        <aside
          data-reveal
          aria-label="Mental health support"
          className="mx-auto mt-10 flex max-w-3xl flex-col items-start gap-4 rounded-[1.5rem] border border-ink/15 bg-paper/80 p-6 sm:flex-row sm:items-center sm:p-8"
        >
          <span aria-hidden className="glow-orb h-10 w-10 shrink-0 rounded-full" />
          <p className="leading-relaxed">
            {helpline.text}{' '}
            <ExternalLink href={helpline.link.url} className="font-semibold underline">
              {helpline.link.label}
            </ExternalLink>
            .
          </p>
        </aside>

        <p
          data-reveal
          lang="fil"
          className="display mt-28 text-center text-[clamp(2.5rem,7vw,6rem)] italic leading-none"
        >
          Salamat sa liwanag.
        </p>
        <p data-reveal className="mt-4 text-center text-cocoa">
          Thank you for the light.
        </p>
      </div>
    </section>
  )
}
