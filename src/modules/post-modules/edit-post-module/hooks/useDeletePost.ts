import { useMutation } from '@tanstack/react-query'
import { deletePost } from '@/modules/post-modules/edit-post-module/api/edit-post-api'

export const useDeletePostMutation = () => {
  const { isLoading, mutate } = useMutation({
    mutationKey: ['delete-post'],
    mutationFn: deletePost,
    onSuccess: () => {
      console.log('post was deleted')
    },
  })

  return { isLoading, mutate }
}
