import React from 'react'

import { useRouter } from 'next/router'

import { useGlobalForm } from '@/common'
import { settingsSchema, SettingsSchemaType } from '@/common/constants'
import FormLayout from '@/components/FormLayout/FormLayout'
import { useCreateProfileMutation } from '@/modules/create-profile-modules/hooks/useCreateProfile'
import { UploadAvatar } from '@/modules/profile-avatar/UploadAvatar'
import AccountSettingForm from '@/modules/profile-modules/settings-edit-profile-module/components/AccountSettingForm'

const CreateProfile = ({}) => {
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
        <UploadAvatar />
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

export default CreateProfile
