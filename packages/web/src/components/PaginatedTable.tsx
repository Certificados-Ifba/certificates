// import Spinner from 'components/Spinner'
import { useMemo } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import { PaginatedRequest } from '../services/usePaginatedRequest'
import {
  Container,
  DataTable,
  Pagination
} from '../styles/components/PaginatedTable'
import Button from './Button'

interface Props {
  request: PaginatedRequest<any, any>
  children: React.ReactNode
}

const PaginatedTable: React.FC<Props> = ({ request, children }) => {
  const {
    data,
    response,
    hasPreviousPage,
    hasNextPage,
    loadPrevious,
    loadNext
  } = request

  // const numberOfRegisters = useMemo(() => response?.headers['x-total-count'], [
  //   response
  // ])

  // const numberOfPages = useMemo(() => response?.headers['x-total-page'], [
  //   response
  // ])

  const numberOfRegisters = useMemo(() => response?.data?.data?.movie_count, [
    response
  ])

  const numberOfPages = useMemo(
    () =>
      Math.ceil(
        response?.data?.data?.movie_count / response?.data?.data?.limit
      ),
    [response]
  )
  return (
    <Container>
      {data ? (
        <div style={{ overflowY: 'auto' }}>
          <DataTable>{children}</DataTable>
        </div>
      ) : (
        <span>Carregando...</span>
        // <Spinner size={50} color={'#0091d4'} />
      )}
      {data && (
        <Pagination>
          <p>
            <span>Linhas por página</span>
            <select name="" id="">
              <option value="10">10</option>
              <option value="10">20</option>
              <option value="10">30</option>
              <option value="10">40</option>
              <option value="10">50</option>
            </select>
          </p>
          {/* <p>
            <span>
              {numberOfRegisters}
              &nbsp;registro(s)
            </span>
            <span>
              {numberOfPages}
              &nbsp;página(s)
            </span>
          </p> */}

          <nav>
            <Button
              ghost
              square
              size="small"
              disabled={!hasPreviousPage}
              onClick={loadPrevious}
            >
              <FiArrowLeft size={20} />
            </Button>
            <Button
              ghost
              square
              size="small"
              disabled={!hasNextPage}
              onClick={loadNext}
            >
              <FiArrowRight size={20} />
            </Button>
          </nav>
        </Pagination>
      )}
    </Container>
  )
}

export default PaginatedTable
