import React from 'react'
import { useConfirmationQuery } from '@/modules/auth-modules/registraion-module/resending-varification-email/api/confirmationRequest'
import { useRouter } from 'next/router'
import Preloader from '@/components/atoms/preloader/Preloader'
import EmailSuccessMessage from '@/components/AuthComponents/email-success-message/EmailSuccesMessage'
import ResendingVerificationLink from '@/components/AuthComponents/resending-verification-link/ResendingVerificationLink'
import { PATH_ROUTE } from '@/common/constants/PATH_ROUTE'

const ResendingVerificationEmail = () => {
  const {
    query: { code },
  } = useRouter()
  const { isLoading, isError } = useConfirmationQuery(code as string)

  if (isLoading) return <Preloader />
  return (
    <>
      {!isError && <EmailSuccessMessage />}
      {isError && <ResendingVerificationLink path={PATH_ROUTE.RESEND_FORM} />}
    </>
  )
}

export default ResendingVerificationEmail
