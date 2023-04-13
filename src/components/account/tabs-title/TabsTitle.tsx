import React, { FC } from 'react'

import GlobalTabs from '@/ui/tabs/GlobalTabs'

interface TabsType {
  id: string
  label: string
  content: React.ComponentType | React.ReactNode
}

interface PropsTabType {
  variant: 'create' | 'edit'
  tabs?: TabsType[]
  activeTab?: string
  setActiveTab?: (activeTab: string) => void
}

const TabsTitle: FC<PropsTabType> = ({ variant, tabs, setActiveTab, activeTab }) => {
  return (
    <>
      {variant === 'edit' && (
        <>
          <div className="flex border-b border-gray-200  w-[313px] border-none h-[96]">
            {tabs?.map(tab => (
              <GlobalTabs
                key={tab.id}
                label={tab.label}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ))}
          </div>
          <div className="divide-y-[100%] bg-bgLogBorder h-[1px]"></div>
        </>
      )}
      {variant === 'create' && (
        <>
          <h1 className="text-white pb-[12px]">Create Profile</h1>
          <div className="divide-y-[100%] bg-bgLogBorder h-[1px]"></div>
        </>
      )}
    </>
  )
}

export default TabsTitle
