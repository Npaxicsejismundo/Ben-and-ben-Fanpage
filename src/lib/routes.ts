import { members } from '../data/members'
import type { Member } from '../data/types'

/**
 * The site is a handful of prerendered pages: the home page and one profile
 * page per member. Navigation between them is plain links (full page loads),
 * so every URL works on any static host.
 */
export type Route = { kind: 'home' } | { kind: 'member'; member: Member }

export const memberPath = (id: string) => `/members/${id}`

export function matchRoute(path: string): Route {
  const clean = path
    .replace(/\/index\.html$/, '')
    .replace(/\.html$/, '')
    .replace(/\/+$/, '')
  const match = clean.match(/^\/members\/([a-z-]+)$/)
  const member = match ? members.find((m) => m.id === match[1]) : undefined
  return member ? { kind: 'member', member } : { kind: 'home' }
}

const SITE = 'Liwanag · An unofficial Ben&Ben fan tribute'

/** Per-page <title> and description, used by the prerender step and on the client. */
export function routeMeta(route: Route) {
  if (route.kind === 'home') {
    return {
      title: SITE,
      description:
        'An unofficial fan tribute to Ben&Ben, the Filipino folk-pop band: their story, the members, the records and the stages. Not affiliated with Ben&Ben or Sony Music Philippines.',
    }
  }
  const m = route.member
  return {
    title: `${m.fullName} · ${m.role} · Ben&Ben member profile · Liwanag`,
    description: `${m.fullName} of Ben&Ben plays ${m.plays.toLowerCase()}. ${m.personality} An unofficial fan tribute.`,
  }
}

/** Every page the prerender step writes. */
export function allPaths() {
  return ['/', ...members.map((m) => memberPath(m.id))]
}
