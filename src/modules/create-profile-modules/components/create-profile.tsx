import React from 'react'

import { useRouter } from 'next/router'

import { settingsSchema, SettingsSchemaType, useGlobalForm } from '@/common'
import { FormLayout } from '@/components/FormLayout'
import { UploadAvatarBlock } from '@/modules/profile-modules/avatar-module'
import { useCreateProfileMutation } from '@/modules/profile-modules/create-profile-module'
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
    <FormLayout>
      <div>
        <UploadAvatarBlock />
      </div>
      <AccountSettingForm
        callbackSubmit={handleFormSubmit}
        aboutMe=""
        username=""
        firstName=""
        lastName=""
        date="Wed Jan 1 2023 00:00:00 GMT+0200 (Москва, стандартное время)"
        city=""
        create={true}
      />
    </FormLayout>
  )
}
