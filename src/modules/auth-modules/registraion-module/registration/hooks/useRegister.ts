import { useMutation } from '@tanstack/react-query'

import { sendRegisterRequest } from '@/modules/auth-modules/registraion-module'

interface RegisterType {
  onSuccess: () => void
  reset: () => void
  setError: (name: string, message: string) => void
}

export const useRegisterMutation = (
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
    mutationKey: ['registered'],
    onSuccess: () => {
      onSuccess()
      reset()
    },
    onError: () => {
      const message = `User with this email is already registered`

      setError('email', message)
    },
  })

  return {
    data,
    sendRegisteredData,
    variables,
    isLoading,
  }
}
