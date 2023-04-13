import { useEffect } from 'react'

import { useRouter } from 'next/router'

interface PrivateProps {
  accessToken: string | null
  children: JSX.Element
  redirectIfFound?: string
  redirectIfNotFound?: string
}

// export const Private = ({
//   accessToken,
//   children,
//   redirectIfNotFound = '/',
//   redirectIfFound = '/profile',
// }: PrivateProps) => {
//   const router = useRouter()
//
//   useEffect(() => {
//     if (!accessToken && redirectIfNotFound) {
//       router.push(redirectIfNotFound)
//     } else if (accessToken && redirectIfFound) {
//       router.push(redirectIfFound)
//     }
//   }, [accessToken, redirectIfFound, redirectIfNotFound, router])
//
//   return <>{accessToken ? children : null}</>
// }

export const Private = ({ accessToken, children }: PrivateProps) => {
  const router = useRouter()

  useEffect(() => {
    if (accessToken) {
      router.push('/')
    }
  }, [accessToken, router])

  return <>{accessToken ? children : null}</>
}
