import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Dashboard from '../components/Dashboard'
import Loader from '../components/Loader'

export default function Home() {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin')
    }
  })

  // Loading animation...
  if (status === 'loading') {
    return <Loader />
  }

  return (
    <div>
      <Head>
        <title>Spotify - Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard />
    </div>
  )
}
