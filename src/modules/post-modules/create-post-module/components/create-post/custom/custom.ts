import { ParsedUrlQuery } from 'querystring'

import { useEffect } from 'react'

import { stateModalType } from '@/modules/post-modules/create-post-module'

export const createPostEffect = (
  setModal: (modal: stateModalType) => void,
  query: ParsedUrlQuery
) => {
  return useEffect(() => {
    if (query.create) {
      setModal('photo-uploader')
    }
  }, [query.create])
}
