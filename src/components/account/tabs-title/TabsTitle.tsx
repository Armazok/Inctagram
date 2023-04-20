import React, { FC } from 'react'

import { TabComponent } from '@/ui'

interface TabsType {
  id: string
  label: string
  content: React.ComponentType | React.ReactNode
}

interface PropsTabType {
  tabs?: TabsType[]
  activeTab?: string
  setActiveTab?: (activeTab: string | undefined) => void
}

export const TabsTitle: FC<PropsTabType> = ({ tabs, setActiveTab, activeTab }) => {
  return (
    <>
      <div className="flex border-b border-gray-200  border-none h-[96] gap-[2px]">
        {tabs?.map(tab => (
          <TabComponent
            key={tab.id}
            label={tab.label}
            activeTab={activeTab}
            setActiveTab={setActiveTab!}
          />
        ))}
      </div>
      <div className="divide-y-[100%] bg-bgLogBorder h-[1px]"></div>
    </>
  )
}
