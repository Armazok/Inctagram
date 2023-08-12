import { getGlobalLayout } from '@/components/layout'

const Favorites = () => {
  return (
    <div className="text-light-100 w-full pt-3 font-normal leading-6 flex justify-center">
      <span>There is a development on favorites</span>
    </div>
  )
}

Favorites.getLayout = getGlobalLayout
export default Favorites
