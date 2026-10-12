import { Hero } from '../sections/Hero'
import { Story } from '../sections/Story'
import { Members } from '../sections/Members'
import { Discography } from '../sections/Discography'
import { Singles } from '../sections/Singles'
import { TopSongs } from '../sections/TopSongs'
import { Achievements } from '../sections/Achievements'
import { Live } from '../sections/Live'
import { Liwanag } from '../sections/Liwanag'

export function Home({ heroReady }: { heroReady: boolean }) {
  return (
    <>
      <Hero ready={heroReady} />
      <Story />
      <Members />
      <Discography />
      <Singles />
      <TopSongs />
      <Achievements />
      <Live />
      <Liwanag />
    </>
  )
}
