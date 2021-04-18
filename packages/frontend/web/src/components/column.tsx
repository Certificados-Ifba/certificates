import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'

import { Container } from '../styles/components/column'

interface ColumnProps {
  selected: boolean
  order: '' | 'ASC' | 'DESC'
}

const Column: React.FC<ColumnProps> = ({ selected, order, children }) => {
  return (
    <Container>
      {children}
      {!selected || order === '' ? (
        <FaSort size={18} />
      ) : order === 'DESC' ? (
        <FaSortUp size={18} />
      ) : (
        <FaSortDown size={18} />
      )}
    </Container>
  )
}

export default Column
