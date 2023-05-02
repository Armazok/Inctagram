import { useMutation } from '@tanstack/react-query'

import { sendEditPost } from '@/modules/post-modules/create-post-module/components/api/edit/sendEditPost'

export const useEditPostMutation = () => {
  const { mutate, data } = useMutation({
    mutationKey: ['key'],
    mutationFn: sendEditPost,
    onSuccess: () => {},
    onError: () => {
      console.log('useAddPostMutation ERROR')
    },
  })

  return { mutate, data }
}
