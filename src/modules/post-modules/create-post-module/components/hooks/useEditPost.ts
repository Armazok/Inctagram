import { useMutation, useQueryClient } from '@tanstack/react-query'

import { sendEditPost } from '@/modules/post-modules/create-post-module/components/api/edit/sendEditPost'

export const useEditPostMutation = (postId: number | null) => {
  const client = useQueryClient()

  const { mutate, data } = useMutation({
    mutationKey: ['key'],
    mutationFn: sendEditPost,
    onSuccess: () => client.invalidateQueries({ queryKey: [`post_${postId}`] }),
    onError: () => {
      console.log('useAddPostMutation ERROR')
    },
  })

  return { mutate, data }
}
