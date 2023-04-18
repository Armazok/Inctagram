import { useGetProfileData } from '@/modules/profile-modules/settings-edit-profile-module'

export const useGetProfile = () => {
  const { data: profileData, isLoading: isProfileLoading, refetch } = useGetProfileData()

  const initialProfileData = {
    userName: profileData?.userName || '',
    firstName: profileData?.firstName || '',
    lastName: profileData?.lastName || '',
    city: profileData?.city || '',
    dateOfBirth: profileData?.dateOfBirth ? new Date(profileData?.dateOfBirth) : new Date(),
    aboutMe: profileData?.aboutMe || '',
  }
  const profileAvatar = profileData?.avatars[0]?.url || ''

  return {
    profileData: initialProfileData,
    profileAvatar,
    isProfileLoading,
    refetch,
  }
}
