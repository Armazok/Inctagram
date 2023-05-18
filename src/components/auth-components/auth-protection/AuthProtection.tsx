import React, { FC, memo, PropsWithChildren, useEffect } from 'react'

import { useRouter } from 'next/router'

import { useMeQuery } from '@/services/hookMe'
import { useUserStore } from '@/store'
import { Preloader } from '@/ui'

const unProtectedPaths = [
  '/auth/forgot-password',
  '/auth/login',
  '/auth/recovery',
  '/auth/recovery/resend-form',
  '/auth/registration',
  '/auth/registration/external-account',
  '/auth/registration/resend-form',
  '/auth/registration-confirmation',
]
const AuthProtection: FC<PropsWithChildren> = memo(({ children }) => {
  const { pathname, replace } = useRouter()
  const { setUserId, setHasBusinessAccount } = useUserStore()

  const { isSuccess, isError, fetchStatus } = useMeQuery(
    userId => {
      setUserId(userId)
    },
    hasBusinessAccount => {
      setHasBusinessAccount(hasBusinessAccount)
    }
  )

  useEffect(() => {
    if (isSuccess && unProtectedPaths.includes(pathname)) {
      replace('/profile', undefined, { shallow: true })
    }
    if (isError && !unProtectedPaths.includes(pathname)) {
      replace('/auth/login', undefined, { shallow: true })
    }
  }, [isSuccess, isError])

  return (
    <>
      {fetchStatus === 'fetching' && <Preloader />}
      {children}
    </>
  )
})

export default AuthProtection
