import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { sendPublicationImage } from '@/modules/post-modules/create-post-module/api/postImageAPI'
export const useUploadPost = (
  onSuccessPostSent: any,
  userId: number,
  skeletonIsPublication: (isLoadingPublication: boolean) => void
) => {
  const client = useQueryClient()

  const { isLoading, mutate, data, isSuccess } = useMutation({
    mutationKey: ['img-add'],
    mutationFn: sendPublicationImage,
    onSuccess: async data => {
      await client.invalidateQueries({ queryKey: ['posts', `user_${userId}`] })
      onSuccessPostSent(data.data.images)
      toast.success('Success')
      skeletonIsPublication(false)
    },
    onError: () => {
      console.log('useAddPostMutation ERROR')
      skeletonIsPublication(false)
    },
  })

  return { mutate, data, isLoading, isSuccess }
}
