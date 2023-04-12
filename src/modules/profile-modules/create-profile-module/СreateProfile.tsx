import React from 'react'

import { useRouter } from 'next/router'

import { useGlobalForm } from '@/common'
import { settingsSchema, SettingsSchemaType } from '@/common/constants'
import AccountLayout from '@/components/account/account-layout/AccountLayout'
import SettingsAccountLayout from '@/components/account/account-layout/SettingsAccountLayout'
import TabsTitle from '@/components/account/tabs-title/TabsTitle'
import { UploadAvatar } from '@/modules/profile-avatar/UploadAvatar'
import { useCreateProfileMutation } from '@/modules/profile-modules/create-profile-module/hooks/useCreateProfile'
import AccountSettingForm from '@/modules/profile-modules/settings-edit-profile-module/components/AccountSettingForm'

export const CreateProfile = ({}) => {
  const { push } = useRouter()
  const { setCustomError, handleSubmit, reset } = useGlobalForm(settingsSchema)

  const { sendCreateProfile, isLoading, data } = useCreateProfileMutation(() => push('/profile'))
  const handleFormSubmit = async ({
    city,
    aboutMe,
    lastName,
    firstName,
    userName,
    dateOfBirth,
  }: SettingsSchemaType) => {
    await sendCreateProfile({
      city,
      aboutMe,
      lastName,
      firstName,
      userName,
      dateOfBirth,
    })
  }

  return (
    <AccountLayout className="m-auto">
      <div className="relative w-full ">
        <TabsTitle variant="create" />
        <SettingsAccountLayout>
          <div>
            <UploadAvatar />
          </div>
          <AccountSettingForm callbackSubmit={handleFormSubmit} create={true} />
        </SettingsAccountLayout>
      </div>
    </AccountLayout>
  )
}
