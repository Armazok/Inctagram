import React, { ChangeEvent, FC } from 'react'

import { Location } from '@/modules/post-modules/create-post-module/components/location/location'
import { useGetProfile } from '@/modules/profile-modules/settings-edit-profile-module'
import { usePostStore, useUserStore } from '@/store'
import { Avatar, GlobalButton, Textarea } from '@/ui'
import { Button } from '@/ui/buttons/stories/GlobalButton.stories'

const MAX_CHARACTERS = 500

type RightDescriptionType = {
  location: boolean
  callback?: () => void
}

export const RightDescription: FC<RightDescriptionType> = ({ location, callback }) => {
  const { profileData, profileAvatar } = useGetProfile()
  const avatar = profileAvatar && profileAvatar
  const userName = profileData && profileData.userName

  const { setPostDescription, postDescription } = usePostStore()

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostDescription(e.currentTarget.value)
  }

  return (
    <div className={'flex flex-col w-[536px] '}>
      <div className={'flex text-center'}>
        <Avatar alt={'photoAvatar'} width={55} height={55} src={avatar} />
        <div>{userName}</div>
      </div>
      <div className={'flex'}>
        <Textarea
          maxLength={MAX_CHARACTERS}
          value={postDescription}
          onChange={handleTextChange}
          label={'Add publication description'}
        />
        <p>{postDescription ? `${postDescription.length} / ${MAX_CHARACTERS}` : '0 / 500'}</p>
      </div>

      {location ? (
        <Location />
      ) : (
        <GlobalButton callback={callback} type={'submit'}>
          Edit
        </GlobalButton>
      )}
    </div>
  )
}
