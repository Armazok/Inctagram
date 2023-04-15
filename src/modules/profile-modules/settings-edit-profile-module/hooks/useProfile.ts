import { SettingsSchemaType } from '@/common'
import { useMeQuery } from '@/modules/auth-modules/login-module'
import { useGetProfileData } from '@/modules/profile-modules/settings-edit-profile-module'

export const useProfile = () => {
  const { data, isLoading: isMeLoading } = useMeQuery()
  const userId = data?.data?.userId
  const { data: ProfileData, isLoading: isProfileLoading } = useGetProfileData(userId)
  const isLoading = isMeLoading || isProfileLoading

  //todo: remove when global loading added
  return {
    profileData: ProfileData as SettingsSchemaType,
    isLoading,
  }
}
