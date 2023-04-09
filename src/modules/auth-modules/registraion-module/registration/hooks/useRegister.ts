import { useMutation } from '@tanstack/react-query'

import { sendRegisterRequest } from '@/modules/auth-modules/registraion-module/registration/api/sendRegisterRequest'

export const useRegisterMutation = (onSuccess, reset, setError) => {
  const {
    data,
    isLoading,
    variables,
    mutate: sendRegisteredData,
  } = useMutation({
    mutationFn: sendRegisterRequest,
    mutationKey: ['registered'],
    onSuccess: () => {
      onSuccess()
      reset()
    },
    onError: error => {
      setError('email', error?.response?.data.messages[0].message)
    },
  })

  return {
    data,
    sendRegisteredData,
    variables,
    isLoading,
  }
}
