import { useQuery } from '@tanstack/react-query'

import { noRefetch } from '@/helpers/no-refetch'
import { authAPI } from '@/services/api/auth/authAPI'

export const useConfirmationQuery = (confirmationCode: string) => {
  return useQuery({
    queryKey: ['regConfirmation'],
    queryFn: () => authAPI.registrationConfirmation({ confirmationCode }),
    enabled: !!confirmationCode,
    retry: false,
    ...noRefetch,
  })
}
