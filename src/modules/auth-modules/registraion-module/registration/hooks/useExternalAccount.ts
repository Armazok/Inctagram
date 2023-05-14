import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { PATH_ROUTE, ResponseError, useLocalStorage } from '@/common'
import {
  cancelExternalAccount,
  confirmExternalAccount,
} from '@/modules/auth-modules/registraion-module'

export const useExternalAccount = () => {
  const [_, setToken] = useLocalStorage('accessToken', '')
  const [modalContent, setModalContent] = useState({
    text: '',
    isOpen: false,
  })

  const { push } = useRouter()

  const { isLoading: isConfirmLoading, mutate: confirmMerge } = useMutation({
    mutationFn: confirmExternalAccount,
    onSuccess: data => {
      setModalContent({
        ...modalContent,
        isOpen: true,
        text: 'You have successfully added an account',
      })
      setTimeout(() => {
        window.location.reload()
      }, 1500)

      console.log(data, 'data')
      // setToken(data.data?.accessToken)
    },
    onError: (error: ResponseError) => {
      errorRequestExternal()
    },
  })

  const { mutate: cancelMerge, isLoading: isCancelLoading } = useMutation({
    mutationFn: cancelExternalAccount,
    onSuccess: data => {
      setModalContent({
        ...modalContent,
        isOpen: true,
        text: 'You canceled adding an account',
      })
    },
    onError: (error: ResponseError) => {
      errorRequestExternal()
    },
  })

  const closeModal = () => push(PATH_ROUTE.LOGIN)

  const errorRequestExternal = () => {
    setModalContent({
      ...modalContent,
      isOpen: true,
      text: 'Oops, something went wrong, maybe your link is expired. Try to register again',
    })
  }

  const isLoading = isCancelLoading || isConfirmLoading

  return {
    isLoading,
    closeModal,
    cancelMerge,
    confirmMerge,
    modalContent,
  }
}
