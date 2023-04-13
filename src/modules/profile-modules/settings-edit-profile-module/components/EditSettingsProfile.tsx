import React from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { SettingsSchemaType } from '@/common/constants'
import SettingsAccountLayout from '@/components/account/account-layout/SettingsAccountLayout'
import { useMeQuery } from '@/modules/auth-modules/login-module/login/hooks/useLogin'
import { UploadAvatarBlock } from '@/modules/profile-modules/avatar-module/UploadAvatarBlock'
import { editAccountData } from '@/modules/profile-modules/settings-edit-profile-module/api/editAccountData'
import AccountSettingForm from '@/modules/profile-modules/settings-edit-profile-module/components/AccountSettingForm'
import { useGetProfileData } from '@/modules/profile-modules/settings-edit-profile-module/hooks/useGetProfileData'

const EditSettingProfile = () => {
  const client = useQueryClient()

  const { data } = useMeQuery()
  const userId = data?.data?.userId
  const { data: ProfileData } = useGetProfileData(userId)
  const profileData = ProfileData as SettingsSchemaType

  const { isLoading, mutate: editeProfile } = useMutation({
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
    editeProfile(data)
  }

  return (
    <SettingsAccountLayout>
      <div>
        <UploadAvatarBlock />
      </div>
      <AccountSettingForm
        callbackSubmit={editProfileData}
        aboutMe={profileData?.aboutMe || ''}
        username={profileData?.userName || ''}
        firstName={profileData?.firstName || ''}
        lastName={profileData?.lastName || ''}
        date={(profileData?.dateOfBirth as string | Date) || ('' as string)}
        city={profileData?.city || ''}
      />
    </SettingsAccountLayout>
  )
}

export default EditSettingProfile
