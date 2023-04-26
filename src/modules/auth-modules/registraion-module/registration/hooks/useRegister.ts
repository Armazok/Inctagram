import { useMutation } from '@tanstack/react-query'

import { ResponseError } from '@/common'
import { sendRegisterRequest } from '@/modules/auth-modules/registraion-module'

interface RegisterType {
  onSuccess: () => void
  reset: () => void
  setError: (name: string, message: string) => void
}

export const useRegister = (
  onSuccess: RegisterType['onSuccess'],
  reset: RegisterType['reset'],
  setError: RegisterType['setError']
) => {
  const {
    data,
    isLoading,
    variables,
    mutate: sendRegisteredData,
  } = useMutation({
    mutationFn: sendRegisterRequest,
    onSuccess: () => {
      onSuccess()
      reset()
    },
    onError: (error: ResponseError) => {
      const message = error?.response?.data?.messages

      message?.forEach(({ message, field }) => {
        setError(field, message)
      })
    },
  })

  return {
    data,
    sendRegisteredData,
    variables,
    isLoading,
  }
}
