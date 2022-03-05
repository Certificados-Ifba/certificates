import { Container } from './styles'

interface Props {
  width: number
}

export const ProgressBar: React.FC<Props> = ({ width }) => {
  return (
    <Container width={width}>
      <div className="container">
        <div className="progress">{width}%</div>
      </div>
    </Container>
  )
}
