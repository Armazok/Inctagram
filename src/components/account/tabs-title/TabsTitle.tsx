import React, { FC } from 'react'

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
          <div className="flex border-b border-gray-200 w-[50%]">
            {tabs?.map(tab => (
              <div
                key={tab.id}
                className={`-mb-px flex-1 text-center py-4 px-4 border-b-2 font-medium text-sm cursor-pointer ${
                  activeTab === tab.label
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab?.(tab.label)}
              >
                {tab.label}
              </div>
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
