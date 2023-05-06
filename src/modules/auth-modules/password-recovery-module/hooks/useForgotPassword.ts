import { useMutation } from '@tanstack/react-query'

import { passwordRecoveryAPI } from '@/modules/auth-modules/password-recovery-module/api/passwordRecovary'

export const useForgotPassword = (onSuccess: any, setCustomError?: any) => {
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
    onError: error => {
      // @ts-ignore
      setCustomError('email', error.response.data.messages[0].message)
    },
  })

  return { isLoading, sendLinkPasswordRecovery, variables }
}
