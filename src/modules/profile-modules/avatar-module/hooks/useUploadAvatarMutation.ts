import { useMutation } from '@tanstack/react-query'

import { sendAvatar } from '@/modules/profile-modules/avatar-module'

export const useUploadAvatarMutation = (
  setAvatar: (avatar: string) => void,
  setIsModalOpen: (isOpen: boolean) => void
) => {
  const { isLoading, mutate } = useMutation({
    mutationKey: ['avatar-uploading'],
    mutationFn: sendAvatar,
    onSuccess: data => {
      setIsModalOpen(false)
      setAvatar(data.data.avatars[0].url)
    },
  })

  return { isLoading, mutate }
}
