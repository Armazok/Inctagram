import { useMutation } from '@tanstack/react-query'

import { sendPublicationPost } from '@/modules/post-modules/create-post-module/components/api/publicationAPI'
export const useAddAllPostMutation = (onSuccess: () => void) => {
  const { isLoading, mutate, data, isSuccess } = useMutation({
    mutationKey: ['postAll-add'],
    mutationFn: sendPublicationPost,
    onSuccess: data => {
      onSuccess()
    },
    onError: () => {
      console.log('Error Mutation')
    },
  })

  return { isLoading, mutate, data, isSuccess }
}