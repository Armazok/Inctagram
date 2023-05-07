import { useMutation } from '@tanstack/react-query'

import { ResponseError } from '@/common'
import { passwordRecoveryAPI } from '@/modules/auth-modules/password-recovery-module/api/passwordRecovary'

interface ForgotPasswordType {
  onSuccess: () => void
  setError: (name: string, message: string) => void
}
export const useForgotPassword = (
  onSuccess: ForgotPasswordType['onSuccess'],
  setError: ForgotPasswordType['setError']
) => {
  const {
    isLoading,
    mutate: sendLinkPasswordRecovery,
    variables,
  } = useMutation({
    mutationKey: ['password-recovery'],
    mutationFn: passwordRecoveryAPI.passwordRecoveryWithRecaptcha,
    onSuccess: () => {
      onSuccess()
    },
    onError: (error: ResponseError) => {
      const { message } = error?.response?.data?.messages[0]

      setError('email', message)
    },
  })

  return { isLoading, sendLinkPasswordRecovery, variables }
}
