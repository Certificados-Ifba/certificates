import { Spinner } from '@components'

import { Container } from './styles'

interface Props {
  active?: boolean
  color?: string
  size?: number
}

export const Loading: React.FC<Props> = ({
  active = true,
  color,
  size = 70
}) => {
  return (
    <>
      {active && (
        <Container>
          <Spinner color={color} size={size} />
        </Container>
      )}
    </>
  )
}
