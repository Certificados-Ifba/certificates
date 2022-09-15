import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'

import { Container } from './styles'

interface Props {
  selected: boolean
  order: '' | 'ASC' | 'DESC'
}

export const Column: React.FC<Props> = ({ selected, order, children }) => {
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
