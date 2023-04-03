import React, { FC, memo } from 'react'

interface IQuestionsTitle {
  title: string
  className: string
}

export const QuestionsTitle: FC<IQuestionsTitle> = memo(({ title, className }) => {
  return <h4 className={className}>{title}</h4>
})
