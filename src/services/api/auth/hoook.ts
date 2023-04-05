import { useMutation } from '@tanstack/react-query'

import { authAPI } from '@/services/api/auth/authAPI'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authAPI.login,
    onMutate: variables => {},
    onSettled: variables => {},
    onError: variables => {},
    onSuccess: variables => {
      variables.data.accessToken
    },
  })
}

export const useCreateNewPasswordMutation = () => {
  return useMutation({
    mutationFn: authAPI.createNewPassword,
  })
}
