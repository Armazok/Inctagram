import { useQuery } from '@tanstack/react-query'
import { accountAPI } from '@/modules/profile-modules/account-managment/api/account-api'

export const useGetCosts = () => {
  const {
    data: costs,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['get-costs'],
    // onSuccess: data => {

    // },
    queryFn: () => accountAPI.getCosts(),

    // ...noRefetch,
  })

  return { costs, isError, isLoading, isFetching }
}
