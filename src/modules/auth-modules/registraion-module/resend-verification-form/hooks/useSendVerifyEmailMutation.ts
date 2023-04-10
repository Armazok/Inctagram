import { useMutation } from '@tanstack/react-query'

import { sendVerificationLink } from '@/modules/auth-modules/registraion-module/resend-verification-form/api/sendVerificationLink'

export const useSendVerifyEmailMutation = (setError, reset, push) => {
  const { isLoading, mutate: resendVerification } = useMutation({
    mutationFn: sendVerificationLink,
    onSuccess: () => {
      reset()
      push('/')
    },
    onError: error => {
      setError('email', error?.response?.data?.messages[0]?.message)
    },
  })

  return {
    isLoading,
    resendVerification,
  }
}
