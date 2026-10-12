# Liwanag

An unofficial, fan-made tribute site for **Ben&Ben**, the Filipino folk-pop band.
"Liwanag" (light) is what the band calls its fans; light is the site's recurring motif.

> Unofficial fan site. Not affiliated with Ben&Ben or Sony Music Philippines.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- GSAP (ScrollTrigger, SplitText) and Lenis for smooth, scroll-driven motion
- Fraunces (display, soft axis) and Instrument Sans (text), self-hosted via Fontsource
- Build-time prerendering (`scripts/prerender.mjs`): the page ships as real HTML and hydrates

## Run it

Requires Node 20+ (built and tested on Node 24).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck, client build, SSR build, prerender into dist/
npm run preview    # serve dist/ at http://localhost:4173
```

## Deploy

The output is a static folder (`dist/`). Both hosts below pick up the included config.

**Vercel**: import the repository in the Vercel dashboard (or run `npx vercel`). `vercel.json` sets the
build command (`npm run build`), the output directory (`dist`) and long-lived caching for hashed assets.

**Netlify**: connect the repository (or run `npx netlify deploy --prod --dir=dist` after a local build).
`netlify.toml` sets the build command, publish directory and asset caching.

## Where things live

```
src/
  data/            all content, kept apart from components
    images.ts      EVERY image path and credit (swap images here)
    members.ts     the nine members, colors, sourced facts
    albums.ts      discography and era palettes
    songs.ts       top songs (Spotify/YouTube IDs) and marquee titles
    singles.ts     the singles grid (newest first)
    achievements.ts counters and highlights
    stages.ts      live and big stages timeline
    site.ts        story chapters, causes, socials, nav, disclaimer
    sources.ts     shared citations
  pages/           Home (all sections) and MemberPage (one profile per member)
  sections/        one component per home section (Hero, Story, Members, Discography,
                   TopSongs, Achievements, Live, Liwanag, Footer)
  components/      Loader, Cursor, Magnetic, RevealText, Marquee, MemberDialog, ...
  lib/             gsap setup, Lenis, background color layer, observers, routes
public/images/members/   the nine member portraits
public/images/covers/    the 2016 EP cover (not on streaming services, so self-hosted)
research/research-notes.md   everything found during research, with sources
```

### Pages

- `/`: the home page.
- `/members/<id>`, for example `/members/paolo`: one profile per member. Each shows:
  - a band in the member's color with their name,
  - their portrait,
  - what they play, their role in the band, when they joined and their signature color,
  - sourced fun facts,
  - previous and next links.

Every page is prerendered: the build writes `dist/members/<id>.html` and `dist/members/<id>/index.html`, so
clean URLs work on any static host. Links between pages are ordinary links. In Chromium browsers the portrait
morphs from the home card into the profile through cross-document view transitions; other browsers do a normal
page load. Add or remove a member in `src/data/members.ts` and the page is generated on the next build.

### Editing content

- **Facts** live in `src/data/*.ts`. Each one carries a `sources` array, rendered as links under it. Keep facts
  sourced. If something can't be verified, write "TBD" or leave it out.
- **Images**: replace a `null` in `src/data/images.ts` (for example `memberPhotos.paolo`) with an `ImageAsset`
  (`src`, `alt`, `width`, `height`, `credit`, `creditUrl`). Cards, panels and the footer credits update
  automatically. To self-host, put files in `public/images/` and use `/images/<file>` as `src`.
- **Member colors** are a design choice of this fan site (drawn from the band's artwork), not the members' own.
  The site says so.

## Motion and accessibility

- **Intro**: nine lights switch on (one per member), gather into one, and the room fills with light around the
  hero wordmark. It plays once per browser session. Any key, a click or "Skip intro" ends it.
- **Reduced motion** (`prefers-reduced-motion: reduce`):
  - No intro, no smooth scrolling, no pinning, no custom cursor.
  - The marquee is static.
  - Headlines and fade-ups appear immediately.
  - The discography stacks vertically.
- **Keyboard**:
  - Skip link and visible focus styles. Member profiles are real pages, reached with plain links.
  - Tabbing into the pinned discography scrolls the page to that era.
  - Song players load only when you press a song.
- **No JS**: the prerendered page is complete and readable. Sections keep their own colors, and the discography
  stacks.
- Every image has alt text. Filipino song titles carry `lang="fil"`.
- Member cards are plain links to the profile pages. Each card has an accessible name: the member's name and role.

## Performance

Lighthouse 12 on the production build (`npm run preview`, run locally with Edge headless):

| Run | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home, mobile (default slow-4G and 4x CPU throttling) | 90–92 | 100 | 100 | 100 |
| Home, desktop | 95 | 100 | 100 | 100 |
| Member profile, mobile | 95 | 100 | 100 | 100 |
| Member profile, desktop | 100 | 100 | 100 | 100 |

Mobile metrics: FCP ~2.1 s, LCP ~2.4 s, TBT ~50 ms, CLS 0, Speed Index ~5 s. Speed Index is the weakest metric
because the intro animates the first seconds by design.

How it gets there:

- **Prerendered HTML.** First paint doesn't wait for JS, and the LCP element is the wordmark text.
- **The app bundle loads after first contentful paint**, so it never competes with first paint. React hydrates
  inside `startTransition`, which keeps it time-sliced.
- **`content-visibility: auto`** on below-the-fold sections. It skips rendering offscreen content, which was the
  biggest cost.
- **IntersectionObserver for one-shot reveals and section colors.** ScrollTrigger is used only for pinning and
  scrubbing.
- **Metric-matched fallback fonts** (`size-adjust` and ascent/descent overrides), so the font swap causes no
  layout shift.
- **Deferred below-fold images.** Ambient motion (marquee drift, breathing glows) starts on the first interaction.

Scores vary with the machine running Lighthouse. Check the deployed URL with
[PageSpeed Insights](https://pagespeed.web.dev/).

## Image sources

Images are either hot-linked from their sources or self-hosted in `public/images/`. Each one is credited in the
footer ("Image credits").

| Image | Source |
| --- | --- |
| Band press photo | Official site, benandbenmusic.com (Wix CDN `static.wixstatic.com/media/2a37f2_1669f7dce4a84ddbb06ee7cb08b2b05d~mv2.jpg`) |
| Limasawa Street, Pebble House Vol. 1: Kuwaderno, The Traveller Across Dimensions, Nine covers | Spotify album art (`i.scdn.co`) |
| Saranggola, Kathang Isip, Maybe the Night, Leaves, Sa Susunod na Habang Buhay single covers | Spotify album art (`i.scdn.co`) |
| Singles grid covers (12) | Official site, benandbenmusic.com (Wix CDN, resized to 300px and 600px). Titles come from the official file names. Release dates and links come from each single's Spotify page, which the official smart links point to |
| Ben&Ben EP (2016) cover | The EP isn't on streaming services, so the cover comes from its [Genius album page](https://genius.com/albums/Ben-ben/Ben-ben) (a user upload whose tracklist and release date match the EP). It shares its painting with the official "Ride Home" single cover (January 2017): the same road, guardrails and keyhole of trees, at night. Resized into `public/images/covers/` (320px, 640px and 1000px) |
| Member portraits (9) | [Bandwagon Philippines](https://www.bandwagon.asia/articles/bandwagon-doodles-ben-ben-members-tell-their-stories-instruments-and-interests-interview-2019), April 23, 2019 shoot. Each photo sits under that member's name in the article, and each member holds their own instrument. Cropped to 4:5 and resized into `public/images/members/` (480px and 800px). These are press photos used with credit. Ask Bandwagon for permission before a wide public launch, or swap them for photos you have rights to (see `memberPhotos` in `src/data/images.ts`). |
| 2016 story photo | Still from the official "Tinatangi" music video (PhilPop 2016, Viva Records), via [Bandwagon](https://www.bandwagon.asia/articles/watch-the-benjamins-tinatangi-woos-its-way-into-philpop-2016) (Filestack CDN, resized) |

The band's official logo is intentionally not used. The site's mark is its own glowing orb plus "Liwanag".

## Not verified, or TBD

- **Awit Awards total.** The site says "15+": Wikipedia counts 16 through 2024, with wins since. The "about 18"
  figure only appeared on a promoter page.
- **"3 billion Spotify streams, first Filipino act".** Press-reported (The New Hue, Jan 2026; Wikipedia). I found
  no Spotify announcement or date, so the site says "reported".
- **Member quotes.** Only Jam's announcement quote is verified verbatim. Every other member fact is a cited
  paraphrase.
- **Original music videos** for Kathang Isip, Maybe the Night and Leaves sit on a "Fanverse" YouTube channel whose
  owner couldn't be verified. The site links official-channel alternatives instead.
- **Inquirer, Oct 2026 concert article.** It couldn't be opened (HTTP 403). It is cited alongside PEP, DZRH and
  BusinessWorld, and the Cebu 2027 date is cited to BusinessWorld.
- **"Comets (with Petra Sihombing)"** is on the official site's Singles grid and in Wikipedia's discography, but its release date and streaming link couldn't be confirmed. The site shows "date TBD" and links to the band's Spotify page. (The official site's "Comets" link points to an unrelated release, so the regular Comets single was looked up on MusicBrainz: Spotify `7mFRwy9ld2leAOlpWDNENj`.)
- **EP cover.** No official upload was found (the EP isn't on Spotify, Apple Music, Deezer or MusicBrainz). The
  image is the one on Genius, backed up by its match with the official "Ride Home" artwork. Swap it in
  `covers.ep` (`src/data/images.ts`) if an official copy turns up.
- **Not mentioned on the site:** a replacement drummer, Jam moving abroad, and the final Puhon fundraising total.
- **Kuwaderno notebook packaging** is unverified. The journal motif comes from the official album copy ("open
  journal").
- **Social platforms.** Instagram and Facebook posts were behind a login, and TikTok videos didn't load, so the
  research relied on the official site, YouTube and press.

Corrections made to the original brief, based on sources:

- NME's category is "Best Band from Asia".
- Clockenflap was in 2023.
- The twins already called themselves Ben&Ben in 2016. May 10, 2017 is when they became nine.
- Jam's final show was October 2, 2026.
- *Nine* came out on September 24, 2026.
- The real covers show no street map (Limasawa), no notebook (Kuwaderno) and no orange sky (Saranggola).

## Fonts

Fraunces and Instrument Sans are licensed under the SIL Open Font License 1.1 (via Fontsource).
