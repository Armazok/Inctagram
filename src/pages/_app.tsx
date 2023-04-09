import { useState } from 'react'

import { ApolloProvider } from '@apollo/client'
import { QueryClientProvider, Hydrate, QueryClient } from '@tanstack/react-query'
import '@/styles/globals.scss'
import '@/components/atoms/buttons/button.module.scss'
import type { AppProps } from 'next/app'

import client from '@/apolloClient'
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
