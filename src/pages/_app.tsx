import { ReactElement, ReactNode, useState } from 'react'

import { ApolloProvider } from '@apollo/client'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import '@/components/atoms/buttons/button.module.scss'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import client from '@/apolloClient'
import { Private } from '@/components/privateRoute/privatRoute'
import { useUserStore } from '@/store'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient())
  const { accessToken } = useUserStore()

  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    // <Private accessToken={accessToken}>
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Hydrate>
      </QueryClientProvider>
    </ApolloProvider>
    // </Private>
  )
}
