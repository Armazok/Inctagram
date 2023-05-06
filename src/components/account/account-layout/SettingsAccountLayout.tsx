import React, { FC, ReactNode } from 'react'
type PropsType = {
  children: ReactNode
}

export const SettingsAccountLayout: FC<PropsType> = ({ children }) => {
  return (
    <div className="flex gap-[40px] w-full pt-[22px] sm:flex-col">
      {children}
      <div className="w-[100%] bg-bgLogBorder h-[1px] absolute bottom-[72px] sm:hidden"></div>
    </div>
  )
}
