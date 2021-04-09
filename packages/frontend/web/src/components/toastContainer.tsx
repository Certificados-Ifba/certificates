import { useTransition } from 'react-spring'

import { ToastMessage } from '../contexts/toastContext'
import { Container } from '../styles/components/toastContainer'
import Toast from './toast'

interface ToastContainerProps {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTranstions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 }
    }
  )

  return (
    <Container>
      {messagesWithTranstions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  )
}

export default ToastContainer
