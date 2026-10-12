import type { CSSProperties } from 'react'
import { members } from '../data/members'
import type { Member } from '../data/types'
import { INK } from '../lib/ink'
import { memberPath } from '../lib/routes'
import { ExternalLink } from '../components/ExternalLink'
import { Img } from '../components/Img'
import { Magnetic } from '../components/Magnetic'
import { RevealText } from '../components/RevealText'
import { SourceList } from '../components/SourceList'

const PAPER = '#F7F1E3'

/**
 * One member's profile: a band of their color with their name, the portrait
 * beside the essentials (what they play, their role, when they joined, their
 * color), then fun facts and links to the previous and next member.
 */
export function MemberPage({ member: m }: { member: Member }) {
  const index = members.findIndex((x) => x.id === m.id)
  const prev = members[(index + members.length - 1) % members.length]
  const next = members[(index + 1) % members.length]
  const ink = INK[m.color.ink]
  const number = String(index + 1).padStart(2, '0')

  const profile: { label: string; value: string; swatch?: boolean }[] = [
    { label: 'Plays', value: m.plays },
    { label: 'Role in the band', value: m.bandRole },
    { label: 'With the band', value: m.since },
    { label: 'Signature color', value: m.color.name, swatch: true },
  ]

  return (
    <article aria-labelledby="member-name">
      <header
        id="top"
        tabIndex={-1}
        data-bg={m.color.hex}
        className="relative overflow-hidden px-4 pb-36 pt-28 outline-none sm:px-8 lg:pb-52 lg:pt-36"
        style={{ background: m.color.hex, color: ink }}
      >
        <div
          aria-hidden
          className="glow-orb breathe pointer-events-none absolute -right-[10%] -top-[30%] h-[80vmin] w-[80vmin] rounded-full opacity-70"
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="kicker">
            Ben&amp;Ben · Member {number} of 09 · {m.color.name}
          </p>
          <h1
            id="member-name"
            className="display mt-4 text-[clamp(4.5rem,19vw,17rem)] leading-[0.8]"
            style={{ viewTransitionName: `member-name-${m.id}` } as CSSProperties}
          >
            {m.name}
          </h1>
          <p className="mt-6 text-lg font-medium sm:text-xl">{m.fullName}</p>
          <p className="display mt-2 max-w-xl text-2xl italic opacity-90 sm:text-3xl">{m.personality}</p>
        </div>
      </header>

      <section
        data-bg={PAPER}
        aria-label={`About ${m.name}`}
        className="relative flow-root px-4 text-ink sm:px-8"
        style={{ background: PAPER }}
      >
        <div className="mx-auto -mt-28 grid max-w-6xl gap-10 lg:-mt-40 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <figure className="mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="overflow-hidden rounded-[1.75rem] shadow-[0_40px_90px_-40px_rgb(35_17_17/0.65)]"
              style={{ viewTransitionName: `member-photo-${m.id}` } as CSSProperties}
            >
              <Img
                image={m.photo}
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 480px) 28rem, 92vw"
                placeholderLabel="Photo TBD"
                placeholderColor={m.color.hex}
                className="block aspect-[4/5] w-full object-cover"
              />
            </div>
            {m.photo && (
              <figcaption className="mt-3 text-xs text-cocoa">
                <ExternalLink
                  href={m.photo.creditUrl}
                  className="underline decoration-current/40 hover:decoration-current"
                >
                  {m.photo.credit}
                </ExternalLink>
              </figcaption>
            )}
          </figure>

          <div className="lg:pt-48">
            <dl>
              {profile.map((row) => (
                <div key={row.label} className="border-t border-ink/15 py-5">
                  <dt className="kicker text-cocoa">{row.label}</dt>
                  <dd className="mt-2">
                    <span className="display flex items-center gap-3 text-[clamp(1.6rem,3.2vw,2.6rem)] leading-tight">
                      {row.swatch && (
                        <span
                          aria-hidden
                          className="inline-block h-7 w-7 shrink-0 rounded-full ring-1 ring-ink/20"
                          style={{ background: m.color.hex }}
                        />
                      )}
                      {row.value}
                    </span>
                    {row.swatch && (
                      <span className="mt-2 block max-w-md text-sm leading-relaxed text-cocoa">
                        {m.color.origin}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <SourceList sources={m.roleSources} className="border-t border-ink/15 pt-4 text-cocoa" />
          </div>
        </div>
      </section>

      <section
        data-bg={PAPER}
        aria-labelledby="facts-title"
        className="px-4 pb-24 pt-24 text-ink sm:px-8 lg:pt-36"
        style={{ background: PAPER }}
      >
        <div className="mx-auto max-w-6xl">
          <RevealText id="facts-title" className="display text-[clamp(3rem,9vw,8rem)] leading-[0.9]">
            Fun facts
          </RevealText>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {m.facts.map((f, i) => (
              <li
                key={i}
                data-reveal
                className="flex flex-col rounded-[1.5rem] border border-ink/10 bg-light/70 p-6 sm:p-8"
              >
                <span
                  aria-hidden
                  className="display grid h-12 w-12 place-items-center rounded-full text-xl"
                  style={{ background: m.color.hex, color: ink }}
                >
                  {i + 1}
                </span>
                <p className="mt-6 text-lg leading-relaxed">{f.text}</p>
                <SourceList sources={f.sources} className="mt-auto pt-6 text-cocoa" />
              </li>
            ))}
          </ol>

          {m.quote && (
            <figure
              data-reveal
              className="mt-10 rounded-[1.5rem] p-8 sm:p-12"
              style={{ background: `${m.color.hex}40` }}
            >
              <blockquote className="display text-[clamp(1.75rem,4vw,3rem)] leading-tight">“{m.quote.text}”</blockquote>
              <figcaption className="mt-4">
                <SourceList sources={[m.quote.source]} className="text-cocoa" />
              </figcaption>
            </figure>
          )}

          {m.note && (
            <div data-reveal className="mt-4 rounded-[1.5rem] border border-ink/10 bg-light p-8 sm:p-12">
              <p className="display flex items-center gap-3 text-3xl">
                <span aria-hidden className="glow-orb inline-block h-8 w-8 rounded-full" />
                {m.note.title}
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cocoa">{m.note.body}</p>
              <SourceList sources={m.note.sources} className="mt-4 text-cocoa" />
            </div>
          )}

          <nav
            aria-label="More members"
            className="mt-20 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-stretch"
          >
            <NeighborLink member={prev} direction="prev" />
            <Magnetic strength={0.2} className="self-center justify-self-center">
              <a
                href="/#members"
                className="kicker inline-block rounded-full border border-ink/25 px-5 py-3 transition-colors hover:bg-ink hover:text-light"
              >
                All nine
              </a>
            </Magnetic>
            <NeighborLink member={next} direction="next" />
          </nav>
        </div>
      </section>
    </article>
  )
}

function NeighborLink({ member, direction }: { member: Member; direction: 'prev' | 'next' }) {
  const isNext = direction === 'next'
  return (
    <a
      href={memberPath(member.id)}
      data-cursor={member.name}
      className={`group flex min-h-28 flex-col justify-between rounded-[1.5rem] p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-8 ${
        isNext ? 'items-end text-right' : 'items-start'
      }`}
      style={{ background: member.color.hex, color: INK[member.color.ink] }}
    >
      <span className="kicker">{isNext ? 'Next' : 'Previous'}</span>
      <span className="display mt-4 flex items-center gap-3 text-[clamp(2rem,5vw,3.75rem)] leading-none">
        {!isNext && (
          <span aria-hidden className="transition-transform duration-500 group-hover:-translate-x-1">
            ←
          </span>
        )}
        {member.name}
        {isNext && (
          <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        )}
      </span>
    </a>
  )
}
