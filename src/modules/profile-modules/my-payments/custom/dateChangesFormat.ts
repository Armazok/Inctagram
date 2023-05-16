import { format } from 'date-fns'

export const dateChangesFormat = (text: string) => {
  const date = new Date(text)

  return format(date, 'dd.MM.yyyy')
}
