import React from 'react'

import { AccountLayout } from '@/components/account'
import { getGlobalLayout } from '@/components/layout'
import { SettingsProfile } from '@/modules/profile-modules/settings-edit-profile-module'
import { NextPageWithLayout } from '@/pages/_app'

const index: NextPageWithLayout = () => {
  return (
    <AccountLayout>
      <SettingsProfile />
    </AccountLayout>
  )
}

index.getLayout = getGlobalLayout
export default index
