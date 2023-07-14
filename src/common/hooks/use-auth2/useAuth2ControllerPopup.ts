import { useState } from 'react'

export const useAuth2ControllerPopup = () => {
  const [popupContent, setPopupContent] = useState({
    content: '',
    isOpen: false,
  })

  const setAuth2ContentPopup = (isOpen: boolean, content?: string) => {
    setPopupContent({
      ...popupContent,
      content: content || '',
      isOpen: isOpen,
    })
  }
  const closePopup = () => setAuth2ContentPopup(false)

  return {
    setAuth2ContentPopup,
    popupContent,
    closePopup,
  }
}
