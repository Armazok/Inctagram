import { useMutation } from '@tanstack/react-query'

import { passwordRecoveryAPI } from '@/modules/auth-modules/password-recovery-module/api/passwordRecovary'

export const useCreateNewPassword = () => {
  return useMutation({
    mutationKey: ['create-new-password'],
    mutationFn: passwordRecoveryAPI.createNewPassword,
  })
}
