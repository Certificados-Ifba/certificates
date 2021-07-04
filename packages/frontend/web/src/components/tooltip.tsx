import { Container } from '../styles/components/tooltip'

interface Props {
  title: string
  className?: string
}

const Tooltip: React.FC<Props> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  )
}

export default Tooltip
