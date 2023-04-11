import React from 'react'

import { SettingsSchemaType } from '@/common/constants'
import SettingsAccountLayout from '@/components/account/account-layout/SettingsAccountLayout'
import AccountSettingForm from '@/modules/account-modules/edit-account-module/components/AccountSettingForm'
import { UploadAvatar } from '@/modules/profile-avatar/UploadAvatar'

const EditSetting = () => {
  const cb = (data: SettingsSchemaType) => {
    console.log(data)
  }

  return (
    <SettingsAccountLayout>
      <div>
        <UploadAvatar />
      </div>
      <AccountSettingForm
        callbackSubmit={cb}
        aboutMe="Hello Iam junior front end developer"
        username="King"
        firstName="Serhii"
        lastName="Yakovenko"
        date="Wed Jan 14 1995 00:00:00 GMT+0200 (Москва, стандартное время)"
        city="Kiev"
      />
    </SettingsAccountLayout>
  )
}

export default EditSetting
