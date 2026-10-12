import type { Source } from './types'

/**
 * Citations reused across the data files. Every fact on the site links to one
 * of these (or to a one-off source declared next to it).
 */
export const SOURCES = {
  officialSite: { label: 'benandbenmusic.com', url: 'https://www.benandbenmusic.com/' },
  wikipedia: { label: 'Wikipedia, Ben&Ben', url: 'https://en.wikipedia.org/wiki/Ben%26Ben' },
  wikipediaDiscography: {
    label: 'Wikipedia, Ben&Ben discography',
    url: 'https://en.wikipedia.org/wiki/Ben%26Ben_discography',
  },
  bandwagonDoodles2019: {
    label: 'Bandwagon, May 8, 2019',
    url: 'https://www.bandwagon.asia/articles/bandwagon-doodles-ben-ben-members-tell-their-stories-instruments-and-interests-interview-2019',
  },
  esquire2022: {
    label: 'Esquire Philippines, Jan 17, 2022',
    url: 'https://www.esquiremag.ph/culture/music/ben-and-ben-esquire-sessions-live-podcast-a00304-20220117',
  },
  nme2021: {
    label: 'NME, Aug 2021',
    url: 'https://www.nme.com/features/benben-album-pebble-house-vol-1-kuwaderno-kz-tandingan-sb19-zild-3032643',
  },
  pep2025: {
    label: 'PEP, May 19, 2025',
    url: 'https://www.pep.ph/news/local/ben-and-ben-on-misunderstandings-visiting-cancer-patients-a716-20250519-lfrm',
  },
  bandwagonNine2026: {
    label: 'Bandwagon, Sep 24, 2026',
    url: 'https://www.bandwagon.asia/articles/ben-ben-look-back-on-9-years-together-with-anthology-album-nine-listen',
  },
  bandwagonAnniversary2021: {
    label: 'Bandwagon, May 7, 2021',
    url: 'https://bandwagon.asia/articles/ben-and-ben-comeback-new-era-upuan-song-single-music-lyric-video-watch-2021',
  },
  manilaBulletin2022: {
    label: 'Manila Bulletin, Mar 23, 2022 (archived)',
    url: 'https://web.archive.org/web/20240120222228/https://uplift.mb.com.ph/benben-uplift-arts-culture-award/',
  },
  gmaJam2025: {
    label: 'GMA Network, Dec 12, 2025',
    url: 'https://www.gmanetwork.com/entertainment/showbiznews/benbens-jam-villanueva-set-to-leave-the-band-after-2026/128635/',
  },
  billboardJam2025: {
    label: 'Billboard Philippines, Dec 12, 2025',
    url: 'https://billboardphilippines.com/music/news/jam-villanueva-announces-departure-from-ben-and-ben-2026-statement/',
  },
  dzrhJam2026: {
    label: 'DZRH, Oct 3, 2026',
    url: 'https://www.dzrh.com.ph/post/benandbens-jam-villanueva-takes-final-stage-after-nine-years-with-the-band',
  },
  inquirerSaranggola2026: {
    label: 'Inquirer, Oct 2026',
    url: 'https://entertainment.inquirer.net/685688/benben-marks-9-years-closes-nine-piece-chapter-with-saranggola-concert',
  },
  pepSaranggola2026: {
    label: 'PEP, Oct 4, 2026',
    url: 'https://www.pep.ph/lifestyle/celebrations/194105/saranggola-ben-ben-nine-years-a6904-20261004-lfrm',
  },
  billboardNine2026: {
    label: 'Billboard Philippines, 2026',
    url: 'https://billboardphilippines.com/music/news/ben-and-ben-nine-anthology-album-reimagined/',
  },
  bandwagonLiwanag2020: {
    label: 'Bandwagon, Sep 4, 2020',
    url: 'https://www.bandwagon.asia/articles/ben-and-ben-new-name-fandom-liwanag-highlight-lights-fans-2020',
  },
  bandwagonTraveller2024: {
    label: 'Bandwagon, 2024',
    url: 'https://bandwagon.asia/articles/ben-ben-unveil-new-album-and-immersive-animation-experience-in-the-traveller-across-dimensions',
  },
  bandwagonKuwaderno2021: {
    label: 'Bandwagon, Aug 2021',
    url: 'https://www.bandwagon.asia/articles/ben-and-ben-reveal-new-album-title-new-release-comeback-mapahinga-upuan-sony-music-philippines-august-2021',
  },
  bandwagonLimasawa2019: {
    label: 'Bandwagon, 2019',
    url: 'https://www.bandwagon.asia/articles/ben-ben-limasawa-street-track-by-track-guide-creative-director-nicolai-maybituin',
  },
  billboardSaranggola2025: {
    label: 'Billboard Philippines, 2025',
    url: 'https://billboardphilippines.com/music/news/ben-and-ben-celebrate-friendship-in-upcoming-new-single-saranggola-2025/',
  },
  wikipediaSaranggola: {
    label: 'Wikipedia, Saranggola (song)',
    url: 'https://en.wikipedia.org/wiki/Saranggola_(song)',
  },
  abscbnWedding2024: {
    label: 'ABS-CBN, Nov 18, 2024',
    url: 'https://abs-cbn.com/entertainment/2024/11/18/ben-ben-s-pat-and-agnes-are-now-married-1319',
  },
  bandwagonPaninindigan2022: {
    label: 'Bandwagon, Jul 1, 2022',
    url: 'https://www.bandwagon.asia/articles/ben-ben-pat-lasaten-and-agnes-reoma-relive-their-love-story-in-new-music-video-for-paninindigan-kita-sony-music-philippines-june-2022',
  },
  gmaSugat2021: {
    label: 'GMA Network, Aug 13, 2021',
    url: 'https://gmanetwork.com/news/lifestyle/hobbiesandactivities/799193/ben-amp-ben-drops-music-video-for-sugat-featuring-munimuni/story',
  },
  bandwagonPasalubong2021: {
    label: 'Bandwagon, Jul 30, 2021',
    url: 'https://www.bandwagon.asia/articles/ben-and-ben-announce-collaboration-moira-dela-torre-pasalubong-listen-release-july-30-2021',
  },
  nmeAwards2022: {
    label: 'NME, Jan 11, 2022',
    url: 'https://www.nme.com/nme-awards/bandlab-nme-awards-2022-new-asia-categories-winners-full-list-3134609',
  },
  gmaCourage2023: {
    label: 'GMA Network, Dec 16, 2023',
    url: 'https://gmanetwork.com/news/lifestyle/hobbiesandactivities/891527/ben-amp-ben-releases-moving-music-video-for-courage/story',
  },
  interaksyonBreak2022: {
    label: 'Interaksyon, Apr 13, 2022',
    url: 'https://interaksyon.philstar.com/celebrities/2022/04/13/215102/benben-to-take-mental-health-break-holy-week/',
  },
  gmaEnvironment2020: {
    label: 'GMA Network, Jan 21, 2020',
    url: 'https://www.gmanetwork.com/entertainment/tv/amazing_earth/58622/kuwento-ng-environmental-advocacy-ng-benben-tinalakay-sa-amazing-earth-ep-84/story',
  },
  abscbnPuhon2020: {
    label: 'ABS-CBN, Mar 27, 2020',
    url: 'https://news.abs-cbn.com/entertainment/03/27/20/maybe-the-night-holds-a-little-hope-benben-inspires-with-online-concert-for-frontliners',
  },
  abscbnPride2024: {
    label: 'ABS-CBN, Mar 31, 2024',
    url: 'https://abs-cbn.com/entertainment/2024/3/31/ben-ben-s-pat-and-agnes-a-love-story-that-inspires-the-lgbt-community-1542',
  },
  bandwagonTinatangi2016: {
    label: 'Bandwagon, Jul 11, 2016',
    url: 'https://www.bandwagon.asia/articles/watch-the-benjamins-tinatangi-woos-its-way-into-philpop-2016',
  },
  wikipediaAwards: {
    label: 'Wikipedia, List of awards and nominations received by Ben&Ben',
    url: 'https://en.wikipedia.org/wiki/List_of_awards_and_nominations_received_by_Ben%26Ben',
  },
  businessworldSaranggola2026: {
    label: 'BusinessWorld, Oct 5, 2026',
    url: 'https://bworldonline.com/arts-and-leisure/2026/10/05/784500/benbens-saranggola-as-a-mirror-of-the-filipino-psyche/',
  },
  businessworldPuhon2020: {
    label: 'BusinessWorld, Mar 24, 2020',
    url: 'https://bworldonline.com/editors-picks/2020/03/24/284998/benben-to-hold-fundraising-online-concert/',
  },
  newHue2026: {
    label: 'The New Hue, Jan 30, 2026',
    url: 'https://www.thenewhueph.com/post/ben-ben-releases-duyan-music-video-starring-khalil-ramos-and-gabbi-garcia',
  },
  abscbn1B2021: {
    label: 'ABS-CBN, Jul 2, 2021',
    url: 'https://www.abs-cbn.com/entertainment/07/02/21/benben-reaches-1-billion-streams-on-spotify',
  },
  abscbn2B2023: {
    label: 'ABS-CBN, Dec 10, 2023',
    url: 'https://www.abs-cbn.com/2023/12/10/ben-ben-surpasses-2-billion-streams-on-spotify-we-celebrate-this-historic-milestone-with-you-1327',
  },
  philstarAwit2022: {
    label: 'Philstar, Nov 24, 2022',
    url: 'https://www.philstar.com/entertainment/music/2022/11/24/2226153/list-awit-awards-2022-winners',
  },
  gmaAwit2025: {
    label: 'GMA Network, Nov 17, 2025',
    url: 'https://www.gmanetwork.com/entertainment/showbiznews/benben-wins-big-at-38th-awit-awards/127880/',
  },
  gmaAwit2026: {
    label: 'GMA News, Sep 16, 2026',
    url: 'https://www.gmanetwork.com/news/lifestyle/artandculture/1002544/awit-awards-2026-here-is-the-full-list-of-winners/story/',
  },
  abscbnEma2020: {
    label: 'ABS-CBN, Oct 8, 2020',
    url: 'https://www.abs-cbn.com/entertainment/10/08/20/benben-nominated-in-2020-mtv-europe-music-awards',
  },
  gmaTimesSquare2024: {
    label: 'GMA News, Dec 9, 2024',
    url: 'https://www.gmanetwork.com/news/showbiz/chikaminute/929419/ben-ben-lands-is-on-a-times-square-billboard/story/',
  },
  gmaSpotify2023: {
    label: 'GMA News, Dec 1, 2023',
    url: 'https://www.gmanetwork.com/news/lifestyle/hobbiesandactivities/890081/ben-amp-ben-is-the-philippines-no-1-streamed-opm-artist-on-spotify-for-2023/story/',
  },
  filipinoTimes2021: {
    label: 'The Filipino Times, Dec 12, 2021',
    url: 'https://filipinotimes.net/entertainment/2021/12/12/pinoy-band-benben-ranks-as-most-streamed-filipino-artist-on-spotify/',
  },
  philstarAaa2023: {
    label: 'Philstar, Dec 14, 2023',
    url: 'https://www.philstar.com/entertainment/music/2023/12/14/2318868/benben-scores-award-asia-artist-award-2023',
  },
  bandwagonMusicMatters2017: {
    label: 'Bandwagon, Aug 24, 2017',
    url: 'https://www.bandwagon.asia/articles/ben-ben-reese-lansangan-kiana-valenciano-to-perform-at-music-matters-2017',
  },
  rapplerClockenflap2022: {
    label: 'Rappler, Dec 10, 2022',
    url: 'https://www.rappler.com/entertainment/music/ben-ben-joins-arctic-monkeys-phoenix-clockenflap-march-2023-lineup/',
  },
  bandwagonNaTour2022: {
    label: 'Bandwagon, May 2, 2022',
    url: 'https://www.bandwagon.asia/articles/ben-ben-announce-us-and-canada-tour-this-september-concerts-los-angeles-toronto-san-francisco-calgary-tickets-price-sony-music-philippines-2022',
  },
  bandwagonNaReschedule2022: {
    label: 'Bandwagon, Sep 22, 2022',
    url: 'https://www.bandwagon.asia/articles/ben-ben-reschedule-san-francisco-and-los-angeles-concerts-tickets-us-canada-tour-sony-music-october-2022',
  },
  abscbn1mxToronto2023: {
    label: 'ABS-CBN, Sep 2, 2023',
    url: 'https://www.abs-cbn.com/entertainment/09/02/23/benben-bgyo-head-to-toronto-for-1mx',
  },
  tribune1mxSydney2023: {
    label: 'Daily Tribune, Oct 6, 2023',
    url: 'https://tribune.net.ph/2023/10/06/1mx-heads-to-sydney-with-world-class-pinoy-acts-maymay-kz-bini-and-benben',
  },
  bandwagonWorldTour2023: {
    label: 'Bandwagon, Jul 3, 2023',
    url: 'https://www.bandwagon.asia/articles/ben-ben-enter-new-chapter-with-could-be-something-announce-2023-world-tour',
  },
  abscbnSheeran2024: {
    label: 'ABS-CBN, Feb 27, 2024',
    url: 'https://www.abs-cbn.com/entertainment/2024/2/27/ben-ben-joins-ed-sheeran-s-ph-concert-as-special-guest-1310',
  },
  philstarSheeran2024: {
    label: 'Philstar, Mar 10, 2024',
    url: 'https://www.philstar.com/entertainment/music/2024/03/10/2339500/ed-sheeran-sings-maybe-night-benben-during-manila-2024-concert',
  },
  interaksyonMoa2024: {
    label: 'Interaksyon, Dec 15, 2024',
    url: 'https://interaksyon.philstar.com/celebrities/2024/12/15/288700/benbens-1st-arena-concert-goes-beyond-sound-with-3d-animation/',
  },
} satisfies Record<string, Source>
