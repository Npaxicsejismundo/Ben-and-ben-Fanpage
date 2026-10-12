import type { Album } from './types'
import { SOURCES as S } from './sources'
import { covers } from './images'

/**
 * Palettes are sampled from each cover. Descriptions are paraphrased from the
 * official site and press. The 2016 EP is not on streaming services, so it has
 * no cover image and links to its songs' 2017 singles instead.
 */
export const albums: Album[] = [
  {
    id: 'ep',
    title: 'Ben&Ben',
    kind: 'EP',
    year: 2016,
    released: 'December 17, 2016',
    label: 'Sindikato',
    description:
      'Where it started: seven songs the twins put out as Ben&Ben in December 2016. Several, like “Leaves” and “Kathang Isip,” returned as 2017 singles once the band grew to nine.',
    keyTracks: ['Ride Home', 'Kathang Isip', 'Leaves', 'Susi'],
    availability: 'Not on streaming services. Its songs live on as singles.',
    links: [
      { label: 'Kathang Isip on Spotify', url: 'https://open.spotify.com/track/3WUEs51GpcvlgU7lehLgLh' },
      { label: 'Leaves on Spotify', url: 'https://open.spotify.com/track/6wdCelHrPh7UfliNjwRTUv' },
    ],
    cover: covers.ep,
    palette: { bg: '#EFE4C8', fg: '#2B1D14', accent: '#A85B32' },
    motif: 'dawn',
    sources: [S.wikipediaDiscography],
  },
  {
    id: 'limasawa',
    title: 'Limasawa Street',
    kind: 'Debut studio album',
    year: 2019,
    released: 'May 12, 2019',
    label: 'Sony Music Philippines',
    description:
      'Thirteen songs about love and life, told with wide-eyed idealism. The title track, mixed by Steve Lillywhite, is about building a world of your own.',
    keyTracks: ['Pagtingin', 'Araw-Araw', 'Mitsa (Salamat)', 'Limasawa Street'],
    links: [
      { label: 'Spotify', url: 'https://open.spotify.com/album/7xCcuTA3abKwxj8HwgxP7R' },
      { label: 'Apple Music', url: 'https://music.apple.com/ph/album/limasawa-street/1462420099' },
    ],
    cover: covers.limasawa,
    palette: { bg: '#081E52', fg: '#F3EAC7', accent: '#D4A72C' },
    motif: 'road',
    sources: [S.officialSite, S.bandwagonLimasawa2019],
  },
  {
    id: 'kuwaderno',
    title: 'Pebble House, Vol. 1: Kuwaderno',
    kind: 'Second studio album',
    year: 2021,
    released: 'August 29, 2021',
    label: 'Sony Music Philippines',
    description:
      'Made during lockdown and framed as the band’s open journal. A long list of guest artists, from SB19 to Moira Dela Torre, makes isolation feel shared.',
    keyTracks: ['Pasalubong', 'Lunod', 'Kapangyarihan', 'Magpahinga'],
    links: [
      { label: 'Spotify', url: 'https://open.spotify.com/album/0UeeygFdIo8k7PgxpLEGWI' },
      { label: 'Apple Music', url: 'https://music.apple.com/ph/album/pebble-house-vol-1-kuwaderno/1581583875' },
    ],
    cover: covers.kuwaderno,
    palette: { bg: '#D2AE6D', fg: '#2E2219', accent: '#2F7F91' },
    motif: 'journal',
    sources: [S.officialSite, S.bandwagonKuwaderno2021],
  },
  {
    id: 'traveller',
    title: 'The Traveller Across Dimensions',
    kind: 'Third studio album',
    year: 2024,
    released: 'November 29, 2024',
    label: 'Ben&Ben, distributed by Sony Music Entertainment Philippines',
    description:
      'A 13-track concept album paired with animation by Puppeteer Studios. It follows a girl named Liwanag through the realms of Light, Energy and Feel in search of inner peace.',
    keyTracks: ['Could Be Something', 'Autumn', 'Courage', 'Comets'],
    links: [
      { label: 'Spotify', url: 'https://open.spotify.com/album/3AxFszKy5olWdrPV3bHTFY' },
      { label: 'Apple Music', url: 'https://music.apple.com/ph/album/the-traveller-across-dimensions/1780785871' },
    ],
    cover: covers.traveller,
    palette: { bg: '#283759', fg: '#F2F0DC', accent: '#E8C66A' },
    motif: 'stars',
    sources: [S.bandwagonTraveller2024],
  },
  {
    id: 'nine',
    title: 'Nine',
    kind: 'Anthology',
    year: 2026,
    released: 'September 24, 2026',
    label: 'Sony Music Entertainment Philippines',
    description:
      'A ninth-anniversary anthology: fan favourites reimagined by the band they are now, plus “Saranggola” and the new song “Harinawa.” Produced by Poch; listed as Jam’s last project with the band.',
    keyTracks: ['Maybe The Night (Reimagined)', 'Lifetime (Reimagined)', 'Saranggola', 'Harinawa'],
    links: [
      { label: 'Spotify', url: 'https://open.spotify.com/album/1rTn3zCq7RQkG8qqfR4d8J' },
      { label: 'Apple Music', url: 'https://music.apple.com/ph/album/nine/6809805390' },
    ],
    cover: covers.nine,
    palette: { bg: '#383732', fg: '#EDEBE3', accent: '#D9D6CC' },
    motif: 'stones',
    sources: [S.bandwagonNine2026, S.billboardNine2026, S.wikipediaDiscography],
  },
]
