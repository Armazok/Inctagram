import React from 'react'

import { getLayoutWithHeader } from '@/components/layout'
import { ResendRecoveryForm } from '@/modules/auth-modules/password-recovery-module'
import { NextPageWithLayout } from '@/pages/_app'

const ResendForm: NextPageWithLayout = () => {
  return <ResendRecoveryForm />
}

ResendForm.getLayout = getLayoutWithHeader
export default ResendForm
