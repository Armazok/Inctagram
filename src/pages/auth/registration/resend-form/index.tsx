import React from 'react'

import { getLayoutWithHeader } from '@/components/layout/LayoutWithHeader/LayoutWithHeader'
import { ResendVerificationEmail } from '@/modules'
import { NextPageWithLayout } from '@/pages/_app'

const ResendForm: NextPageWithLayout = () => {
  return <ResendVerificationEmail />
}

ResendForm.getLayout = getLayoutWithHeader
export default ResendForm
