import React, { FC } from 'react'

import { PATH_ROUTE } from '@/common'
import { ResendingVerificationLink } from '@/components/auth-components'
import {
  EmailSuccessMessage,
  useSendConfirmationCode,
} from '@/modules/auth-modules/registraion-module'
import { Preloader } from '@/ui'

type PropsType = { code: string }

export const ResendingVerificationEmail: FC<PropsType> = ({ code }) => {
  const { isLoading, isError, isSuccess } = useSendConfirmationCode(code)

  if (isLoading) return <Preloader />

  return (
    <>
      {isSuccess && <EmailSuccessMessage />}
      {isError && <ResendingVerificationLink path={PATH_ROUTE.RESEND_FORM} />}
    </>
  )
}
