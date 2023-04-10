import { useMutation } from '@tanstack/react-query'

import { sendVerificationLink } from '@/modules/auth-modules/registraion-module/resend-verification-form/api/sendVerificationLink'

interface VerifyType {
  reset: () => void
  push: (path: string) => void
  setError: (name: string, message: string) => void
}

export const useSendVerifyEmailMutation = (
  setError: VerifyType['setError'],
  reset: VerifyType['reset'],
  push: VerifyType['push']
) => {
  const { isLoading, mutate: resendVerification } = useMutation({
    mutationFn: sendVerificationLink,
    onSuccess: () => {
      reset()
      push('/')
    },
    onError: () => {
      const message = `Email isn't valid or already confirmed`

      setError('email', message)
    },
  })

  return {
    isLoading,
    resendVerification,
  }
}
