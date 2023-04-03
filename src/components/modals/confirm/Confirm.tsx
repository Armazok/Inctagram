import { FC } from 'react'

import { FaTimes } from 'react-icons/fa'
import Modal from 'react-modal'

import styles from './Confirm.module.scss'

interface Props {
  isOpen: boolean
  onConfirm: () => void
  onDecline: () => void
  onClose: () => void
  title: string
  text: string
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
  confirmButtonText,
  declineButtonText,
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
        <div className={styles.modalTitle}>{title}</div>

        <button className={styles.modalClose} onClick={() => onClose()}>
          <FaTimes />
        </button>
      </div>

      <div className={styles.modalBody}>{text}</div>

      <div className={styles.modalFooter}>
        <button onClick={() => onConfirm()}>{confirmButtonText ?? 'Yes'}</button>
        <button onClick={() => onDecline()}>{declineButtonText ?? 'No'}</button>
      </div>
    </Modal>
  )
}
