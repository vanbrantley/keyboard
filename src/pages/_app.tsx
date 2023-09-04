import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import appStore from "../store/store";
import { AppStoreContext } from "../context/AppStoreContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Keyboard</title>
      </Head>

      <AppStoreContext.Provider value={appStore}>
        <Component {...pageProps} />
      </AppStoreContext.Provider>

    </>
  )
}


