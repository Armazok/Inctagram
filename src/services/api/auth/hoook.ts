import { useMutation } from '@tanstack/react-query'

import { authAPI } from '@/services/api/auth/authAPI'
import { useUserStore } from '@/store'

const { setIsModalOpen } = useUserStore()

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authAPI.login,
  })
}

export const useForgotPassMutation = () => {
  return useMutation({
    mutationFn: authAPI.passwordRecovery,
    onSuccess: () => {
      setIsModalOpen(true)
    },
  })
}

export const useCreateNewPasswordMutation = () => {
  return useMutation({
    mutationFn: authAPI.createNewPassword,
  })
}
