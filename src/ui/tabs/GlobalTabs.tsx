import { FC } from 'react'

import clsx from 'clsx'

interface ITabComponentType {
  label: string
  activeTab?: string
  setActiveTab?: (label: string) => void
}

const TabComponent: FC<ITabComponentType> = ({ label, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center align-middle ">
      <div
        className={clsx(
          activeTab === label &&
            'tabsSelected flex justify-center align-middle hover:border-b-2 hover:border-b-accent-500  active:bg-[#0c131f]',
          activeTab !== label && 'tabsUnselected flex justify-center align-middle',
          label === 'General information' && ' w-[202px] h-[36px]',
          label === 'Devices' && ' w-[111px] h-[36px]'
        )}
        onClick={() => setActiveTab?.(label)}
      >
        {label}
      </div>
    </div>
  )
}

export default TabComponent
