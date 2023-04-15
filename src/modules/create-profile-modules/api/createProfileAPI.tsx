import React from 'react'

import { SettingsSchemaType } from '@/common'
import { authInstance } from '@/services'
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
