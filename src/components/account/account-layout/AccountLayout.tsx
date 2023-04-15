import React, { FC, ReactNode } from 'react'

export const AccountLayout: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={`max-w-[750px] w-full pt-[24px] pl-[24px] pb-[24px] ${className}`}>
      {children}
    </div>
  )
}
