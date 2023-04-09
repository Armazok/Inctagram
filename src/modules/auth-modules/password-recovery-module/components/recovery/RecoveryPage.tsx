import React from 'react'

import {useQuery} from '@tanstack/react-query'
import {useRouter} from 'next/router'

import {PATH_ROUTE} from '@/common/constants/PATH_ROUTE'
import Preloader from '@/components/atoms/preloader/Preloader'
import ResendingVerificationLink
  from '@/components/AuthComponents/resending-verification-link/ResendingVerificationLink'
import {noRefetch} from '@/helpers/no-refetch'
import {passwordRecoveryAPI} from '@/modules/auth-modules/password-recovery-module/api/passwordRecovary'
import {
  CreateNewPasswordPage
} from '@/modules/auth-modules/password-recovery-module/components/recovery/create-new-password/CreateNewPasswordPage'

export const RecoveryPage = () => {
  const router = useRouter()

  const recoveryCode = router.query && (router.query.code as string)

  const { isError, status, isSuccess } = useQuery({
    queryKey: ['recovery'],
    queryFn: async () => {
      const response = await passwordRecoveryAPI.checkRecoveryCode({ recoveryCode })
      return response.data
    },
    enabled: !!recoveryCode,
    retry: false,
    ...noRefetch,
  })

  debugger
  if (status === 'loading') return <Preloader />
  if (isError) return <ResendingVerificationLink path={PATH_ROUTE.RECOVERY_RESEND_FORM} />
  if (isSuccess) return <CreateNewPasswordPage recoveryCode={recoveryCode} />

  return <></>
}
