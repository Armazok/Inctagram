import React from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { SettingsSchemaType } from '@/common'
import { SettingsAccountLayout } from '@/components/account'
import { UploadAvatarBlock } from '@/modules/profile-modules/avatar-module'
import {
  AccountSettingForm,
  editAccountData,
  ResponseError,
  useGetProfile,
} from '@/modules/profile-modules/settings-edit-profile-module'
import { Preloader } from '@/ui'

export const EditSettingProfile = () => {
  const client = useQueryClient()

  const { profileData, isProfileLoading, profileAvatar, refetch } = useGetProfile()

  const { mutate: editeProfile, isLoading: isEditProfileLoading } = useMutation({
    mutationKey: ['edit-profile'],
    mutationFn: editAccountData,
    onSuccess: () => {
      client.invalidateQueries(['get-profile'])
      toast.success('Profile was updated')

      return refetch()
    },
    onError: (error: ResponseError) => {
      error?.response?.data?.messages?.forEach(el => {
        toast.error(`${el.message}`)
      })

      client.invalidateQueries(['get-profile'])
    },
  })

  const editProfileData = (data: SettingsSchemaType) => editeProfile?.(data)

  if (isProfileLoading || isEditProfileLoading) return <Preloader />

  return (
    <SettingsAccountLayout>
      <div>
        <UploadAvatarBlock avatarUrl={profileAvatar} />
      </div>
      <AccountSettingForm onSubmit={editProfileData} initialProfileData={profileData} />
    </SettingsAccountLayout>
  )
}
