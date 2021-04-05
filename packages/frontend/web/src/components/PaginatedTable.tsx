// import Spinner from 'components/Spinner'
import { useCallback, useMemo } from 'react'
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight
} from 'react-icons/fi'

import { PaginatedRequest, OptionType } from '../services/usePaginatedRequest'
import { DataTable, Pagination } from '../styles/components/PaginatedTable'
import Button from './Button'
import Select from './Select'

interface Props {
  request: PaginatedRequest<any, any>
  children: React.ReactNode
}

const PaginatedTable: React.FC<Props> = ({ request, children }) => {
  const {
    data,
    response,
    page,
    perPage,
    resetPage,
    loadNext,
    loadPrevious,
    goToPage,
    handlePerPage,
    hasPreviousPage,
    hasNextPage
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

  const loadLast = useCallback(() => {
    goToPage(numberOfPages)
  }, [])

  return (
    <>
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
          <div>
            <span className="hide-md-down">Linhas por página</span>
            <Select
              isSearchable={false}
              pageSize={2}
              onChange={handlePerPage}
              defaultValue={perPage}
              value={perPage}
              options={[
                {
                  value: 10,
                  label: '10'
                },
                {
                  value: 25,
                  label: '25'
                },
                {
                  value: 50,
                  label: '50'
                },
                {
                  value: 100,
                  label: '100'
                }
              ]}
            />
          </div>
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
              color="dark"
              disabled={!hasPreviousPage}
              onClick={resetPage}
            >
              <FiChevronsLeft size={18} />
            </Button>
            <Button
              ghost
              square
              size="small"
              color="dark"
              disabled={!hasPreviousPage}
              onClick={loadPrevious}
            >
              <FiChevronLeft size={18} />
            </Button>
            <Button
              ghost
              square
              size="small"
              color="dark"
              disabled={!hasNextPage}
              onClick={loadNext}
            >
              <FiChevronRight size={18} />
            </Button>
            <Button
              ghost
              square
              size="small"
              color="dark"
              disabled={!hasNextPage}
              onClick={loadLast}
            >
              <FiChevronsRight size={18} />
            </Button>
          </nav>
        </Pagination>
      )}
    </>
  )
}

export default PaginatedTable
