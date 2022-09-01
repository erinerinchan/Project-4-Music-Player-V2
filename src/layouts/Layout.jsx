import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Loader from '../components/Loader'
import Player from './Player'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Posters from './Posters'

function Layout({ children, layoutOptions }) {
  const router = useRouter()
  const isAuthSignin = router.pathname === '/auth/signin'
  const { status } = useSession({
    required: !isAuthSignin,
    onUnauthenticated() {
      if (!isAuthSignin) {
        router.push('/auth/signin')
      }
    }
  })

  if (status === 'loading') return <Loader />
  if (layoutOptions?.noLayout) return <main>{children}</main>

  return (
    <>
      <Sidebar />
      <Navbar layoutOptions={layoutOptions} />
      <div id="main" className="ml-[90px] mb-[74px] h-[calc(100vh-74px-72px)]">
        <div id="content-wrapper" className="mt-[72px]">
          {layoutOptions?.posters && <Posters />}
          {children}
        </div>
      </div>
      <Player />
    </>
  )
}

export default Layout
