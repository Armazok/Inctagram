import { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export const useGlobalForm = (schema: any) => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const setCustomError = (name: string, message: string) => {
    setError(name, {
      type: 'custom',
      message: message,
    })
  }

  return {
    register,
    reset,
    handleSubmit,
    errors,
    setCustomError,
  }
}

// interface Props {
//   accessToken: string | null
//   redirectIfFound?: boolean
//   redirectIfNotFound?: boolean
// }
//
// const usePrivateRoute = ({
//   accessToken,
//   redirectIfFound = false,
//   redirectIfNotFound = true,
// }: Props) => {
//   const router = useRouter()
//
//   useEffect(() => {
//     if (accessToken) {
//       if (redirectIfFound) {
//         router.push('/profile')
//       }
//     } else if (redirectIfNotFound) {
//       router.push('/auth/login')
//     }
//   }, [accessToken, redirectIfFound, redirectIfNotFound, router])
// }
//
// export default usePrivateRoute
