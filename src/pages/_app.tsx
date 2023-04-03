import '@/styles/globals.scss'
import '@/components /atoms/buttons/button.module.scss'

import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import 'uikit/dist/css/uikit.min.css'

import client from '@/apolloClient'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
