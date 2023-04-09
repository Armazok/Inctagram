import { useMutation } from '@tanstack/react-query'

import { sendLoginRequest } from '@/modules/auth-modules/login-module/login/api/loginAPI'
import { sendRegisterRequest } from '@/modules/auth-modules/registraion-module/registration/api/sendRegisterRequest'

export const useLoginMutation = (onSuccess?: any, setCustomError?: any, reset?: any) => {
  const {
    data,
    isLoading,
    variables,
    mutate: sendLoginData,
  } = useMutation({
    mutationFn: sendLoginRequest,
    mutationKey: ['login'],
    onSuccess: () => {
      onSuccess()

      // reset()
    },
    onError: error => {
      // @ts-ignore
      setCustomError('email', `${error?.response?.data?.messages[0].message}`)
      // setCustomError()
    },
  })

  return {
    data,
    sendLoginData,
    variables,
    isLoading,
  }
}
