import { SettingsSchemaType } from '@/common/constants'
import { authInstance } from '@/services/api/auth/instanse'

export const editAccountData = (payloadEditProfile: SettingsSchemaType) => {
  return authInstance.put<SettingsSchemaType>('users/profile', { ...payloadEditProfile })
}
