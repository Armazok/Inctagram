import { FC } from 'react'

import { FaTimes } from 'react-icons/fa'
import Modal from 'react-modal'

interface Props {
  isOpen: boolean
  onConfirm: () => void
  onDecline?: () => void
  onClose: () => void
  title: string
  text: string
  disabled?: boolean
  confirmButtonText?: string
  declineButtonText?: string
}

export const Confirm: FC<Props> = ({
  isOpen,
  onConfirm,
  onDecline,
  onClose,
  title,
  text,
  disabled = false,
  confirmButtonText,
  declineButtonText,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      overlayClassName={'fixed w-full h-full top-0 left-0 bg-dark-900 z-[100]'}
      className={
        'absolute w-full max-h-[240px] max-w-[438px] bg-dark-300 border-dark-100 border rounded-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200]'
      }
    >
      <div
        className={
          'flex justify-between items-center px-[24px] py-[12px] border-b border-[#4C4C4C]'
        }
      >
        <div className={'text-[20px] leading-[36px] text-light-100 font-semibold'}>{title}</div>

        <button
          className={
            'text-[16px] font-semibold leading-6  w-[24px] h-[24px] flex items-center justify-center text-white'
          }
          onClick={() => onClose()}
          disabled={disabled}
        >
          <FaTimes size={'24px'} />
        </button>
      </div>

      <div className={'py-[30px] px-[24px] text-base text-light-100'}>{text}</div>

      <div className={'flex justify-end pb-[36px] px-[24px] gap-6'}>
        <button
          className={
            'py-[6px] px-[34px] w-[96px] h-[36px] flex justify-center align-middle border-[1px] bg-dark-300 border-accent-500 text-accent-500 leading-6 font-normal text-[16px] active:text-light-100 active:bg-accent-500'
          }
          onClick={() => onConfirm()}
          disabled={disabled}
        >
          {confirmButtonText ?? 'Yes'}
        </button>
        {onDecline ? (
          <button
            className={
              'py-[6px] px-[34px] w-max-[96px] h-[36px] flex justify-center align-middle border-[1px] bg-dark-300 border-accent-500 text-accent-500 leading-6 font-normal text-[16px] active:text-light-100 active:bg-accent-500'
            }
            onClick={() => onDecline?.()}
            disabled={disabled}
          >
            {declineButtonText ?? 'No'}
          </button>
        ) : (
          ''
        )}
      </div>
    </Modal>
  )
}
