import { Bouce1, Bouce2, Container } from '../styles/components/spinner'

interface Props {
  color?: string
  size?: number
}

const Spinner: React.FC<Props> = ({ color, size = 25 }) => {
  return (
    <Container size={size}>
      <Bouce1 color={color} />
      <Bouce2 color={color} />
    </Container>
  )
}

export default Spinner
