import Head from 'next/head'
import Body from '../components/dashboard/Body'
import Right from '../layouts/Right'

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify - Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex bg-black lg:pb-24">
        <Body />
        <Right />
      </main>
    </>
  )
}

Home.layoutOptions = {
  search: true,
  posters: true
}
