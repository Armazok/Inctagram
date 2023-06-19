import { FC } from 'react'

import { clsx } from 'clsx'

export const Skeleton: FC<{ classes: any }> = ({ classes }) => {
  const classNames = clsx(
    classes,
    'h-5 w-24 rounded-full bg-dark-300 dark:bg-dark-500 animate-pulse m-auto'
  )

  return <div className={classNames}></div>
}
