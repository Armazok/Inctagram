import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { sendPublicationImage } from '@/modules/post-modules/create-post-module/components/api/postImageAPI'
import { deletePost } from '@/modules/post-modules/edit-post-module/api/edit-post-api'
export const useUploadPost = (
  onSuccessPostSent: any,
  userId: number
  // onSuccess:
  // (
  //   imgStr?: [
  //     {
  //       uploadId: string
  //       url: string
  //       width: number
  //       height: number
  //       fileSize: number
  //     }
  //   ]
  // )=> void
) => {
  const client = useQueryClient()

  const { isLoading, mutate, data, isSuccess } = useMutation({
    mutationKey: ['img-add'],
    mutationFn: sendPublicationImage,
    onSuccess: data => {
      onSuccessPostSent(data.data.images)
      // onSuccessUploadPost && onSuccessUploadPost()
      client.invalidateQueries({ queryKey: ['posts', `user_${userId}`] })
      toast.success('Success')
    },
    onError: () => {
      console.log('useAddPostMutation ERROR')
    },
  })

  return { mutate, data, isLoading, isSuccess }
}
