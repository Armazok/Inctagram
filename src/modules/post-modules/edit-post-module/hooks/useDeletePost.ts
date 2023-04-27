import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { deletePost } from '@/modules/post-modules/edit-post-module/api/edit-post-api'

export const useDeletePostMutation = (onSuccess: any, userId: number) => {
  const client = useQueryClient()

  const { isLoading, mutate } = useMutation({
    mutationKey: ['delete-post'],
    mutationFn: deletePost,
    onSuccess: () => {
      onSuccess()
      client.invalidateQueries({ queryKey: ['posts', `user_${userId}`] })
      toast.success('Success')
    },
    onError: () => {
      console.log('post delete error')
    },
  })

  return { isLoading, mutate }
}
