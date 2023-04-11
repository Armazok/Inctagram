import { IconPropsType } from '@/types'

export const IconWrapper: React.FC<{ icon: React.ReactNode } & IconPropsType> = ({
  icon,
  color,
  size,
  autoSize,
  ...restProps
}) => {
  return (
    <span
      role="img"
      aria-hidden="true"
      style={{
        color: color,
        width: size,
        height: size,
        display: 'inline-flex',
        fontSize: 'inherit',
      }}
      {...restProps}
    >
      {icon}
    </span>
  )
}
