import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import { LayoutWithHeader } from '@/components/layout/LayoutWithHeader/LayoutWithHeader'
import { Sidebar } from '@/components/sidebar/Sidebar'

export const GlobalLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutWithHeader>
      <div className="flex">
        <Sidebar />
        <div className="pt-9 w-full pl-6">{children}</div>
      </div>
    </LayoutWithHeader>
  )
}

export const getGlobalLayout = (page: ReactElement) => {
  return <GlobalLayout>{page}</GlobalLayout>
}
