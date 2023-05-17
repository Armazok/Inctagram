import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperCheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeChecked?: (checked: boolean) => void
  spanClassName?: string
}

export const Checkbox: React.FC<SuperCheckboxPropsType> = ({
  onChange,
  onChangeChecked,
  className,
  spanClassName,
  children,
  id,

  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)

    onChangeChecked?.(e.currentTarget.checked)
  }

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        id={id}
        type={'checkbox'}
        onChange={onChangeCallback}
        className="before:content[''] before:-z-10 border-light-500 before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded border-2 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-9 before:w-9 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-white checked:before:bg-dark-300 hover:before:bg-dark-300 hover:before:opacity-100 focus:before:bg-dark-100 disabled:before:hidden disabled:border-light-900 disabled:cursor-not-allowed"
        {...restProps}
      />
      <svg
        className="pointer-events-none absolute text-white opacity-0 transition-opacity peer-checked:opacity-100"
        width="20"
        height="20"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={'peer-disabled:fill-light-900'}
          d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0ZM7 14L2 9L3.41 7.59L7 11.17L14.59 3.58L16 5L7 14Z"
          fill="white"
        />
      </svg>
      {children && (
        <span className={'ml-3 text-sm text-light-100 peer-disabled:text-light-900'}>
          {children}
        </span>
      )}
    </label>
  )
}
