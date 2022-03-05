import { Toast } from '@components'
import { ToastMessage } from '@providers'
import { useTransition } from 'react-spring'

import { Container } from './styles'

interface Props {
  messages: ToastMessage[]
}

export const ToastContainer: React.FC<Props> = ({ messages }) => {
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
