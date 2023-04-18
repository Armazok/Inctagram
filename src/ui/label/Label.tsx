import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx'

export type LabelProps = {
  label?: ReactNode
  disabledLabelText?: boolean
} & ComponentPropsWithoutRef<'label'>

export const Label: FC<LabelProps> = ({
  label,
  children,
  disabledLabelText,
  className,
  ...rest
}) => {
  const classNames = {
    textStyle: clsx(disabledLabelText && 'text-light-900', !disabledLabelText && 'text-light-100'),
  }

  return (
    <label {...rest}>
      {label && (
        <div
          className={`inline-block mb-[1px] font-normal text-sm leading-6 ${classNames.textStyle}`}
        >
          {label}
        </div>
      )}
      {children}
    </label>
  )
}
