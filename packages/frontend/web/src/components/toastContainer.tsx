import { useTransition } from 'react-spring'

import { ToastMessage } from '../providers/toast'
import { Container } from '../styles/components/toastContainer'
import Toast from './toast'

interface Props {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<Props> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
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
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  )
}

export default ToastContainer
