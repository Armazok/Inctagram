import { useMutation, useQueryClient } from '@tanstack/react-query'

import { sendEditPost } from '@/modules/post-modules/create-post-module/components/api/edit/sendEditPost'

export const useEditPostMutation = (userId?: number) => {
  const client = useQueryClient()

  const { mutate, data } = useMutation({
    mutationKey: ['key'],
    mutationFn: sendEditPost,
    onSuccess: () => {
      // client.invalidateQueries({ queryKey: ['posts', `user_${userId}`] })
    },
    onError: () => {
      console.log('useAddPostMutation ERROR')
    },
  })

  return { mutate, data }
}
