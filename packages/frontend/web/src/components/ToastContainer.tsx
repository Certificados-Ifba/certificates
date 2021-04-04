import { useTransition } from 'react-spring'

import { ToastMessage } from '../contexts/ToastContext'
import { Container } from '../styles/components/ToastContainer'
import Toast from './Toast'

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
