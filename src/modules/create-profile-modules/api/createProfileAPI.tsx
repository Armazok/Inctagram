import React from 'react'

import { SettingsSchemaType } from '@/common/constants'
import { authInstance } from '@/services/api/auth/instanse'
import { ResCreateProfile } from '@/types'

export const sendCreateProfileRequest = ({
  userName,
  firstName,
  lastName,
  dateOfBirth,
  city,
  aboutMe,
}: Omit<SettingsSchemaType, 'profileCreate'>) => {
  return authInstance.post<ResCreateProfile>('users/profile', {
    userName,
    firstName,
    lastName,
    dateOfBirth,
    city,
    aboutMe,
  })
}
