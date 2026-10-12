import { allImages } from '../data/images'
import { disclaimer, socials } from '../data/site'
import { ExternalLink } from '../components/ExternalLink'
import { Mark } from '../components/Mark'

export function Footer() {
  return (
    <footer className="cv-auto relative bg-ember px-4 pb-10 pt-24 text-dawn [--cis:600px] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
          <div>
            <Mark size="lg" />
            <p className="mt-6 max-w-sm leading-relaxed text-dawn/75">
              A fan-made tribute. Every fact on this page links to its source.
            </p>
          </div>
          <nav aria-label="Official Ben&Ben channels">
            <p className="kicker text-dawn/60">Official channels</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.url}>
                  <ExternalLink
                    href={s.url}
                    className="inline-block rounded-full border border-dawn/25 px-4 py-2 text-sm transition-colors hover:border-dawn hover:bg-dawn hover:text-ember"
                  >
                    {s.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <details className="mt-16 border-t border-dawn/15 pt-6">
          <summary className="kicker cursor-pointer text-dawn/70 hover:text-dawn">Image credits</summary>
          <ul className="mt-5 grid gap-x-8 gap-y-2 text-sm text-dawn/75 sm:grid-cols-2">
            {allImages.map((img) => (
              <li key={img.src}>
                {img.name}:{' '}
                <ExternalLink href={img.creditUrl} className="underline decoration-dawn/30 hover:decoration-dawn">
                  {img.credit}
                </ExternalLink>
              </li>
            ))}
            <li>Ben&amp;Ben EP cover: TBD (not available on streaming services).</li>
          </ul>
        </details>

        <div className="mt-10 flex flex-col gap-4 border-t border-dawn/15 pt-6 text-sm text-dawn/70 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-dawn">{disclaimer}</p>
          <a href="#top" className="self-start rounded-full px-1 hover:text-dawn sm:self-auto">
            Back to top <span aria-hidden>↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
