import { FC } from 'react'

import { useRouter } from 'next/router'

import { ResendingVerificationEmail } from '@/modules'

const RegistrationConfirmation: FC = () => {
  const {
    query: { code },
  } = useRouter()

  return <ResendingVerificationEmail code={code} />
}

export default RegistrationConfirmation
