import { FiInfo, FiAlertCircle } from 'react-icons/fi'

import { Container } from '../styles/components/Alert'

export interface AlertProps {
  type: 'info' | 'warning' | 'danger'
  message: any
  marginBottom?: string
  size?: string
  hideIcon?: boolean
}

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  marginBottom,
  size,
  hideIcon
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
    <Container fontSize={fontSize} type={type} marginBottom={marginBottom}>
      {!hideIcon && (
        <span className="alert-icon">
          {type === 'info' && <FiInfo size={iconSize} />}
          {type === 'warning' && <FiAlertCircle size={iconSize} />}
          {type === 'danger' && <FiAlertCircle size={iconSize} />}
        </span>
      )}
      <span className="message">{message}</span>
    </Container>
  )
}

export default Alert
