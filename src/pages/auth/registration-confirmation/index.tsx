import { useRouter } from 'next/router'

import { getLayoutWithHeader } from '@/components/layout'
import { ResendingVerificationEmail } from '@/modules/auth-modules/registraion-module'
import { NextPageWithLayout } from '@/pages/_app'

const RegistrationConfirmation: NextPageWithLayout = () => {
  const {
    query: { code },
  } = useRouter()

  return <ResendingVerificationEmail code={code} />
}

RegistrationConfirmation.getLayout = getLayoutWithHeader
export default RegistrationConfirmation
