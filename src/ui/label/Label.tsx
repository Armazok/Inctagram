import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

export type LabelProps = {
  label?: ReactNode
} & ComponentPropsWithoutRef<'label'>

export const Label: FC<LabelProps> = ({ label, children, className, ...rest }) => {
  return (
    <label {...rest}>
      {label && (
        <div
          className={`inline-block mb-[1px] font-normal text-sm leading-6 text-light-100 ${className}`}
        >
          {label}
        </div>
      )}
      {children}
    </label>
  )
}
