import '@/styles/globals.scss'
import '@/components/atoms/buttons/button.module.scss'

import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import 'uikit/dist/css/uikit.min.css'

import client from '@/apolloClient'
import { useState } from 'react'

import { QueryClientProvider, Hydrate, QueryClient } from '@tanstack/react-query'
import { Header } from '@/components/atoms/header/Header'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Header />
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </ApolloProvider>
  )
}
