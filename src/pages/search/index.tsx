import { getGlobalLayout } from '@/components/layout'
import { SearchUsers } from '@/modules/search-modules'

const Search = () => {
  return (
    <div className="w-full">
      <SearchUsers />
    </div>
  )
}

Search.getLayout = getGlobalLayout
export default Search
