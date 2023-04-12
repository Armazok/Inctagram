import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import { LayoutWithHeader } from '@/components/layout/LayoutWithHeader/LayoutWithHeader'
import { Sidebar } from '@/ui/sidebar/Sidebar'

export const GlobalLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutWithHeader>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </LayoutWithHeader>
  )
}

export const getGlobalLayout = (page: ReactElement) => {
  return <GlobalLayout>{page}</GlobalLayout>
}
