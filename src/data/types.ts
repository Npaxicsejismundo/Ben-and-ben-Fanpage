/** A citation shown next to a fact. `label` is "Publication, Date". */
export interface Source {
  label: string
  url: string
}

export interface ImageAsset {
  /** Short name used in the footer credits, e.g. "Limasawa Street cover". */
  name: string
  src: string
  /** Optional responsive candidates, e.g. "url 300w, url 640w". */
  srcSet?: string
  alt: string
  width: number
  height: number
  credit: string
  creditUrl: string
}

export interface Fact {
  text: string
  sources: Source[]
}

export interface MemberColor {
  /** Friendly name, e.g. "Lamp gold". */
  name: string
  hex: string
  /** Which text color reads on top of `hex` at AA contrast. */
  ink: 'dark' | 'light'
  /** Where in the artwork this color came from. */
  origin: string
}

export interface Member {
  id: string
  name: string
  fullName: string
  /** Short line for cards, e.g. "Vocals, acoustic guitar". */
  role: string
  /** Profile page: the instrument(s) they play. */
  plays: string
  /** Profile page: what they do in the band beyond the instrument. */
  bandRole: string
  /** Profile page: when they joined (or their years with the band). */
  since: string
  /** Citations for plays / bandRole / since. */
  roleSources: Source[]
  /** Years with the band, shown when relevant. */
  tenure?: string
  personality: string
  color: MemberColor
  facts: Fact[]
  quote?: { text: string; source: Source }
  /** Gentle note shown in the detail panel (e.g. a farewell). */
  note?: { title: string; body: string; sources: Source[] }
  photo: ImageAsset | null
}

export type EraMotif = 'dawn' | 'road' | 'journal' | 'stars' | 'stones'

export interface Album {
  id: string
  title: string
  kind: string
  year: number
  released: string
  label: string
  /** Two-line summary, paraphrased from the cited source. */
  description: string
  keyTracks: string[]
  links: { label: string; url: string }[]
  /** Shown when there is no streaming link. */
  availability?: string
  cover: ImageAsset | null
  palette: { bg: string; fg: string; accent: string }
  motif: EraMotif
  sources: Source[]
}

export interface Single {
  id: string
  title: string
  /** BCP 47 language of the title, for screen readers. */
  lang: 'en' | 'fil'
  /** ISO date (YYYY-MM-DD), or null when it couldn't be verified. */
  released: string | null
  note?: string
  cover: ImageAsset
  spotify?: string
  apple?: string
  sources: Source[]
}

export interface Song {
  id: string
  title: string
  /** BCP 47 language of the title, for screen readers. */
  lang: 'en' | 'fil'
  year: number
  release: string
  spotifyTrackId: string
  youtube?: { id: string; label: string }
  note?: Fact
  cover: ImageAsset
}

export interface Counter {
  id: string
  /** Numeric part that animates. */
  value: number
  prefix?: string
  suffix?: string
  label: string
  detail: string
  sources: Source[]
}

export interface Highlight {
  id: string
  year: string
  title: string
  detail: string
  sources: Source[]
}

export interface Stage {
  id: string
  date: string
  title: string
  place: string
  detail: string
  upcoming?: boolean
  sources: Source[]
}

export interface StoryChapter {
  id: string
  kicker: string
  title: string
  body: string
  image: ImageAsset | null
  /** Placeholder text while `image` is null. */
  imageLabel?: string
  /** Short note written in the polaroid's bottom margin. */
  imageCaption?: string
  sources: Source[]
}

export interface Cause {
  id: string
  title: string
  body: string
  sources: Source[]
}
