import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { sendLoginRequest } from '@/modules/auth-modules/login-module/login/api/loginAPI'

type LoginMutation = {
  onSuccess: () => void
  setCustomError: () => void
  reset: () => void
}

export const useLoginMutation = (
  onSuccess: LoginMutation['onSuccess'],
  setCustomError: LoginMutation['setCustomError'],
  reset: LoginMutation['reset']
) => {
  const client = useQueryClient()
  const {
    data,
    isLoading,
    variables,
    mutate: sendLoginData,
  } = useMutation({
    mutationFn: sendLoginRequest,
    mutationKey: ['login'],
    onSuccess: data => {
      const { accessToken } = data.data

      localStorage.setItem('accessToken', accessToken)
      onSuccess()
      reset()

      client.invalidateQueries(['me'])
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
