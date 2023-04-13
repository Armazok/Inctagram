import React from 'react'

import { useMutation } from '@tanstack/react-query'

import { SettingsSchemaType } from '@/common/constants'
import SettingsAccountLayout from '@/components/account/account-layout/SettingsAccountLayout'
// import { UploadAvatar } from '@/modules/profile-avatar/UploadAvatar'
import { editAccountData } from '@/modules/profile-modules/settings-edit-profile-module/api/editAccountData'
import AccountSettingForm from '@/modules/profile-modules/settings-edit-profile-module/components/AccountSettingForm'

const EditSettingProfile = () => {
  const { isLoading, mutate: editeProfile } = useMutation({
    mutationKey: ['edit-profile'],
    mutationFn: editAccountData,
    onSuccess: () => {},
    onError: () => {},
  })

  const editProfileData = (data: SettingsSchemaType) => {
    editeProfile(data)
  }

  return (
    <SettingsAccountLayout>
      <div>{/*<UploadAvatar />*/}</div>
      <AccountSettingForm
        callbackSubmit={editProfileData}
        aboutMe="Hello Iam junior front end developer"
        username="King-size"
        firstName="Serhii"
        lastName="Yakovenko"
        date="Wed Jan 14 1995 00:00:00 GMT+0200 (Москва, стандартное время)"
        city="Kiev"
        create={false}
      />
    </SettingsAccountLayout>
  )
}

export default EditSettingProfile
