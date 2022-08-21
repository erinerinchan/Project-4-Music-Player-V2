import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'
import { appWithTranslation } from 'next-i18next'

import appWithSession from '@/hoc/appWithSession'

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
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
      </RecoilRoot>
    </SessionProvider>
  )
}

export default appWithSession(appWithTranslation(MyApp))
