import { DataTable } from '../styles/components/paginatedTable'
import { Container, TableProps } from '../styles/components/table'

const Table: React.FC<TableProps> = ({ children, overflowY = true }) => {
  return (
    <Container overflowY={overflowY}>
      <DataTable>{children}</DataTable>
    </Container>
  )
}

export default Table
