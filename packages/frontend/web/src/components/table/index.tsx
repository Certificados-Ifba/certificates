import { Container, DataTable } from './styles'

interface Props {
  overflowY?: boolean
}

export type { Props as TableProps }

export const Table: React.FC<Props> = ({ children, overflowY = true }) => {
  return (
    <Container overflowY={overflowY}>
      <DataTable>{children}</DataTable>
    </Container>
  )
}
