import { useEffect } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'

import { ToastMessage, useToast } from '../providers/toast'
import { Container } from '../styles/components/toast'

const icons = {
  info: FiInfo,
  warning: FiAlertCircle,
  error: FiXCircle,
  success: FiCheckCircle
}

interface Props {
  message: ToastMessage
  style: object
}

const Toast: React.FC<Props> = ({ message, style }) => {
  const { removeToast } = useToast()
  const Icon = icons[message.type || 'info']

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [removeToast, message.id])

  return (
    <Container type={message.type} style={style}>
      <Icon size={24} />

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={20} />
      </button>
    </Container>
  )
}

export default Toast
