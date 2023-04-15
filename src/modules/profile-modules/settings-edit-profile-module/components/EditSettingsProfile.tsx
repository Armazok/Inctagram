import React from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { SettingsSchemaType } from '@/common/constants'
import SettingsAccountLayout from '@/components/account/account-layout/SettingsAccountLayout'
import { UploadAvatarBlock } from '@/modules/profile-modules/avatar-module/UploadAvatarBlock'
import { editAccountData } from '@/modules/profile-modules/settings-edit-profile-module/api/editAccountData'
import AccountSettingForm from '@/modules/profile-modules/settings-edit-profile-module/components/AccountSettingForm'
import { useProfile } from '@/modules/profile-modules/settings-edit-profile-module/hooks/useProfile'

const EditSettingProfile = () => {
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

export default EditSettingProfile
