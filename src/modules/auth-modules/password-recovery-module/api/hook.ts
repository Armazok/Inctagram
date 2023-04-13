import { useMutation } from '@tanstack/react-query'

import { passwordRecoveryAPI } from '@/modules/auth-modules/password-recovery-module/api/passwordRecovary'

export const useCreateNewPasswordMutation = () => {
  return useMutation({
    mutationFn: passwordRecoveryAPI.createNewPassword,
  })
}

export const useForgotPassword = (setCustomError: any, reset: any, push: any) => {
  const { isLoading, mutate: sendLinkPasswordRecovery } = useMutation({
    mutationFn: passwordRecoveryAPI.passwordRecovery,
    onSuccess: () => {
      reset()
      push('/')
    },
    onError: error => {
      // @ts-ignore
      setCustomError('email', error.response.data.messages[0].message)
    },
  })

  return { isLoading, sendLinkPasswordRecovery }
}

// export const useRecoveryEmailResending = (setCustomError: any, reset: any, push: any) => {
//   const { isLoading, mutate: resendRecoverCode } = useMutation({
//     mutationFn: passwordRecoveryAPI.passwordRecoveryEmailResending,
//     onSuccess: () => {
//       reset()
//       push('/')
//     },
//     onError: error => {
//       // @ts-ignore
//       setCustomError('email', error.response.data.messages[0].message)
//     },
//   })
//
//   return {
//     isLoading,
//     resendRecoverCode,
//   }
// }
