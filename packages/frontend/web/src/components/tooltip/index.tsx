import { Container } from './styles'

interface Props {
  title: string
  className?: string
}

export const Tooltip: React.FC<Props> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  )
}
