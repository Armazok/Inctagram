import React, { FC } from 'react'

type PropsType = {
  children: React.ReactNode | any
  className: string
}
const FormLayout: FC<Partial<PropsType>> = ({ children, className }) => {
  return (
    <div
      className={`container flex flex-col items-center w-full max-w-sm bg-secondBgColor rounded-[2px] ${className}`}
    >
      <div className="flex flex-col justify-center items-center w-full pt-[23px] pr-[24px] pb-[42px] pl-[24px] ">
        {children}
      </div>
    </div>
  )
}

export default FormLayout
