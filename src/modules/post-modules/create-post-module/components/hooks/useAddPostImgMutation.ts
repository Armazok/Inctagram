import { useMutation } from '@tanstack/react-query'

import { sendPublicationImage } from '@/modules/post-modules/create-post-module/components/api/postImageAPI'
export const useUploadAvatarMutation = (
  onSuccess: (
    imgStr: [
      {
        uploadId: string
        url: string
        width: number
        height: number
        fileSize: number
      }
    ]
  ) => void
) => {
  const { isLoading, mutate, data, isSuccess } = useMutation({
    mutationKey: ['img-add'],
    mutationFn: sendPublicationImage,
    onSuccess: data => {
      onSuccess(data.data.images)
    },
    onError: () => {
      console.log('useAddPostMutation ERROR')
    },
  })

  return { mutate, data, onSuccess }
}
