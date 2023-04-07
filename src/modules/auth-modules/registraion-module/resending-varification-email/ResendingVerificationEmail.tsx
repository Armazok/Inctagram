import React, { FC } from 'react'

import { jsx } from '@storybook/theming'

import IntrinsicAttributes = jsx.JSX.IntrinsicAttributes
import { PATH_ROUTE } from '@/common/constants/PATH_ROUTE'
import Preloader from '@/components/atoms/preloader/Preloader'
import EmailSuccessMessage from '@/components/AuthComponents/email-success-message/EmailSuccesMessage'
import ResendingVerificationLink from '@/components/AuthComponents/resending-verification-link/ResendingVerificationLink'
import { useConfirmationQuery } from '@/modules/auth-modules/registraion-module/resending-varification-email/api/confirmationRequest'

type resType = {
  code: string | string[] | undefined
}

const ResendingVerificationEmail: FC<resType> = ({ code }) => {
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
