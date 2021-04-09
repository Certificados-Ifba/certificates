import { useContext } from 'react'

import { ToastContext, ToastContextData } from '../contexts/toastContext'

const useToast = (): ToastContextData => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToat must be used within a ToastProvider')
  }

  return context
}

export default useToast
