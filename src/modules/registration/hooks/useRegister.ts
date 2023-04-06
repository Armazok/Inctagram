import { useMutation } from '@tanstack/react-query'

import { sendRegisterRequest } from '@/modules/registration/api/sendRegisterRequest'

export const useRegisterMutation = (setCustomError: any, setToggleModal: any, reset: any) => {
  const {
    data,
    isLoading,
    variables,
    mutate: sendRegisteredData,
  } = useMutation({
    mutationFn: sendRegisterRequest,
    mutationKey: ['registered'],
    onSuccess: () => {
      setToggleModal(true)
      reset()
    },
    onError: error => {
      setCustomError('email', `User with this ${error.response.data.messages[0].message}`)
    },
  })

  return {
    data,
    sendRegisteredData,
    variables,
    isLoading,
  }
}
