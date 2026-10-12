import type { Single, Source } from './types'
import { singleCovers as c } from './images'

/**
 * The singles shown in the official site's Singles grid, newest first.
 * Titles and release dates come from each release's Spotify page; links were
 * resolved from the official site's own smart links (except Comets, whose
 * official link points at an unrelated release, so it was looked up on
 * MusicBrainz instead).
 */
const officialSite: Source = { label: 'benandbenmusic.com, Singles', url: 'https://www.benandbenmusic.com/' }
const spotifySource = (id: string): Source => ({ label: 'Spotify', url: `https://open.spotify.com/album/${id}` })

function single(
  id: string,
  title: string,
  lang: 'en' | 'fil',
  released: string | null,
  spotifyId: string | null,
  appleId: string | null,
  cover: Single['cover'],
  extra: Partial<Pick<Single, 'note'>> & { sources?: Source[] } = {},
): Single {
  return {
    id,
    title,
    lang,
    released,
    cover,
    spotify: spotifyId ? `https://open.spotify.com/album/${spotifyId}` : undefined,
    apple: appleId ? `https://music.apple.com/ph/album/${appleId}` : undefined,
    note: extra.note,
    sources: extra.sources ?? (spotifyId ? [spotifySource(spotifyId), officialSite] : [officialSite]),
  }
}

export const singles: Single[] = [
  single('saranggola', 'Saranggola', 'fil', '2025-04-11', '36gNzsCUsMd3CoD9zGyMUp', '1806280713', c.saranggola, {
    note: 'Now also on Nine (2026).',
  }),
  single(
    'tomorrow-with-you',
    'Tomorrow With You (Live)',
    'en',
    '2025-02-14',
    '6uwgew8m2gj69hR8H6duYS',
    '1794990392',
    c.tomorrowWithYou,
    { note: 'Recorded live at The Traveller Across Dimensions concert.' },
  ),
  single('triumph', 'Triumph', 'en', '2024-10-18', '6jvr0yp0tK9JHnoXLqMDbG', '1772905405', c.triumph),
  single('comets', 'Comets', 'en', '2024-05-10', '7mFRwy9ld2leAOlpWDNENj', '1743417199', c.comets, {
    note: 'Co-produced with Indonesian producer Petra Sihombing.',
    sources: [
      spotifySource('7mFRwy9ld2leAOlpWDNENj'),
      {
        label: 'Interaksyon, May 10, 2024',
        url: 'https://interaksyon.philstar.com/hobbies-interests/2024/05/10/275358/benben-drops-comets-first-single-of-2024/',
      },
    ],
  }),
  single('comets-petra', 'Comets (with Petra Sihombing)', 'en', null, null, null, c.cometsPetra, {
    sources: [
      officialSite,
      { label: 'Wikipedia, Ben&Ben discography', url: 'https://en.wikipedia.org/wiki/Ben%26Ben_discography' },
    ],
  }),
  single('courage', 'Courage', 'en', '2023-12-01', '5msu0wXEGKp9oE0CjQc0Xm', '1717599523', c.courage, {
    note: 'Full band version.',
  }),
  single('autumn', 'Autumn', 'en', '2023-11-24', '74OY1gHn8wJr9uz96ME33Z', '1716459672', c.autumn),
  single(
    'courage-acoustic',
    'Courage (Acoustic Ver.)',
    'en',
    '2023-10-09',
    '3KNTVXEXg2Y99cbsQcb34u',
    '1710360198',
    c.courageAcoustic,
  ),
  single(
    'could-be-something',
    'Could Be Something',
    'en',
    '2023-06-30',
    '333wl5bz94xWRNTPBBfKcI',
    '1692927990',
    c.couldBeSomething,
  ),
  single('dear', 'Dear', 'en', '2022-11-25', '0yPoiOzESOHe9aeY1q9QfP', '1654903896', c.dear),
  single(
    'the-ones-we-once-loved',
    'The Ones We Once Loved',
    'en',
    '2022-08-26',
    '0276LtRwBrOo2uoRlTOiPX',
    '1638667983',
    c.theOnesWeOnceLoved,
  ),
  single(
    'langyang-pag-ibig',
    'Langyang Pag-Ibig',
    'fil',
    '2022-06-22',
    '7fbhKyegOq5B2lT8W3Li72',
    '1629631899',
    c.langyangPagIbig,
  ),
]
