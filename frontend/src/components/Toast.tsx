import React from 'react'
import { createPortal } from 'react-dom'

type ToastProps = {
    message: string
    type: 'error' | 'success' | 'info'
    isVisible: boolean
    onClose: () => void
}
function Toast({ message, type, isVisible, onClose }: ToastProps) {
    const getToastClass = (type: string) => `toast toast-${type}`
    const getToastIcon = (type: string) => {
        switch (type) {
            case 'error': return '❌'
            case 'success': return '✅'
            case 'info': return 'ℹ️'
            default: return ''
        }
    }
    if (!isVisible) {
        return null
    }

  const toastMarkup = (
    <div className={getToastClass(type)} role="status" aria-live="polite">
        <span aria-hidden="true">{getToastIcon(type)}</span>
        <p>{message}</p>
        <button onClick={onClose} type="button" aria-label="Close notification">Close</button>
    </div>
  )

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return toastMarkup
  }

  return createPortal(toastMarkup, document.body)
}

export default Toast