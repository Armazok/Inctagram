import React from 'react'

import { useRouter } from 'next/router'

import { settingsSchema, SettingsSchemaType, useGlobalForm } from '@/common'
import { AccountLayout, SettingsAccountLayout, TabsTitle } from '@/components/account'
import { useCreateProfileMutation } from '@/modules/create-profile-modules'
import { UploadAvatarBlock } from '@/modules/profile-modules/avatar-module'
import { AccountSettingForm } from '@/modules/profile-modules/settings-edit-profile-module'

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
            <UploadAvatarBlock />
          </div>
          <AccountSettingForm callbackSubmit={handleFormSubmit} create={true} />
        </SettingsAccountLayout>
      </div>
    </AccountLayout>
  )
}
