import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { sendPublicationImage } from '@/modules/post-modules/create-post-module/api/postImageAPI'
export const useUploadPost = (onSuccessPostSent: any, userId: number) => {
  const client = useQueryClient()

  const { isLoading, mutate, data, isSuccess } = useMutation({
    mutationKey: ['img-add'],
    mutationFn: sendPublicationImage,
    onSuccess: async data => {
      await client.invalidateQueries({ queryKey: ['posts', `user_${userId}`] })
      onSuccessPostSent(data.data.images)
      toast.success('Success')
    },
    onError: () => {
      console.log('useAddPostMutation ERROR')
    },
  })

  return { mutate, data, isLoading, isSuccess }
}
