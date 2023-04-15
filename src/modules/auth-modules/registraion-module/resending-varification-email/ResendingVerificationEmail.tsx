import React, { FC } from 'react'

import { PATH_ROUTE } from '@/common'
import { EmailSuccessMessage, ResendingVerificationLink } from '@/components/AuthComponents'
import { useConfirmationQuery } from '@/modules/auth-modules/registraion-module'
import { Preloader } from '@/ui'

type PropsType = { code: string | string[] | undefined }

export const ResendingVerificationEmail: FC<PropsType> = ({ code }) => {
  const { isLoading, isError } = useConfirmationQuery(code as string)

  if (isLoading) return <Preloader />

  return (
    <>
      {!isError && <EmailSuccessMessage />}
      {isError && <ResendingVerificationLink path={PATH_ROUTE.RESEND_FORM} />}
    </>
  )
}
