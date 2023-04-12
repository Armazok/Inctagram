import React from 'react'

import { useRouter } from 'next/router'

import { useGlobalForm } from '@/common'
import { settingsSchema, SettingsSchemaType } from '@/common/constants'
import FormLayout from '@/components/FormLayout/FormLayout'
import AccountSettingForm from '@/modules/account-modules/edit-account-module/components/AccountSettingForm'
import { useCreateProfileMutation } from '@/modules/create-profile-modules/hooks/useCreateProfile'
import { UploadAvatar } from '@/modules/profile-avatar/UploadAvatar'

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
    console.log(data, `${data}`)
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
