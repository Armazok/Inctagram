import { useMutation, useQuery } from '@tanstack/react-query'

import { noRefetch } from '@/helpers/no-refetch'
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

export const useRegistrationEmailResendingMutation = (email: string) => {
  return useMutation({
    mutationFn: () => authAPI.registrationEmailResending({ email }),
  })
}

export const useRegistrationConfirmationQuery = (confirmationCode: string) => {
  return useQuery({
    queryKey: ['regConfirmation'],
    queryFn: () => authAPI.registrationConfirmation({ confirmationCode }),
    enabled: confirmationCode !== 'undefined',
    retry: false,
    ...noRefetch,
  })
}
