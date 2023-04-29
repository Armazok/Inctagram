import React from 'react'

import { useRouter } from 'next/router'

import { PATH_ROUTE } from '@/common/constants/PATH_ROUTE'
import { ResendingVerificationLink } from '@/components/auth-components'
import { CreateNewPasswordPage } from '@/modules/auth-modules/password-recovery-module'
import { useCheckRecoveryCode } from '@/modules/auth-modules/password-recovery-module/hooks/useCheckRecovaryCode'
import { Preloader } from '@/ui'

export const Recovery = () => {
  const router = useRouter()

  const recoveryCode = router.query && (router.query.code as string)

  const { isError, status, isSuccess } = useCheckRecoveryCode(recoveryCode)

  if (status === 'loading') return <Preloader />
  if (isError) return <ResendingVerificationLink path={PATH_ROUTE.RECOVERY_RESEND_FORM} />
  if (isSuccess) return <CreateNewPasswordPage recoveryCode={recoveryCode} />

  return <></>
}
