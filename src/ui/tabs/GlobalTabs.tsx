import { FC, ReactElement, useState } from 'react'

interface ITabComponentType {
  tabComponent1: ReactElement<any, any>
  tabComponent2: ReactElement<any, any>
  nameTab1: string
  nameTab2: string
}

const TabComponent: FC<ITabComponentType> = ({
  tabComponent1,
  tabComponent2,
  nameTab2,
  nameTab1,
}) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className="flex flex-col text-accent-500 pt-3 ">
      <div className="flex flex-row justify-around self-center items-center w-1/3 border-none h-3.5">
        <div
          className={`focus:border-2 focus:rounded border-b-2 border-accent-500 hover:bg-[#101722] ${
            activeTab === 0 ? 'hover:border-b-2 hover:border-b-accent-500  active:bg-[#0c131f]' : ''
          }`}
          onClick={() => handleTabClick(0)}
        >
          {nameTab1}
        </div>
        <div
          className={`focus:border-2 focus:rounded border-b-2 border-accent-500 hover:bg-[#101722] ${
            activeTab === 1 ? 'hover:border-b-2 hover:border-b-accent-500  active:bg-[#0c131f]' : ''
          }`}
          onClick={() => handleTabClick(1)}
        >
          {nameTab2}
        </div>
      </div>
      <div>
        {activeTab === 0 && <>{tabComponent1}</>}
        {activeTab === 1 && <>{tabComponent2}</>}
      </div>
    </div>
  )
}

export default TabComponent
