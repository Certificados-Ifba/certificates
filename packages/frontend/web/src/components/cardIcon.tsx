import { ReactNode } from 'react'

import {
  CardIconElement,
  Container,
  IconArea
} from '../styles/components/cardIcon'

interface Props extends CardIconElement {
  title?: string
  value?: number
  icon?: ReactNode
}

const CardIcon: React.FC<Props> = ({ icon, value, title, ...rest }) => {
  return (
    <Container>
      <IconArea {...rest}>{icon}</IconArea>
      <div>
        <h3>{value}</h3>
        <h4>{title}</h4>
      </div>
    </Container>
  )
}

export default CardIcon
