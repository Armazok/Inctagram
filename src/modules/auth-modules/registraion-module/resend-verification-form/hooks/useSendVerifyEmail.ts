import { useMutation } from '@tanstack/react-query'

import { PATH_ROUTE, ResponseError } from '@/common'
import { sendVerificationLink } from '@/modules/auth-modules/registraion-module'

interface VerifyType {
  reset: () => void
  push: (path: string) => void
  setError: (name: string, message: string) => void
}

export const useSendVerifyEmail = (
  setError: VerifyType['setError'],
  reset: VerifyType['reset'],
  push: VerifyType['push']
) => {
  const { isLoading, mutate: resendVerification } = useMutation({
    mutationFn: sendVerificationLink,
    onSuccess: () => {
      reset()
      push(PATH_ROUTE.LOGIN)
    },
    onError: (error: ResponseError) => {
      const message = error?.response?.data?.messages

      message?.forEach(({ message, field }) => {
        setError(field, message)
      })
    },
  })

  return {
    isLoading,
    resendVerification,
  }
}
