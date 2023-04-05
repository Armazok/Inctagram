import { useMutation } from '@tanstack/react-query'
import { sendVerificationLink } from '@/modules/resend-verification-form/api/sendVerificationLink'

export const useSendVerifyEmailMutation = (setCustomError: any, reset: any, push: any) => {
  const { isLoading, mutate: resendVerification } = useMutation({
    mutationFn: sendVerificationLink,
    onSuccess: () => {
      reset()
      push('/')
    },
    onError: error => {
      setCustomError('email', error.response.data.messages[0].message)
    },
  })

  return {
    isLoading,
    resendVerification,
  }
}
