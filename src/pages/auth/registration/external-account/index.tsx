import React from 'react'

import { useRouter } from 'next/router'

import { getLayoutWithHeader } from '@/components/layout'
import { ExternalAccount } from '@/modules/auth-modules/registraion-module'
import { NextPageWithLayout } from '@/pages/_app'

const ExternalAccountPage: NextPageWithLayout = () => {
  const {
    query: { code, email },
  } = useRouter()

  return <ExternalAccount code={code as string} email={email as string} />
}

ExternalAccountPage.getLayout = getLayoutWithHeader
export default ExternalAccountPage
