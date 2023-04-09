import { FC } from 'react'

import { useRouter } from 'next/router'

import ResendingVerificationEmail from '@/modules/auth-modules/registraion-module/resending-varification-email/ResendingVerificationEmail'

const RegistrationConfirmation: FC = () => {
  const {
    query: { code },
  } = useRouter()

  return <ResendingVerificationEmail code={code} />
}

export default RegistrationConfirmation
