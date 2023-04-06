import { useQuery } from '@tanstack/react-query'
import { authAPI } from '@/services/api/auth/authAPI'
import { noRefetch } from '@/helpers/no-refetch'

export const useConfirmationQuery = (confirmationCode: string) => {
  return useQuery({
    queryKey: ['regConfirmation'],
    queryFn: () => authAPI.registrationConfirmation({ confirmationCode }),
    enabled: !!confirmationCode,
    retry: false,
    ...noRefetch,
  })
}
