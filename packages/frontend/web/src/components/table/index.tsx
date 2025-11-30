import { ScrollWrapper, Container } from './styles'

export const Table: React.FC = ({ children }) => {
  return (
    <ScrollWrapper>
      <Container>{children}</Container>
    </ScrollWrapper>
  )
}
