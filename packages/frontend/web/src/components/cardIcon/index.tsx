import { Button } from '@components'
import { ReactNode } from 'react'

import { CardIconElement, Container, IconArea } from './styles'

interface Props extends CardIconElement {
  title?: string
  value?: string
  icon?: ReactNode
  buttonName?: string
  buttonIcon?: ReactNode
  onButtonClick?: () => void
}

export const CardIcon: React.FC<Props> = ({
  buttonName,
  icon,
  value,
  title,
  buttonIcon,
  onButtonClick,
  color,
  ...rest
}) => {
  return (
    <Container button={!!buttonName}>
      <div className="info">
        <IconArea color={color} {...rest}>
          {icon}
        </IconArea>
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
            color={color}
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
