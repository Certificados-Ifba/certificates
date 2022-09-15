import { ReactNode } from 'react'
import { IconBaseProps } from 'react-icons'

import { Container, Row } from './styles'

interface Props {
  title: string | ReactNode
  subtitle?: string | ReactNode
  icon?: React.ComponentType<IconBaseProps>
  controls?: ReactNode
}

export const Header: React.FC<Props> = ({
  title,
  subtitle,
  icon: Icon,
  controls: Controls
}) => {
  return (
    <Container>
      <div>
        <Row>
          {Icon && <Icon size={24} />}
          <h1>{title}</h1>
        </Row>
        {subtitle && <h2>{subtitle}</h2>}
      </div>
      {Controls && Controls}
    </Container>
  )
}
