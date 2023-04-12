import React, { FC, memo } from 'react'

interface IFuture {}

const Future: FC<IFuture> = memo(({}) => {
  return (
    <div>
      <h1>Future</h1>
    </div>
  )
})

// className={'flex flex-col text-danger-300 items-center mt-48 uppercase'}
export default Future
