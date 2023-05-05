import React from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { ResponseError, SettingsSchemaType } from '@/common'
import { SettingsAccountLayout } from '@/components/account'
import { UploadAvatarBlock } from '@/modules/profile-modules/avatar-module'
import {
  AccountSettingForm,
  editAccountData,
  useGetProfile,
} from '@/modules/profile-modules/settings-edit-profile-module'
import { Preloader } from '@/ui'

export const EditSettingProfile = () => {
  const client = useQueryClient()

  const { profileData, isProfileLoading, profileAvatar } = useGetProfile()

  const { mutate: editeProfile, isLoading: isEditProfileLoading } = useMutation({
    mutationFn: editAccountData,
    onSuccess: async () => {
      toast.success('Profile was updated')
      await client.invalidateQueries(['get-profile'])
    },
    onError: async (error: ResponseError) => {
      const messages = error?.response?.data?.messages

      if (!messages) {
        toast.error('An error occurred while updating your profile')
      } else {
        messages.forEach(({ message }) => {
          toast.error(message)
        })
      }

      await client.invalidateQueries(['get-profile'])
    },
  })

  const editProfileData = (data: SettingsSchemaType) => editeProfile?.(data)

  if (isProfileLoading || isEditProfileLoading) return <Preloader />

  return (
    <SettingsAccountLayout>
      <div className="sm:flex sm:justify-center">
        <UploadAvatarBlock avatarUrl={profileAvatar} />
      </div>
      <AccountSettingForm onSubmit={editProfileData} initialProfileData={profileData} />
    </SettingsAccountLayout>
  )
}
