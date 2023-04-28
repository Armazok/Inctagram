import { useMutation } from '@tanstack/react-query'

import { sendAvatar } from '@/modules/profile-modules/avatar-module'

export const useUploadAvatar = (onUploadSuccess: (avatarUrl: string) => void) => {
  const { isLoading, mutate } = useMutation({
    mutationKey: ['avatar-uploading'],
    mutationFn: sendAvatar,
    onSuccess: data => {
      onUploadSuccess(data.data.avatars[0].url)
    },
    onError: () => {
      console.log('avatar upload error')
    },
  })

  return { isLoading, mutate }
}
