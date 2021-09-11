import { useCallback, useMemo } from 'react'
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight
} from 'react-icons/fi'
import ScrollBar from 'simplebar-react'

import { PaginatedRequest } from '../services/usePaginatedRequest'
import {
  DataTable,
  Pagination,
  NoDataContainer,
  PaginateList
} from '../styles/components/paginatedTable'
import { ReactSelect } from '../styles/components/select'
import theme from '../styles/theme'
import Button from './button'
import Spinner from './spinner'

import 'simplebar/dist/simplebar.min.css'

interface Props {
  request: PaginatedRequest<any, any>
  children: React.ReactNode
}

const PaginatedTable: React.FC<Props> = ({ request, children }) => {
  const {
    data,
    error,
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

  const numberOfRegisters = useMemo(() => response?.headers['x-total-count'], [
    response
  ])

  const numberOfPages = useMemo(() => response?.headers['x-total-page'], [
    response
  ])

  const loadLast = useCallback(() => {
    goToPage(Number(numberOfPages))
  }, [goToPage, numberOfPages])

  const pages = useMemo(() => {
    const pages = []
    for (let index = 1; index <= numberOfPages; index++) {
      const upper = page + (page < 5 ? 7 - page : 3)
      const lower =
        page - (page + 3 > numberOfPages ? page + 6 - numberOfPages : 3)
      if (
        (index > lower && index < upper) ||
        index === 1 ||
        index === Number(numberOfPages)
      ) {
        pages.push({
          value:
            (index - 1 > lower && index + 1 < upper) ||
            index < 3 ||
            index > numberOfPages - 2
              ? index
              : 0,
          label:
            (index - 1 > lower && index + 1 < upper) ||
            index < 3 ||
            index > numberOfPages - 2
              ? String(index)
              : '...'
        })
      }
    }
    return pages
  }, [page, numberOfPages])

  return (
    <>
      {/* <div style={{ overflowY: 'auto' }}> */}
      <ScrollBar>
        <DataTable>{children}</DataTable>
      </ScrollBar>
      {/* </div> */}
      {(!data || data?.data?.length === 0) && (
        <NoDataContainer>
          {data?.data?.length === 0 ? (
            <span>Não há registros a serem exibidos</span>
          ) : error ? (
            <span>Ocorreu um erro, entre em contato com o adminstrador</span>
          ) : (
            <Spinner size={50} color={theme.colors.secondary} />
          )}
        </NoDataContainer>
      )}
      <Pagination>
        <div>
          <span className="hide-md-down">Linhas por página</span>
          <ReactSelect
            menuPosition="fixed"
            instanceId="perPage"
            isSearchable={false}
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
        <span className="hide-md-down">
          {`${
            !data || data?.data?.length === 0
              ? 0
              : 1 + (page - 1) * perPage.value
          } - ${
            !data ? 0 : !hasNextPage ? numberOfRegisters : page * perPage.value
          } de ${!data ? 0 : numberOfRegisters}`}
        </span>
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
          <PaginateList className="hide-md-down">
            {pages.map(({ value, label }, key) => (
              <Button
                key={key}
                ghost
                square
                size="small"
                color="dark"
                disabled={value === page}
                onClick={() => goToPage(value)}
              >
                <span>{label}</span>
              </Button>
            ))}
          </PaginateList>
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
    </>
  )
}

export default PaginatedTable
