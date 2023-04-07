import 'reflect-metadata'

import { Layout } from '@/Layout/Layout'
import { useApollo } from '@/contexts/shared/infrastructure/apolloClient'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider, createTheme } from '@mui/material'
import type { AppProps } from 'next/app'
import '../I18n'

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ThemeProvider>
  )
}
