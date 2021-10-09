import { ReactNode } from 'react'

import { Container } from '../styles/components/progressbar'

interface Props {
  width: number
}

const ProgressBar: React.FC<Props> = ({ width }) => {
  return (
    <Container width={width}>
      <div className="container">
        <div className="progress">{width}%</div>
      </div>
    </Container>
  )
}

export default ProgressBar
