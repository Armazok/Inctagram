import React from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { SettingsSchemaType } from '@/common'
import { SettingsAccountLayout } from '@/components/account'
import { UploadAvatarBlock } from '@/modules/profile-modules/avatar-module'
import {
  AccountSettingForm,
  editAccountData,
  useProfile,
} from '@/modules/profile-modules/settings-edit-profile-module'

export const EditSettingProfile = () => {
  const client = useQueryClient()

  const { profileData, isLoading: isProfileLoading } = useProfile()

  const { mutate: editeProfile } = useMutation({
    mutationKey: ['edit-profile'],
    mutationFn: editAccountData,
    onSuccess: () => {
      client.invalidateQueries(['get-profile'])
      toast.success('Profile was updated')
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const editProfileData = (data: SettingsSchemaType) => {
    editeProfile?.(data)
  }

  const initialProfileData = {
    userName: profileData?.userName || '',
    firstName: profileData?.firstName || '',
    lastName: profileData?.lastName || '',
    city: profileData?.city || '',
    dateOfBirth: profileData?.dateOfBirth || null,
    aboutMe: profileData?.aboutMe || '',
  }

  //todo : Loader add
  if (isProfileLoading) return null

  return (
    <SettingsAccountLayout>
      <div>
        <UploadAvatarBlock />
      </div>
      <AccountSettingForm onSubmit={editProfileData} initialProfileData={initialProfileData} />
    </SettingsAccountLayout>
  )
}
