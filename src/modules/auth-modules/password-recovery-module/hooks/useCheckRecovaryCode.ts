import { useEffect } from 'react'

import { useMutation } from '@tanstack/react-query'

import { passwordRecoveryAPI } from '@/modules/auth-modules/password-recovery-module/api/passwordRecovary'

export const useCheckRecoveryCode = (recoveryCode: string) => {
  const { isError, status, isSuccess, mutate } = useMutation({
    mutationKey: ['check-recovery-code'],
    mutationFn: passwordRecoveryAPI.checkRecoveryCode,
    onSuccess: data => {},
    onError: error => {
      console.log('error', error)
    },
  })

  useEffect(() => {
    recoveryCode && mutate({ recoveryCode })
  }, [recoveryCode])

  return { mutate, isError, isSuccess, status }
}
