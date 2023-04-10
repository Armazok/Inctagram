import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { sendLoginRequest } from '@/modules/auth-modules/login-module/login/api/loginAPI'

export const useLoginMutation = (
  onSuccess: () => void,
  setCustomError: () => void,
  reset: () => void
) => {
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
      reset()
      toast.success('Success')
    },
    onError: () => {
      setCustomError()
      toast.error('Error')
    },
  })

  return {
    data,
    sendLoginData,
    variables,
    isLoading,
  }
}
