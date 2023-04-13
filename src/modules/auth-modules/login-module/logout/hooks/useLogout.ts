import { useMutation } from '@tanstack/react-query'

import { sendLogoutRequest } from '@/modules/auth-modules/login-module/logout/api/logoutAPI'

export const useLogoutMutation = (handleLogout: () => void) => {
  const { isLoading, mutate: sendLogout } = useMutation({
    mutationFn: sendLogoutRequest,
    mutationKey: ['logout'],
    onSuccess: () => {
      handleLogout()
    },
    onError: () => {
      handleLogout()
    },
  })

  return { isLoading, sendLogout }
}
