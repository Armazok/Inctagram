import React, { FC, memo } from 'react'

import { Properties } from 'hast'

interface INameTitle {
  nameTitle: string
  className: string
}

export const NameTitle: FC<INameTitle> = memo(({ nameTitle, className }) => {
  return <h2 className={className}>{nameTitle}</h2>
})
