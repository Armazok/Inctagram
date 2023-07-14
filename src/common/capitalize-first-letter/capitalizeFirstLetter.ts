export const capitalizeFirstLetter = (text: string | undefined) => {
  if (text) return text[0].toUpperCase() + text.slice(1).toLowerCase()
}
