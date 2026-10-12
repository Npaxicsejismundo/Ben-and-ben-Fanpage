import type { ImageAsset } from './types'

/**
 * EVERY image on the site is declared here, so they can be swapped in one place.
 *
 * - Set a member photo by replacing `null` with an ImageAsset. Cards and panels
 *   fall back to a colored monogram placeholder while it is `null`.
 * - Images are hot-linked from official sources (the official site's Wix CDN and
 *   Spotify's cover CDN) instead of being copied into the repo. To self-host,
 *   drop files into /public/images and point `src` at "/images/<file>".
 * - Keep `width`/`height` accurate (aspect ratio matters for layout stability).
 */

const WIX_MEDIA = 'https://static.wixstatic.com/media/2a37f2_'

/** Resized, re-encoded image from the official site's Wix CDN (originals are 8–13 MB). */
function wix(file: string, w: number, h: number) {
  const [, ext = 'jpg'] = file.split('.')
  return `${WIX_MEDIA}${file}/v1/fill/w_${w},h_${h},al_c,q_80,enc_auto/image.${ext}`
}

/** Spotify cover art by image hash. Spotify serves 300px and 640px sizes. */
function spotifyCover(hash: string, name: string, alt: string): ImageAsset {
  return {
    name,
    src: `https://i.scdn.co/image/ab67616d0000b273${hash}`,
    srcSet: `https://i.scdn.co/image/ab67616d00001e02${hash} 300w, https://i.scdn.co/image/ab67616d0000b273${hash} 640w`,
    alt,
    width: 640,
    height: 640,
    credit: 'Cover art © Ben&Ben and their label. Image via Spotify.',
    creditUrl: 'https://open.spotify.com/artist/4DAcJXcjX0zlQAZAPAx4Zb',
  }
}

const BAND_PHOTO = '1669f7dce4a84ddbb06ee7cb08b2b05d~mv2.jpg'

export const bandPhoto: ImageAsset = {
  name: 'Band press photo',
  src: wix(BAND_PHOTO, 1200, 864),
  srcSet: [
    `${wix(BAND_PHOTO, 640, 461)} 640w`,
    `${wix(BAND_PHOTO, 760, 547)} 760w`,
    `${wix(BAND_PHOTO, 960, 691)} 960w`,
    `${wix(BAND_PHOTO, 1200, 864)} 1200w`,
    `${wix(BAND_PHOTO, 1800, 1296)} 1800w`,
  ].join(', '),
  alt: 'The members of Ben&Ben together in a wooden doorway strung with fairy lights, dressed in earthy tones.',
  width: 1200,
  height: 864,
  credit: 'Official press photo. Image via benandbenmusic.com.',
  creditUrl: 'https://www.benandbenmusic.com/',
}

/** Resized copy from the Filestack CDN that Bandwagon serves its article images from. */
function filestack(handle: string, w: number) {
  return `https://cdn.filestackcontent.com/resize=width:${w}/output=format:jpg,quality:80/${handle}`
}

const TINATANGI_STILL = '5ULj5EtR1KopbcLUQVLU'

/** 2016, before the band was nine: a still from the twins' PhilPop entry. */
export const tinatangiStill: ImageAsset = {
  name: '“Tinatangi” music video still (2016)',
  src: filestack(TINATANGI_STILL, 800),
  srcSet: [480, 800, 1200].map((w) => `${filestack(TINATANGI_STILL, w)} ${w}w`).join(', '),
  alt: 'Still from the 2016 “Tinatangi” music video by Cooky Chua and Bayang Barrios featuring The Benjamins: two guitarists and two singers in a sunny hillside field.',
  width: 800,
  height: 450,
  credit: 'Still from the official “Tinatangi” music video (PhilPop 2016, Viva Records). Image via Bandwagon.',
  creditUrl: 'https://www.bandwagon.asia/articles/watch-the-benjamins-tinatangi-woos-its-way-into-philpop-2016',
}

export const covers = {
  /**
   * The 2016 EP is not on streaming services, so its cover comes from the EP's
   * Genius album page (same tracklist and release date). The painting matches
   * the official "Ride Home" single cover (Jan 2017): same road, guardrails and
   * keyhole of trees, drawn at night. Self-hosted in /public/images/covers.
   */
  ep: {
    name: 'Ben&Ben EP cover (2016)',
    src: '/images/covers/ben-and-ben-ep-640.jpg',
    srcSet: [320, 640, 1000].map((w) => `/images/covers/ben-and-ben-ep-${w}.jpg ${w}w`).join(', '),
    alt: 'Ben&Ben EP cover: a painting of two long-haired figures seen from behind, one waving, carrying guitar cases down a road toward a glowing sky framed by a keyhole of trees, with "Ben&Ben" in white hand lettering.',
    width: 640,
    height: 640,
    credit: 'Cover art © Ben&Ben. Image via the EP’s Genius album page.',
    creditUrl: 'https://genius.com/albums/Ben-ben/Ben-ben',
  } satisfies ImageAsset,
  limasawa: spotifyCover(
    'bbcb629ade1918ba09268794',
    'Limasawa Street cover',
    'Limasawa Street cover: a golden road winds through dark blue hills toward a glowing floating lamp.',
  ),
  kuwaderno: spotifyCover(
    '02a54ad26905c909d9c5df5f',
    'Pebble House, Vol. 1: Kuwaderno cover',
    'Pebble House, Vol. 1: Kuwaderno cover: a dollhouse cutaway with the band in its rooms, in kraft and brown tones.',
  ),
  traveller: spotifyCover(
    'cdd5a3dce62a2fc8028b1ae3',
    'The Traveller Across Dimensions cover',
    'The Traveller Across Dimensions cover: hooded figures with golden hair and a glowing lantern under a starry pastel sky.',
  ),
  nine: spotifyCover(
    '8d5eefad16a4084f958d1322',
    'Nine cover',
    'Nine cover: the band on river boulders beside glowing white panels, with "Nine" in glowing script.',
  ),
  saranggola: spotifyCover(
    '9d155d66dcbb0401a1707c57',
    'Saranggola single cover',
    'Saranggola single cover: the band on a grassy hillside holding a giant white kite, with yellow hand lettering.',
  ),
  kathangIsip: spotifyCover('bbf886276cd90f8d60b56a01', 'Kathang Isip single cover', 'Kathang Isip single cover art.'),
  maybeTheNight: spotifyCover(
    '44b891b34fbf640c8d21e91a',
    'Maybe the Night single cover',
    'Maybe the Night single cover art.',
  ),
  leaves: spotifyCover('189948156c1fadd99af89f50', 'Leaves single cover', 'Leaves single cover art.'),
  saSusunod: spotifyCover(
    '00cb9934d16e2262cf40a152',
    'Sa Susunod na Habang Buhay single cover',
    'Sa Susunod na Habang Buhay single cover art.',
  ),
}

const BANDWAGON_2019 =
  'https://www.bandwagon.asia/articles/bandwagon-doodles-ben-ben-members-tell-their-stories-instruments-and-interests-interview-2019'

/**
 * Member portraits from Bandwagon Philippines' April 23, 2019 shoot, where each
 * photo sits under that member's name in the article. Cropped to 4:5 and
 * resized into /public/images/members (480px and 800px wide).
 */
function bandwagonPortrait(id: string, name: string, holding: string): ImageAsset {
  return {
    name: `${name} portrait (2019)`,
    src: `/images/members/${id}-800.jpg`,
    srcSet: `/images/members/${id}-480.jpg 480w, /images/members/${id}-800.jpg 800w`,
    alt: `${name} with ${holding}, in a toned studio portrait from 2019.`,
    width: 800,
    height: 1000,
    credit: 'Photo: Bandwagon Philippines, April 2019 shoot.',
    creditUrl: BANDWAGON_2019,
  }
}

/** Set any entry to `null` to fall back to the colored monogram placeholder. */
export const memberPhotos: Record<string, ImageAsset | null> = {
  paolo: bandwagonPortrait('paolo', 'Paolo Benjamin Guico', 'his acoustic guitar'),
  miguel: bandwagonPortrait('miguel', 'Miguel Benjamin Guico', 'his acoustic guitar'),
  poch: bandwagonPortrait('poch', 'Poch Barretto', 'his electric guitar'),
  keifer: bandwagonPortrait('keifer', 'Keifer Cabugao', 'his violin and bow'),
  pat: bandwagonPortrait('pat', 'Pat Lasaten', 'her keyboard in the foreground'),
  agnes: bandwagonPortrait('agnes', 'Agnes Reoma', 'her bass guitar'),
  toni: bandwagonPortrait('toni', 'Toni Muñoz', 'her hands on the congas'),
  andrew: bandwagonPortrait('andrew', 'Andrew de Pano', 'a djembe'),
  jam: bandwagonPortrait('jam', 'Jam Villanueva', 'her drum kit'),
}

/** Single artwork as shown on the official site (Wix CDN, resized to 300px and 600px squares). */
function officialSingleCover(file: string, name: string, alt: string): ImageAsset {
  return {
    name,
    src: wix(file, 600, 600),
    srcSet: `${wix(file, 300, 300)} 300w, ${wix(file, 600, 600)} 600w`,
    alt,
    width: 600,
    height: 600,
    credit: 'Cover art © Ben&Ben and their label. Image via benandbenmusic.com.',
    creditUrl: 'https://www.benandbenmusic.com/',
  }
}

/** Covers for the Singles grid, keyed by single id (see data/singles.ts). */
export const singleCovers = {
  saranggola: officialSingleCover(
    '55ef927e24144630add40deda3aecc4d~mv2.jpg',
    'Saranggola single cover (official site)',
    'Saranggola cover: the band on a grassy hillside with a giant white kite and yellow hand lettering.',
  ),
  tomorrowWithYou: officialSingleCover(
    'b3faa13fb3f04dce981827c7b30f6dcb~mv2.png',
    'Tomorrow With You (Live) cover',
    'Tomorrow With You cover: two illustrated figures beneath a starry arch, facing a white cloud city.',
  ),
  triumph: officialSingleCover(
    'b5358cb491474f899ff63e56f29e77a9~mv2.png',
    'Triumph cover',
    'Triumph cover: a small figure on a cliff before a purple vortex above a dark mountain.',
  ),
  cometsPetra: officialSingleCover(
    '6489f83644a24316b8172e0a86d407f8~mv2.png',
    'Comets (with Petra Sihombing) cover',
    'Comets cover art: a figure leaping through a deep blue sky toward glowing fragments.',
  ),
  comets: officialSingleCover(
    '4a23fa6dee724526a187d4f9b16038c1~mv2.png',
    'Comets cover',
    'Comets cover: an illustrated figure on a dark rock as comets streak across a violet sky.',
  ),
  courage: officialSingleCover(
    'ed1d0630114d4eb5899786bf49b6f6a9~mv2.jpg',
    'Courage (full band) cover',
    'Courage cover: a lone figure on a plain under a blazing orange and blue sky, with the title in large type.',
  ),
  autumn: officialSingleCover(
    'b7092a433fbb4256b7542a06a8b0fe58~mv2.jpg',
    'Autumn cover',
    'Autumn cover: a warm collage with a golden sun, leaves, lanterns and a reaching hand.',
  ),
  courageAcoustic: officialSingleCover(
    'd9190a29dd1e4e31800ee814078a68a8~mv2.jpg',
    'Courage (acoustic) cover',
    'Courage acoustic cover: a figure standing in a long hall of repeating golden frames.',
  ),
  couldBeSomething: officialSingleCover(
    'ac13f437bb0f4bb29cd8ebd92fea9348~mv2.jpg',
    'Could Be Something cover',
    'Could Be Something cover: a repeating pink, teal and orange swirl pattern.',
  ),
  dear: officialSingleCover(
    '6105b2ffd3924620bd6c56a30fc2859f~mv2.jpg',
    'Dear cover',
    'Dear cover: the word "Dear" framed by fine white botanical line drawings on mustard yellow.',
  ),
  theOnesWeOnceLoved: officialSingleCover(
    'f785f1051ae545b7b0c54371770dcfca~mv2.jpg',
    'The Ones We Once Loved cover',
    'The Ones We Once Loved cover: a couple embracing on a misty mountainside, with handwritten title.',
  ),
  langyangPagIbig: officialSingleCover(
    '0a9c1e551c01407d96f429244feb7cf0~mv2.jpg',
    'Langyang Pag-Ibig cover',
    'Langyang Pag-Ibig cover: a heart pierced by roses held above a figure standing in a flooded, sunset-lit street.',
  ),
}

/** Every image in use, for the footer credits list. */
export const allImages: ImageAsset[] = [
  bandPhoto,
  tinatangiStill,
  ...Object.values(covers).filter((c): c is ImageAsset => c !== null),
  ...Object.values(singleCovers),
  ...Object.values(memberPhotos).filter((c): c is ImageAsset => c !== null),
]
