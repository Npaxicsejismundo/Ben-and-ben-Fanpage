import type { CSSProperties } from 'react'
import { members } from '../data/members'
import { INK } from '../lib/ink'
import { memberPath } from '../lib/routes'
import { Img } from '../components/Img'
import { RevealText } from '../components/RevealText'

/** Nine cards, each opening that member's profile page. */
export function Members() {
  return (
    <section
      id="members"
      data-bg="#F7F1E3"
      aria-labelledby="members-title"
      tabIndex={-1}
      className="relative px-4 py-28 text-ink sm:px-8 lg:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p data-reveal className="kicker text-cocoa">
              Get to know them
            </p>
            <RevealText id="members-title" className="display mt-4 text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92]">
              Nine people, nine colors
            </RevealText>
          </div>
          <p data-reveal className="max-w-md text-lg leading-relaxed text-cocoa">
            Each member gets a color drawn from the band’s artwork. The colors are this fan site’s pick, not theirs.
            Open a profile for what they play, their role, and facts from their own interviews.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-3 lg:gap-5">
          {members.map((m) => (
            <li key={m.id} data-reveal>
              <a
                href={memberPath(m.id)}
                aria-label={`${m.fullName}, ${m.role}. Open profile.`}
                data-cursor="Profile"
                className="member-card group flex h-full flex-col rounded-[1.5rem] border border-ink/10 bg-light/60 p-2.5 sm:p-3"
                style={{ '--c': m.color.hex, '--ink': INK[m.color.ink] } as CSSProperties}
              >
                <span
                  className="relative block overflow-hidden rounded-[1.1rem]"
                  style={{ viewTransitionName: `member-photo-${m.id}` } as CSSProperties}
                >
                  <Img
                    image={m.photo}
                    deferMargin="300px 0px"
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 46vw"
                    placeholderLabel="Photo TBD"
                    placeholderColor={m.color.hex}
                    className="block aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                  {m.tenure && (
                    <span className="kicker absolute right-2 top-2 rounded-full bg-ink/70 px-2.5 py-1 text-[0.6rem] tracking-[0.12em] text-light backdrop-blur-sm">
                      {m.tenure}
                    </span>
                  )}
                </span>
                <span className="member-card-text block px-2 pb-2 pt-4 sm:px-3">
                  <span className="display block text-[clamp(1.6rem,4vw,3rem)] leading-none">{m.name}</span>
                  <span className="mt-2 block text-sm font-medium opacity-80 sm:text-base">{m.role}</span>
                  <span className="mt-4 flex items-center justify-between gap-2 border-t border-current/15 pt-3 text-xs sm:text-sm">
                    <span className="flex min-w-0 items-center gap-2">
                      <span
                        aria-hidden
                        className="block h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-current/30"
                        style={{ background: m.color.hex }}
                      />
                      <span className="truncate">{m.color.name}</span>
                    </span>
                    <span
                      aria-hidden
                      className="text-base leading-none transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
