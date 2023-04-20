import React, { FC, PropsWithChildren, useEffect } from 'react'

import { useRouter } from 'next/router'

import { useMeQuery } from '@/modules/auth-modules/login-module'
import { Preloader } from '@/ui'

const AuthProtection: FC<PropsWithChildren> = ({ children }) => {
  const unProtectedPaths = [
    '/auth/forgot-password',
    '/auth/login',
    '/auth/recovery',
    '/auth/recovery/resend-form',
    '/auth/registration',
    '/auth/registration/resend-form',
    '/auth/registration-confirmation',
  ]

  const { push, pathname } = useRouter()

  const { isSuccess, isError, isFetching } = useMeQuery()

  useEffect(() => {
    if (isSuccess && unProtectedPaths.includes(pathname)) {
      push('/profile')
    }
    if (isError && !unProtectedPaths.includes(pathname)) {
      push('/auth/login')
    }
  }, [isSuccess, isError])

  return (
    <>
      {isFetching && <Preloader />}
      {children}
    </>
  )
}

export default AuthProtection
