import { useQuery } from '@tanstack/react-query'

import { noRefetch } from '@/common'
import { accountAPI } from '@/modules/profile-modules/account-managment/api/account-api'

export const useGetCurrentSubscription = () => {
  const {
    data: currentSubscriptions,
    isError,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['get-current-subscriptions'],
    queryFn: accountAPI.getCurrentSubscription,
    retry: false,
    ...noRefetch,
    select: data => data.data,
  })

  return { currentSubscriptions, isError, isLoading, isFetching, error }
}
