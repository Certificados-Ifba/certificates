import { ReactNode } from 'react'
import { FiAlertCircle } from 'react-icons/fi'

import {
  CardIconElement,
  Container,
  IconArea
} from '../styles/components/cardIcon'
import Button from './button'

interface Props extends CardIconElement {
  title?: string
  value?: string
  icon?: ReactNode
  buttonName?: string
  buttonIcon?: ReactNode
  onButtonClick?: () => void
}

const CardIcon: React.FC<Props> = ({
  buttonName,
  icon,
  value,
  title,
  buttonIcon,
  onButtonClick,
  ...rest
}) => {
  return (
    <Container button={!!buttonName}>
      <div className="info">
        <IconArea {...rest}>{icon}</IconArea>
        <div>
          <h3>{value}</h3>
          <h4>{title}</h4>
        </div>
      </div>
      {buttonName && (
        <div className="button">
          <Button
            onClick={onButtonClick}
            inline
            ghost
            color={rest.color}
            size="default"
            type="button"
          >
            {buttonIcon} <span>{buttonName}</span>
          </Button>
        </div>
      )}
    </Container>
  )
}

export default CardIcon
