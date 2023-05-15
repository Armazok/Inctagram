import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { PATH_ROUTE, ResponseError, useAuth2ControllerPopup, useLocalStorage } from '@/common'
import {
  cancelExternalAccount,
  confirmExternalAccount,
} from '@/modules/auth-modules/registraion-module'

export const useExternalAccount = () => {
  const { setAuth2ContentPopup, popupContent, closePopup } = useAuth2ControllerPopup()
  const [_, setToken] = useLocalStorage('accessToken', '')

  const { push } = useRouter()

  const redirect = () => push(PATH_ROUTE.LOGIN)
  const reload = () => window.location.reload()

  const { isLoading: isConfirmLoading, mutate: confirmMerge } = useMutation({
    mutationFn: confirmExternalAccount,
    onSuccess: data => {
      setAuth2ContentPopup(true, 'You have successfully added an additional account.')

      setToken(data.data?.accessToken)

      setTimeout(reload, 1500)
    },
    onError: (error: ResponseError) => {
      setAuth2ContentPopup(true, error.response?.data.messages[0].message)
    },
  })

  const { mutate: cancelMerge, isLoading: isCancelLoading } = useMutation({
    mutationFn: cancelExternalAccount,
    onSuccess: () => {
      setAuth2ContentPopup(
        true,
        `You have successfully canceled adding an additional account.
        After a couple of seconds, you will be automatically redirected to the login page`
      )
      setTimeout(redirect, 2500)
    },
    onError: (error: ResponseError) => {
      setAuth2ContentPopup(true, error.response?.data.messages[0].message)
    },
  })

  const isLoading = isCancelLoading || isConfirmLoading

  return {
    isLoading,
    closePopup,
    cancelMerge,
    confirmMerge,
    popupContent,
  }
}
