import { IconBaseProps } from 'react-icons'

import { Container } from './styles'

interface Props {
  type?: 'info' | 'warning' | 'danger' | 'success'
  marginBottom?: 'sm' | 'md' | 'lg' | 'xs'
  size?: 'sm' | 'lg' | 'md'
  icon?: React.ComponentType<IconBaseProps>
  card?: boolean
}

export const Alert: React.FC<Props> = ({
  type,
  marginBottom,
  size,
  children,
  icon: Icon,
  card
}) => {
  let iconSize: number
  let fontSize: string
  switch (size) {
    case 'sm': {
      iconSize = 20
      fontSize = '0.875rem'
      break
    }
    case 'lg': {
      iconSize = 30
      fontSize = '1.3rem'
      break
    }
    default: {
      iconSize = 25
      fontSize = '1rem'
      break
    }
  }
  return (
    <Container
      className="alert"
      fontSize={fontSize}
      type={type}
      marginBottom={marginBottom}
      card={card}
    >
      {Icon && (
        <span className="alert-icon">
          <Icon size={iconSize} />
        </span>
      )}
      <span className="message">{children}</span>
    </Container>
  )
}
