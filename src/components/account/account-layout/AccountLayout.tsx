import React, { FC, ReactNode } from 'react'

export const AccountLayout: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`max-w-[750px] w-full pt-[24px] pl-[24px] pb-[24px] sm:max-w-[330px] sm:pl-3.5 ${className}`}
    >
      {children}
    </div>
  )
}
