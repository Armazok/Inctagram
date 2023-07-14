import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { sendAvatar } from '@/modules/profile-modules/avatar-module'

export const useUploadAvatar = (onUploadSuccess: (avatarUrl: string) => void) => {
  const client = useQueryClient()

  const { isLoading, mutate } = useMutation({
    mutationKey: ['avatar-uploading'],
    mutationFn: sendAvatar,
    onSuccess: async data => {
      onUploadSuccess(data.data.avatars[0].url)
      toast.success('Avatar was updated')
      await client.invalidateQueries(['get-profile'])
    },
    onError: () => {
      console.log('avatar upload error')
    },
  })

  return { isLoading, mutate }
}
