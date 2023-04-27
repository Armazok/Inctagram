import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { PATH_ROUTE } from '@/common/constants/PATH_ROUTE'
import { noRefetch } from '@/common/helpers/no-refetch'
import { ResendingVerificationLink } from '@/components/auth-components'
import {
  CreateNewPasswordPage,
  passwordRecoveryAPI,
} from '@/modules/auth-modules/password-recovery-module'
import { Preloader } from '@/ui'

export const Recovery = () => {
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

  if (status === 'loading') return <Preloader />
  if (isError) return <ResendingVerificationLink path={PATH_ROUTE.RECOVERY_RESEND_FORM} />
  if (isSuccess) return <CreateNewPasswordPage recoveryCode={recoveryCode} />

  return <></>
}
