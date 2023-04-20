import { FC } from 'react'

// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx'
import Image from 'next/image'
import Modal from 'react-modal'

import styles from './CreatePostModal.module.scss'

import ArrowBackIcon from '@/assets/icons/arrow-ios-back.svg'

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  children: any
  onBtnClick: () => void
  onBackClick: () => void
  className: string
}

export const CreatePostModal: FC<Props> = ({
  isOpen,
  onBtnClick,
  onBackClick,
  onClose,
  title,
  className,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      overlayClassName={styles.modalOverlay}
      className={styles.modal}
    >
      <div className={styles.modalHeader}>
        <Image
          onClick={onBackClick}
          className={styles.modalBackBtn}
          src={ArrowBackIcon}
          alt={'back'}
          height={24}
          width={24}
        />
        <div className={styles.modalTitle}>{title}</div>

        <button className={styles.modalBtn} onClick={() => onBtnClick()}>
          Next
        </button>
      </div>

      <div className={clsx(styles.modalBody, className)}>{children}</div>
    </Modal>
  )
}
