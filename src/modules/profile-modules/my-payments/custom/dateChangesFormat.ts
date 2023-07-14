import { format } from 'date-fns'

export const dateChangesFormat = (text: string | undefined) => {
  if (text) {
    const date = new Date(text)

    return format(date, 'dd.MM.yyyy')
  }
}
