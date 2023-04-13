import React from 'react'

import AccountLayout from '@/components/account/account-layout/AccountLayout'
import { getGlobalLayout } from '@/components/layout/GlobalLayout/GlobalLayout'
import { SettingsProfile } from '@/modules'
import { NextPageWithLayout } from '@/pages/_app'

const EditProfileData: NextPageWithLayout = () => {
  return (
    <AccountLayout>
      <SettingsProfile />
    </AccountLayout>
  )
}

EditProfileData.getLayout = getGlobalLayout
export default EditProfileData
