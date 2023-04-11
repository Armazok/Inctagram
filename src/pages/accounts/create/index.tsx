import React from 'react'

import { SettingsSchemaType } from '@/common/constants'
import AccountLayout from '@/components/account/account-layout/AccountLayout'
import SettingsAccountLayout from '@/components/account/account-layout/SettingsAccountLayout'
import TabsTitle from '@/components/account/tabs-title/TabsTitle'
import AccountSettingForm from '@/modules/account-modules/edit-account-module/components/AccountSettingForm'
import { UploadAvatar } from '@/modules/profile-avatar/UploadAvatar'

const CreateAccount = () => {
  const cb = (data: SettingsSchemaType) => {
    console.log(data)
  }

  return (
    <AccountLayout>
      <div className="w-full ml-[200px] relative">
        <TabsTitle variant="create" />
        <SettingsAccountLayout>
          <div>
            <UploadAvatar />
          </div>
          <AccountSettingForm callbackSubmit={cb} create={true} />
        </SettingsAccountLayout>
      </div>
    </AccountLayout>
  )
}

export default CreateAccount
