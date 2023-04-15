import { SettingsSchemaType } from '@/common/constants'
import { useMeQuery } from '@/modules/auth-modules/login-module/login/hooks/useLogin'
import { useGetProfileData } from '@/modules/profile-modules/settings-edit-profile-module/hooks/useGetProfileData'

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
