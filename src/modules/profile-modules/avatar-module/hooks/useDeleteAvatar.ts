import { useMutation } from '@tanstack/react-query'

import { deleteAvatar } from '@/modules/profile-modules/avatar-module'

export const useDeleteAvatar = (onDeleteSuccess: () => void) => {
  const { isLoading, mutate } = useMutation({
    mutationKey: ['avatar-delete'],
    mutationFn: deleteAvatar,
    onSuccess: () => {
      onDeleteSuccess()
    },
    onError: () => {
      console.log('avatar delete error')
    },
  })

  return { isLoading, mutate }
}
