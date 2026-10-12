import type { Counter, Highlight } from './types'
import { SOURCES as S } from './sources'

/**
 * Wording follows what reputable sources support:
 * - "3 billion" and "first Filipino act" are press-reported; no Spotify announcement was found.
 * - The Awit total is given as "15+". The "18" figure appears only on a promoter page (TBD).
 */
export const counters: Counter[] = [
  {
    id: 'streams',
    value: 3,
    suffix: 'B+',
    label: 'Spotify streams',
    detail:
      'Reported as the first Filipino act to pass three billion streams on Spotify, after 1 billion in 2021 and 2 billion in 2023.',
    sources: [S.newHue2026, S.abscbn1B2021, S.abscbn2B2023],
  },
  {
    id: 'awit',
    value: 15,
    suffix: '+',
    label: 'Awit Awards',
    detail: 'Sixteen through 2024 by Wikipedia’s count, with more since. The exact total is TBD.',
    sources: [S.wikipediaAwards, S.gmaAwit2025, S.gmaAwit2026],
  },
  {
    id: 'aoty',
    value: 2,
    label: 'Awit Albums of the Year',
    detail:
      'Pebble House, Vol. 1: Kuwaderno at the 35th Awit Awards (2022), and The Traveller Across Dimensions at the 38th (2025).',
    sources: [S.philstarAwit2022, S.gmaAwit2025],
  },
  {
    id: 'years',
    value: 9,
    label: 'Years as a nine-piece',
    detail: 'From May 10, 2017 to Saranggola: The Concert on October 2, 2026.',
    sources: [S.bandwagonAnniversary2021, S.businessworldSaranggola2026],
  },
]

export const highlights: Highlight[] = [
  {
    id: 'nme',
    year: '2022',
    title: 'Best Band from Asia, BandLab NME Awards',
    detail: 'Also nominated for Best Band in the World and Best Album by an Asian Artist.',
    sources: [S.nmeAwards2022],
  },
  {
    id: 'aaa',
    year: '2023',
    title: 'Best Choice Award, Asia Artist Awards',
    detail: 'Received at the Philippine Arena in Bulacan.',
    sources: [S.philstarAaa2023],
  },
  {
    id: 'ema',
    year: '2020',
    title: 'Nominee, Best Southeast Asian Act, MTV EMAs',
    detail: 'Nominated at the 2020 MTV Europe Music Awards.',
    sources: [S.abscbnEma2020],
  },
  {
    id: 'spotify-ph',
    year: '2021–2023',
    title: 'Spotify Philippines’ most-streamed OPM act',
    detail:
      'Reported as the most-streamed Filipino artist on Spotify by December 2021, and the No. 1 streamed OPM artist in the Philippines for 2023.',
    sources: [S.filipinoTimes2021, S.gmaSpotify2023],
  },
  {
    id: 'times-square',
    year: '2024',
    title: 'On Spotify’s Times Square billboard',
    detail: 'Featured in New York for The Traveller Across Dimensions.',
    sources: [S.gmaTimesSquare2024],
  },
  {
    id: 'awit-2026',
    year: '2026',
    title: 'Best Performance by a Group, Awit Awards',
    detail: 'For “Saranggola.”',
    sources: [S.gmaAwit2026],
  },
]
