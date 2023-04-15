import { FC } from 'react'

import clsx from 'clsx'

interface ITabComponentType {
  label: string | undefined
  activeTab?: string | undefined
  setActiveTab?: (activeTab: string | undefined) => void
}

export const TabComponent: FC<ITabComponentType> = ({ label, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center align-middle  ">
      <div
        className={clsx(
          'py-[6px] px-[24px]',
          activeTab === label &&
            ' tabsSelected flex justify-center align-middle hover:border-b-2 hover:border-b-accent-500  active:bg-[#0c131f]',
          activeTab !== label && 'tabsUnselected flex justify-center align-middle'
        )}
        onClick={() => setActiveTab?.(label)}
      >
        {label}
      </div>
    </div>
  )
}
