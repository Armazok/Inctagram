import { useQuery } from '@tanstack/react-query'

import { noRefetch } from '@/common'
import { accountAPI } from '@/modules/profile-modules/account-managment/api/account-api'

export const useGetCosts = () => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['get-costs'],
    onSuccess: data => {},
    onError: error => {},
    queryFn: () => accountAPI.getCosts(),
    ...noRefetch,
  })

  return { data, isError, isLoading, isSuccess }
}
