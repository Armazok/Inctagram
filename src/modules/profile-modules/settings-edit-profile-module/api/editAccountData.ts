import { SettingsSchemaType } from '@/common'
import { authInstance } from '@/services'

export const editAccountData = (payloadEditProfile: SettingsSchemaType) => {
  return authInstance.put<SettingsSchemaType>('users/profile', { ...payloadEditProfile })
}
