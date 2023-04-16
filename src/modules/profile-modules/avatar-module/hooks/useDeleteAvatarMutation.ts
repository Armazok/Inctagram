import { useMutation } from '@tanstack/react-query'
import { deleteAvatar } from '@/modules/profile-modules/avatar-module'

export const useDeleteAvatarMutation = (setAvatar: (avatar: string) => void) => {
  const { isLoading, mutate } = useMutation({
    mutationKey: ['avatar-delete'],
    mutationFn: deleteAvatar,
    onSuccess: () => {
      setAvatar('')
    },
  })

  return { isLoading, mutate }
}
