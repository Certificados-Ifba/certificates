import { Bounce1, Bounce2, Container } from '../styles/components/spinner'

interface Props {
  color?: string
  size?: number
}

const Spinner: React.FC<Props> = ({ color, size = 25 }) => {
  return (
    <Container size={size}>
      <Bounce1 color={color} />
      <Bounce2 color={color} />
    </Container>
  )
}

export default Spinner
