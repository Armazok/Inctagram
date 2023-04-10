import React, { FC } from 'react'
import { PATH_ROUTE } from '@/common/constants/PATH_ROUTE'
import Preloader from '@/components/atoms/preloader/Preloader'
import EmailSuccessMessage from '@/components/AuthComponents/email-success-message/EmailSuccesMessage'
import ResendingVerificationLink from '@/components/AuthComponents/resending-verification-link/ResendingVerificationLink'
import { useConfirmationQuery } from '@/modules/auth-modules/registraion-module/resending-varification-email/api/confirmationRequest'

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
