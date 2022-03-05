import { Bounce1, Bounce2, Container } from './styles'

interface Props {
  color?: string
  size?: number
}

export const Spinner: React.FC<Props> = ({ color, size = 25 }) => {
  return (
    <Container size={size}>
      <Bounce1 color={color} />
      <Bounce2 color={color} />
    </Container>
  )
}
