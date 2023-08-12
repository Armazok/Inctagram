import { getGlobalLayout } from '@/components/layout'

const Messenger = () => {
  return (
    <div className="text-light-100 w-full pt-3 font-normal leading-6 flex justify-center">
      <span>There is a development on messenger</span>
    </div>
  )
}

Messenger.getLayout = getGlobalLayout
export default Messenger
