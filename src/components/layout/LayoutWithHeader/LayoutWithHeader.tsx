import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import { Header } from '@/components/atoms/header/Header'

export const LayoutWithHeader: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export const getLayoutWithHeader = (page: ReactElement) => {
  return <LayoutWithHeader>{page}</LayoutWithHeader>
}
