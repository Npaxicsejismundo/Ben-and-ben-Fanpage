import type { Member } from './types'
import { SOURCES as S } from './sources'
import { memberPhotos } from './images'

/**
 * Facts are paraphrased from the members' own interviews and posts, each with a
 * source. Only one verbatim quote is verified (Jam's announcement); add more
 * only after checking the exact wording at the source.
 *
 * Signature colors are a design assignment for this fan site, drawn from the
 * band's artwork. They are not colors the members chose.
 */
export const members: Member[] = [
  {
    id: 'paolo',
    name: 'Paolo',
    fullName: 'Paolo Benjamin Guico',
    role: 'Vocals, acoustic guitar',
    plays: 'Acoustic guitar',
    bandRole: 'Lead vocals, songwriter, co-founder',
    since: '2016, with his twin Miguel',
    roleSources: [S.wikipedia, S.manilaBulletin2022],
    personality: 'The songwriter who roots for the underdog.',
    color: {
      name: 'Lamp gold',
      hex: '#D9A12B',
      ink: 'dark',
      origin: 'The glowing lamp at the end of the road on the Limasawa Street cover.',
    },
    facts: [
      {
        text: 'Says guitar and singing chose him, not the other way around. He plays them to get his songs out.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: 'Relates to underdogs, which is why his Game of Thrones pick is Brienne.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: 'His first concert was Urbandub, at Alabang Town Center.',
        sources: [S.esquire2022],
      },
    ],
    photo: memberPhotos.paolo,
  },
  {
    id: 'miguel',
    name: 'Miguel',
    fullName: 'Miguel Benjamin Guico',
    role: 'Vocals, acoustic guitar',
    plays: 'Acoustic guitar',
    bandRole: 'Lead vocals, songwriter, co-founder',
    since: '2016, with his twin Paolo',
    roleSources: [S.wikipedia, S.manilaBulletin2022],
    personality: 'The steady one who keeps everyone talking.',
    color: {
      name: 'Limasawa cobalt',
      hex: '#2A4BA8',
      ink: 'light',
      origin: 'The deep blue of Limasawa Street, the other half of its blue-and-gold pair. Twins come in twos.',
    },
    facts: [
      {
        text: 'He and Paolo had a high-school rock band called Deadline. Their dad had band shirts made, in Comic Sans.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: 'Picked up video editing in a college org and still makes quick band posters, sometimes at 2AM.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: 'Says he is usually the one who mediates when the band disagrees.',
        sources: [S.pep2025],
      },
    ],
    photo: memberPhotos.miguel,
  },
  {
    id: 'poch',
    name: 'Poch',
    fullName: 'Poch Barretto',
    role: 'Lead guitar',
    plays: 'Lead guitar, electric and acoustic',
    bandRole: 'Backing vocals; produced the 2026 anthology Nine',
    since: 'May 10, 2017',
    roleSources: [S.wikipedia, S.bandwagonDoodles2019, S.bandwagonNine2026],
    personality: 'The detail-loving sound architect.',
    color: {
      name: 'Pebble teal',
      hex: '#4E9EAF',
      ink: 'dark',
      origin: 'The teal accent on the Pebble House, Vol. 1: Kuwaderno cover.',
    },
    facts: [
      {
        text: 'Football was his first love. His mom, a guitarist, taught him acoustic guitar when he was nine.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: 'Loves watches and Rubik’s cubes. His favourite Beatle is George Harrison.',
        sources: [S.bandwagonDoodles2019, S.esquire2022],
      },
      {
        text: 'Led the full production of the 2026 anthology Nine.',
        sources: [S.bandwagonNine2026],
      },
    ],
    photo: memberPhotos.poch,
  },
  {
    id: 'keifer',
    name: 'Keifer',
    fullName: 'Keifer Cabugao',
    role: 'Violin',
    plays: 'Violin',
    bandRole: 'Backing vocals',
    since: 'May 10, 2017',
    roleSources: [S.wikipedia, S.bandwagonDoodles2019],
    personality: 'Candid, and glad he stuck with it.',
    color: {
      name: 'Clay terracotta',
      hex: '#A85B32',
      ink: 'light',
      origin: 'The warm tan-brown that frames the albums on the band’s official website.',
    },
    facts: [
      {
        text: 'Wanted guitar lessons, but his mom signed him up for violin instead. An uncle told him to stick with it.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: 'His favourite album is Bon Iver’s self-titled record.',
        sources: [S.esquire2022],
      },
      {
        text: 'On band life: they are not perfect and they do fight, but their love for each other runs deeper.',
        sources: [S.pep2025],
      },
    ],
    photo: memberPhotos.keifer,
  },
  {
    id: 'pat',
    name: 'Pat',
    fullName: 'Pat Lasaten',
    role: 'Keyboards',
    plays: 'Keyboards',
    bandRole: 'Keys, and by her own account the organizer who loves a timeline',
    since: 'May 10, 2017',
    roleSources: [S.wikipedia, S.bandwagonDoodles2019],
    personality: 'The planner who keeps the band on time.',
    color: {
      name: 'Traveller periwinkle',
      hex: '#6F8DCB',
      ink: 'dark',
      origin: 'The periwinkle sky of The Traveller Across Dimensions.',
    },
    facts: [
      {
        text: 'Her musician dad pushed her into piano lessons. She fell for the instrument in high school.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: 'A self-described organizer who loves timelines and getting things done. Also took up longboarding.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: 'The first song she learned to play was a Hannah Montana tune.',
        sources: [S.esquire2022],
      },
    ],
    photo: memberPhotos.pat,
  },
  {
    id: 'agnes',
    name: 'Agnes',
    fullName: 'Agnes Reoma',
    role: 'Bass',
    plays: 'Bass guitar',
    bandRole: 'Bass; led the song “Lunod” on Kuwaderno',
    since: 'May 10, 2017',
    roleSources: [S.wikipedia, S.bandwagonDoodles2019, S.nme2021],
    personality: 'Laid-back, and learns by doing.',
    color: {
      name: 'Hillside olive',
      hex: '#8A8150',
      ink: 'dark',
      origin: 'The grassy hillside on the Saranggola cover.',
    },
    facts: [
      {
        text: 'Started on guitar, said she could play bass in college, and kept getting recruited to play it.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: 'Led the song “Lunod” on Pebble House, Vol. 1: Kuwaderno.',
        sources: [S.nme2021],
      },
      {
        text: 'The 2022 “Paninindigan Kita” video retells her and Pat’s real love story. The two married in 2024.',
        sources: [S.bandwagonPaninindigan2022, S.abscbnWedding2024],
      },
    ],
    photo: memberPhotos.agnes,
  },
  {
    id: 'toni',
    name: 'Toni',
    fullName: 'Toni Muñoz',
    role: 'Percussion, vocals',
    plays: 'Percussion: congas, djembe, shakers, tambourine',
    bandRole: 'Lead and backing vocals; co-wrote “Sugat” with Paolo',
    since: 'May 10, 2017',
    roleSources: [S.wikipedia, S.bandwagonDoodles2019, S.gmaSugat2021],
    personality: 'The composer behind the camera.',
    color: {
      name: 'Pebble green',
      hex: '#4F7244',
      ink: 'light',
      origin: 'The green retro lettering of the Pebble House title.',
    },
    facts: [
      {
        text: 'Studied composition at UP. Her percussion minor is where she found her musical voice.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: 'Always carries a camera, even onstage.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: '“Sugat,” co-written with Paolo, began as a love letter to herself during a stretch of self-doubt.',
        sources: [S.gmaSugat2021],
      },
    ],
    photo: memberPhotos.toni,
  },
  {
    id: 'andrew',
    name: 'Andrew',
    fullName: 'Andrew de Pano',
    role: 'Percussion',
    plays: 'Percussion',
    bandRole: 'Backing vocals; arranged and produced “Pasalubong”',
    since: 'May 10, 2017',
    roleSources: [S.wikipedia, S.bandwagonDoodles2019, S.bandwagonPasalubong2021],
    personality: 'Says yes first, figures it out after.',
    color: {
      name: 'River stone',
      hex: '#8E857B',
      ink: 'dark',
      origin: 'The river boulders on the cover of Nine.',
    },
    facts: [
      {
        text: 'Told the twins he could play percussion before he actually could, then bought an instrument. Still learning on the job, he says.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: 'Cooks, did theater, games, mountain-bikes, and used to restore guitars.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: 'Arranged and produced “Pasalubong” with Moira Dela Torre.',
        sources: [S.bandwagonPasalubong2021],
      },
    ],
    photo: memberPhotos.andrew,
  },
  {
    id: 'jam',
    name: 'Jam',
    fullName: 'Jam Villanueva',
    role: 'Drums',
    plays: 'Drums',
    bandRole: 'Drummer of the nine-piece lineup',
    since: '2017–2026; final show October 2, 2026',
    roleSources: [S.wikipedia, S.billboardJam2025, S.dzrhJam2026],
    tenure: '2017–2026',
    personality: 'The film lover. And, she says, the kite in “Saranggola.”',
    color: {
      name: 'Kite yellow',
      hex: '#F2CF3A',
      ink: 'dark',
      origin: 'The yellow lettering on the Saranggola cover. Jam revealed she is the kite in that song.',
    },
    facts: [
      {
        text: 'Her parents say she started drumming at four; she remembers seven. Her first kit was a reward for a perfect computer exam in Grade 3.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: 'Film is her second love. Hot Fuzz is what got her into it.',
        sources: [S.bandwagonDoodles2019],
      },
      {
        text: '“Maybe the Night,” the band’s first song as a nine-piece, was arranged in her attic in 2017.',
        sources: [S.bandwagonNine2026],
      },
    ],
    quote: {
      text: 'Next year, 2026, will be my last year with the band.',
      source: S.gmaJam2025,
    },
    note: {
      title: 'Salamat, Jam',
      body: 'In December 2025, Jam shared that 2026 would be her final year with the band. Her last show as part of the nine-piece was Saranggola: The Concert at the Smart Araneta Coliseum on October 2, 2026.',
      sources: [S.billboardJam2025, S.dzrhJam2026, S.inquirerSaranggola2026],
    },
    photo: memberPhotos.jam,
  },
]
