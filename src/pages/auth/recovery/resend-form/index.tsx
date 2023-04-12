import React from 'react'

import { getLayoutWithHeader } from '@/components/layout/LayoutWithHeader/LayoutWithHeader'
import { ResendRecoveryForm } from '@/modules'
import { NextPageWithLayout } from '@/pages/_app'

const ResendForm: NextPageWithLayout = () => {
  return <ResendRecoveryForm />
}

ResendForm.getLayout = getLayoutWithHeader
export default ResendForm
