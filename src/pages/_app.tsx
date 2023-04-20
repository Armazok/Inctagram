import { ReactElement, ReactNode, useState } from 'react'

import { ApolloProvider } from '@apollo/client'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import client from '@/apolloClient'
import '../../src/styles/nprogress.css'
import { useLoader } from '@/common/hooks/useLoader/useLoader'
import AuthProtection from '@/components/AuthComponents/auth-protection/AuthProtection'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient())

  useLoader()

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthProtection>{getLayout(<Component {...pageProps} />)}</AuthProtection>
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
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ApolloProvider>
  )
}
