import { Spinner } from '@components'

import { Container } from './styles'

interface Props {
  active: boolean
  size?: number
}

export const Loading: React.FC<Props> = ({ active, size = 70 }) => {
  return (
    <>
      {active && (
        <Container>
          <Spinner size={size} />
        </Container>
      )}
    </>
  )
}
