import React from 'react'

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

  return (
    <div className={getToastClass(type)}>
        <span>{getToastIcon(type)}</span>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
    </div>
  )
}

export default Toast