import { useMutation } from '@tanstack/react-query'

import { passwordRecoveryAPI } from '@/modules/auth-modules/password-recovery-module'

export const useCreateNewPasswordMutation = () => {
  return useMutation({
    mutationFn: passwordRecoveryAPI.createNewPassword,
  })
}

export const useForgotPassword = (onSuccess: any, setCustomError?: any) => {
  const {
    isLoading,
    mutate: sendLinkPasswordRecovery,
    variables,
  } = useMutation({
    mutationKey: ['passwordRecovery'],
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
