import React from 'react'

import { getLayoutWithHeader } from '@/components/layout'
import { ResendVerificationEmail } from '@/modules/auth-modules/registraion-module'
import { NextPageWithLayout } from '@/pages/_app'

const ResendForm: NextPageWithLayout = () => {
  return <ResendVerificationEmail />
}

ResendForm.getLayout = getLayoutWithHeader
export default ResendForm
