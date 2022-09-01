import '@/styles/globals.css'

import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'
import { appWithTranslation } from 'next-i18next'

import appWithSession from '@/hoc/appWithSession'
import Layout from '@/layouts/Layout'
import { SpotifyProvider } from '@/contexts/spotify'

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <SessionProvider session={session}>
        <RecoilRoot>
          <SpotifyProvider>
            <Layout layoutOptions={Component?.layoutOptions}>
              <Component {...pageProps} />
            </Layout>
            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </SpotifyProvider>
        </RecoilRoot>
      </SessionProvider>
    </>
  )
}

export default appWithSession(appWithTranslation(MyApp))
