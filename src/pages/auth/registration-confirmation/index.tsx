import { useRouter } from 'next/router'

import { getLayoutWithHeader } from '@/components/layout/LayoutWithHeader/LayoutWithHeader'
import { ResendingVerificationEmail } from '@/modules'
import { NextPageWithLayout } from '@/pages/_app'

const RegistrationConfirmation: NextPageWithLayout = () => {
  const {
    query: { code },
  } = useRouter()

  return <ResendingVerificationEmail code={code} />
}

RegistrationConfirmation.getLayout = getLayoutWithHeader
export default RegistrationConfirmation
