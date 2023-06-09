import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { sendCreateProfileRequest } from '@/modules/profile-modules/create-profile-module'

export const useCreateProfileMutation = (onSuccess?: any, setCustomError?: any, reset?: any) => {
  const {
    data,
    isLoading,
    variables,
    mutate: sendCreateProfile,
  } = useMutation({
    mutationFn: sendCreateProfileRequest,
    mutationKey: ['profileCreate'],
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
    sendCreateProfile,
    variables,
    isLoading,
  }
}
