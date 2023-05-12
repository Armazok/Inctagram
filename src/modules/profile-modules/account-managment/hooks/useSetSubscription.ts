import { useMutation } from '@tanstack/react-query'

import { accountAPI } from '@/modules/profile-modules/account-managment/api/account-api'

export const useSetSubscription = (onSuccess: any) => {
  const { isLoading, mutate } = useMutation({
    mutationKey: ['set-subscription-first-time'],
    mutationFn: accountAPI.setSubscription,
    onSuccess: data => {
      if (data) {
        onSuccess(data.data.url)
      }
    },
    onError: () => {},
  })

  return { isLoading, mutate }
}
