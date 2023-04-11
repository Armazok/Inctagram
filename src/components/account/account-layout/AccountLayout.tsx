import React, { FC, ReactNode } from 'react'

const AccountLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="max-w-[750px] w-full pt-[24px] pl-[24px] pb-[24px]">{children}</div>
}

export default AccountLayout
