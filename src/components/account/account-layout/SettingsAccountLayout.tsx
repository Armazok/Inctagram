import React, { FC, ReactNode } from 'react'
type PropsType = {
  children: ReactNode
}

const SettingsAccountLayout: FC<PropsType> = ({ children }) => {
  return (
    <div className="flex gap-[40px] w-full pt-[22px]">
      {children}
      <div className="w-[100%] bg-bgLogBorder h-[1px] absolute bottom-[72px]"></div>
    </div>
  )
}

export default SettingsAccountLayout
