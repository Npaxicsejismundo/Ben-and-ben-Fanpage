import type { Cause, StoryChapter } from './types'
import { SOURCES as S } from './sources'
import { bandPhoto, covers, tinatangiStill } from './images'

export const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/artist/4DAcJXcjX0zlQAZAPAx4Zb'

export const tagline = 'Nine years of light.'
export const intro =
  'An unofficial, fan-made tribute to Ben&Ben, the folk-pop band from the Philippines: their story, the people, the records and the stages.'

export const nav = [
  { href: '#story', label: 'Story' },
  { href: '#members', label: 'Members' },
  { href: '#music', label: 'Music' },
  { href: '#live', label: 'Live' },
  { href: '#liwanag', label: 'Liwanag' },
]

export const socials = [
  { label: 'Official site', url: 'https://www.benandbenmusic.com/' },
  { label: 'Spotify', url: SPOTIFY_ARTIST_URL },
  { label: 'YouTube', url: 'https://www.youtube.com/@benandbenmusic' },
  { label: 'Instagram', url: 'https://www.instagram.com/benandbenmusic' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@benandbenmusic' },
  { label: 'Facebook', url: 'https://www.facebook.com/benandbenmusic' },
]

export const story: StoryChapter[] = [
  {
    id: '2016',
    kicker: '2016',
    title: 'Two brothers, one shared name',
    body: 'Fresh out of De La Salle, twins Paolo and Miguel Benjamin Guico start performing as The Benjamins, after the second name they share. Their PhilPop 2016 entry “Tinatangi” places third and wins Best Music Video. By December they are Ben&Ben, with a seven-song EP.',
    image: tinatangiStill,
    imageCaption: '“Tinatangi,” PhilPop 2016',
    sources: [S.wikipedia, S.manilaBulletin2022, S.bandwagonTinatangi2016],
  },
  {
    id: '2017',
    kicker: 'May 10, 2017',
    title: 'Nine',
    body: 'The duo officially becomes a nine-piece band. Their first song together, “Maybe the Night,” is arranged in drummer Jam Villanueva’s attic.',
    image: bandPhoto,
    imageCaption: 'The nine',
    sources: [S.bandwagonAnniversary2021, S.bandwagonNine2026],
  },
  {
    id: 'today',
    kicker: 'Today',
    title: 'One chapter closes, the light stays on',
    body: 'In September 2026 the band releases Nine, an anthology for nine years together. On October 2 they sell out the Smart Araneta Coliseum for Saranggola: The Concert, the nine-piece’s final show and Jam’s farewell. The concert returns in Cebu in April 2027.',
    image: covers.nine,
    imageCaption: 'Nine, 2026',
    sources: [S.bandwagonNine2026, S.businessworldSaranggola2026, S.pepSaranggola2026],
  },
]

export const fandom = {
  title: 'Liwanag means light',
  body: 'Ben&Ben’s fans are the Liwanag. The band gave them the name on September 4, 2020, after their earlier name, “LIGHTs,” turned out to belong to the fans of K-pop act Highlight.',
  sources: [S.bandwagonLiwanag2020],
  community: { label: 'Join the official Liwanag community', url: 'https://www.benandbenmusic.com/liwanag' },
}

export const causes: Cause[] = [
  {
    id: 'mental-health',
    title: 'Mental health',
    body: 'The “Courage” video (2023) carries a content warning and ends by urging viewers to ask for help, shared with hotline numbers. In 2022 the band took a public mental-health break over Holy Week.',
    sources: [S.gmaCourage2023, S.interaksyonBreak2022],
  },
  {
    id: 'environment',
    title: 'The environment',
    body: 'The first Filipino band named a National Geographic #PlanetOrPlastic ambassador for Asia, and ambassadors for the NCCA and the Pasig River Rehabilitation Commission.',
    sources: [S.gmaEnvironment2020],
  },
  {
    id: 'relief',
    title: 'Community relief',
    body: 'In March 2020 they streamed “Puhon,” a benefit concert raising funds for protective gear, test kits and relief for daily-wage workers.',
    sources: [S.businessworldPuhon2020, S.abscbnPuhon2020],
  },
  {
    id: 'pride',
    title: 'Love, seen',
    body: 'Released for Pride Month 2022, the “Paninindigan Kita” video tells the real love story of bandmates Pat and Agnes, a story that has inspired the LGBTQ+ community.',
    sources: [S.bandwagonPaninindigan2022, S.abscbnPride2024],
  },
]

export const helpline = {
  text: 'If you’re going through something heavy, you don’t have to carry it alone. In the Philippines, the NCMH Crisis Hotline is free and open 24/7 at 1553.',
  link: { label: 'Find a helpline anywhere', url: 'https://findahelpline.com/' },
}

export const disclaimer = 'Unofficial fan site. Not affiliated with Ben&Ben or Sony Music Philippines.'
