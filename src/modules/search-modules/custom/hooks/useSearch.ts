import { useState } from 'react'

import { useDebounce } from 'usehooks-ts'

export const useSearch = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const search = useDebounce(searchInput, 200)

  return { searchInput, setSearchInput, search }
}
