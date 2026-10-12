import type { Song } from './types'
import { SOURCES as S } from './sources'
import { covers } from './images'

/**
 * Embeds use the official Spotify player (loaded only when a fan presses play).
 * YouTube links point only at videos on the band's own channel (@benandbenmusic).
 * The original music videos for Kathang Isip, Maybe the Night and Leaves sit on
 * a channel whose owner couldn't be verified, so those link to official
 * alternatives instead.
 */
export const songs: Song[] = [
  {
    id: 'kathang-isip',
    title: 'Kathang Isip',
    lang: 'fil',
    year: 2017,
    release: 'Single (first heard on the 2016 EP)',
    spotifyTrackId: '3WUEs51GpcvlgU7lehLgLh',
    youtube: { id: 'B7YZakxA6Pk', label: 'Live rehearsal' },
    cover: covers.kathangIsip,
  },
  {
    id: 'maybe-the-night',
    title: 'Maybe the Night',
    lang: 'en',
    year: 2017,
    release: 'Single',
    spotifyTrackId: '1yDiru08Q6omDOGkZMPnei',
    youtube: { id: 'MNwPEiZWrs8', label: 'Live, 2018' },
    note: {
      text: 'Their first song as a nine-piece. In 2024, Ed Sheeran brought the twins onstage in Manila to sing it.',
      sources: [S.bandwagonNine2026, S.philstarSheeran2024],
    },
    cover: covers.maybeTheNight,
  },
  {
    id: 'pagtingin',
    title: 'Pagtingin',
    lang: 'fil',
    year: 2019,
    release: 'Limasawa Street',
    spotifyTrackId: '5l9g7py8RCblcvbZgGQgSd',
    youtube: { id: 'P5ktQh3sWZk', label: 'Official music video' },
    cover: covers.limasawa,
  },
  {
    id: 'leaves',
    title: 'Leaves',
    lang: 'en',
    year: 2017,
    release: 'Single (first heard on the 2016 EP)',
    spotifyTrackId: '6wdCelHrPh7UfliNjwRTUv',
    youtube: { id: '5oxxi0d7AQI', label: 'Leaves (feat. Young K), official video' },
    cover: covers.leaves,
  },
  {
    id: 'araw-araw',
    title: 'Araw-Araw',
    lang: 'fil',
    year: 2019,
    release: 'Limasawa Street',
    spotifyTrackId: '4rG3h1QwgjSSWz8EIjCFrm',
    youtube: { id: 'V4qjAyb4lNI', label: 'Official lyric video' },
    cover: covers.limasawa,
  },
  {
    id: 'sa-susunod',
    title: 'Sa Susunod na Habang Buhay',
    lang: 'fil',
    year: 2020,
    release: 'Single',
    spotifyTrackId: '3PgjBOoA5OytNGkglObpOd',
    youtube: { id: 'W3CKEzGPwnc', label: 'Official music video' },
    cover: covers.saSusunod,
  },
  {
    id: 'saranggola',
    title: 'Saranggola',
    lang: 'fil',
    year: 2025,
    release: 'Single, now on Nine',
    spotifyTrackId: '6c8ICDxZPmYN5XY9wCZJXQ',
    youtube: { id: 'eTQS39ufnCM', label: 'Official lyric video' },
    note: {
      text: '“Saranggola” means kite. Jam revealed she is the kite in the song.',
      sources: [S.billboardJam2025, S.wikipediaSaranggola],
    },
    cover: covers.saranggola,
  },
]

/**
 * Titles for the hero marquee. All are real Ben&Ben song titles from the
 * discography research (no lyrics, titles only).
 */
export const marqueeTitles: { title: string; lang: 'en' | 'fil' }[] = [
  { title: 'Kathang Isip', lang: 'fil' },
  { title: 'Maybe the Night', lang: 'en' },
  { title: 'Pagtingin', lang: 'fil' },
  { title: 'Leaves', lang: 'en' },
  { title: 'Araw-Araw', lang: 'fil' },
  { title: 'Sa Susunod na Habang Buhay', lang: 'fil' },
  { title: 'Saranggola', lang: 'fil' },
  { title: 'Ride Home', lang: 'en' },
  { title: 'Lifetime', lang: 'en' },
  { title: 'Sunrise', lang: 'en' },
  { title: 'Autumn', lang: 'en' },
  { title: 'Courage', lang: 'en' },
  { title: 'Comets', lang: 'en' },
  { title: 'Could Be Something', lang: 'en' },
  { title: 'Pasalubong', lang: 'fil' },
  { title: 'Magpahinga', lang: 'fil' },
  { title: 'Paninindigan Kita', lang: 'fil' },
  { title: 'Harinawa', lang: 'fil' },
]
