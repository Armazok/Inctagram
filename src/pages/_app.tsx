import '@/styles/globals.scss'

import { ApolloProvider } from '@apollo/client'
import '@/components/atoms/buttons/button.module.scss'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import 'uikit/dist/css/uikit.min.css'

import client from '@/apolloClient'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ApolloProvider>
  )
}
