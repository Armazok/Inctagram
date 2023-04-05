import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react'

type ButtonVariant = 'default' | 'white' | 'transparent' | 'black'

interface PropsType {
  callback?: () => void
  children: ReactNode
  className?: string | React.CSSProperties
  type: ButtonHTMLAttributes<HTMLButtonElement>['type']
  disabled?: boolean
  variant?: ButtonVariant
}

type variantClassNameType = { [Key in ButtonVariant]: string }
const variantClassName: variantClassNameType = {
  black: 'black',
  default: 'default',
  transparent: 'transparent',
  white: 'white',
}

const GlobalButton: FC<PropsType> = ({
  children,
  callback,
  type = 'button',
  disabled,
  variant,
  className,
  ...restProps
}) => {
  return (
    <button
      onClick={callback}
      type={type}
      disabled={disabled}
      {...restProps}
      className={`mainBtn ${variantClassName[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default GlobalButton
