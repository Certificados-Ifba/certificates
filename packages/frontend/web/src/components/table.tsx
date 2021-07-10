import { DataTable } from '../styles/components/paginatedTable'
import { Container } from '../styles/components/table'

const Table: React.FC = ({ children }) => {
  return (
    <Container>
      <DataTable>{children}</DataTable>
    </Container>
  )
}

export default Table
