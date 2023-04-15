import { useMutation, useQueryClient } from '@tanstack/react-query'

import { sendLogoutRequest } from '@/modules/auth-modules/login-module/logout/api/logoutAPI'

export const useLogoutMutation = (handleLogout: () => void) => {
  const client = useQueryClient()

  const { isLoading, mutate: sendLogout } = useMutation({
    mutationFn: sendLogoutRequest,
    mutationKey: ['logout'],
    onSuccess: () => {
      window.localStorage.removeItem('accessToken')
      handleLogout()
      client.invalidateQueries(['me'])
    },
    onError: () => {
      window.localStorage.removeItem('accessToken')
      handleLogout()
      client.invalidateQueries(['me'])
    },
  })

  return { isLoading, sendLogout }
}
