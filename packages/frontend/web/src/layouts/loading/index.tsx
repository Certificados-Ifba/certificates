import { Loading } from '@components'

import { Container } from './styles'

export const LoadingLayout: React.FC = () => {
  return (
    <Container>
      <Loading size={100} />
    </Container>
  )
}
