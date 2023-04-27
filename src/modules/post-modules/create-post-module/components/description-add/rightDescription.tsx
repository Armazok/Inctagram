import React, { ChangeEvent, FC } from 'react'

import { useGetProfile } from '@/modules/profile-modules/settings-edit-profile-module'
import { Avatar, Textarea } from '@/ui'

const MAX_CHARACTERS = 500

type RightDescriptionType = {
  text?: string
  setText: (newText: string) => void
}

export const RightDescription: FC<RightDescriptionType> = ({ text, setText }) => {
  const { profileData, profileAvatar } = useGetProfile()
  const avatar = profileAvatar && profileAvatar
  const userName = profileData && profileData.userName
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value)
  }

  return (
    <div className={'flex flex-col '}>
      <div className={'flex text-center'}>
        <Avatar alt={'photoAvatar'} width={55} height={55} src={avatar} />
        <div>{userName}</div>
      </div>
      <div className={'flex'}>
        <Textarea
          maxLength={MAX_CHARACTERS}
          value={text}
          onChange={handleTextChange}
          label={'Add publication description'}
        />
        <p>{text ? `${text.length} / ${MAX_CHARACTERS}` : '0 / 500'}</p>
      </div>

      {/*<Location />*/}
    </div>
  )
}
