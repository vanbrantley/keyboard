import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import appStore from "../store/store";
import { AppStoreContext } from "../context/AppStoreContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Keyboard</title>
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppStoreContext.Provider value={appStore}>
          <Component {...pageProps} />
        </AppStoreContext.Provider>

      </ThemeProvider>

    </>
  )
}


