import { useMutation, useQueryClient } from '@tanstack/react-query'

import { accountAPI } from '@/modules/profile-modules/account-managment/api/account-api'

export const useSetCancelAutoRenewal = () => {
  const queryClient = useQueryClient()
  const { isLoading, mutate: cancelAutoRenewal } = useMutation({
    mutationKey: ['set-cancel-auto-renewal'],
    mutationFn: accountAPI.setCancelAutoRenewal,
    onSuccess: () => queryClient.invalidateQueries(['get-current-subscriptions']),
  })

  return { isLoading, cancelAutoRenewal }
}
