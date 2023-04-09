import React, { FC, memo } from 'react'

interface IFuture {}

const Future: FC<IFuture> = memo(({}) => {
  return (
    <div className={'flex flex-col text-danger-300 items-center mt-48 uppercase'}>
      The future is ours
    </div>
  )
})

export default Future
