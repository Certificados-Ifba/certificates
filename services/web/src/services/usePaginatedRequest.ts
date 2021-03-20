import { AxiosRequestConfig } from 'axios'
import { useState, useCallback, useMemo } from 'react'

import useRequest, { Return } from './useRequest'

export interface PaginatedRequest<Data, Error> extends Return<Data, Error> {
  resetPage: () => void
  loadPrevious: () => void
  loadNext: () => void
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export default function usePaginatedRequest<Data = any, Error = any>(
  request: AxiosRequestConfig
): PaginatedRequest<Data, Error> {
  const [page, setPage] = useState(1)

  const { response, requestKey, ...rest } = useRequest<any, Error>({
    ...request,
    params: { page, ...request.params }
  })

  const hasPreviousPage = useMemo(() => page > 1, [page])
  const hasNextPage = useMemo(
    () =>
      page <
      Math.ceil(
        response?.data?.data?.movie_count / response?.data?.data?.limit
      ),
    [page, response]
  )

  const resetPage = useCallback(() => {
    setPage(1)
  }, [])

  const loadPrevious = useCallback(() => {
    setPage(current => (hasPreviousPage ? current - 1 : current))
  }, [hasPreviousPage])

  const loadNext = useCallback(() => {
    setPage(current => (hasNextPage ? current + 1 : current))
  }, [hasNextPage])

  return {
    ...rest,
    requestKey,
    response,
    resetPage,
    loadNext,
    loadPrevious,
    hasPreviousPage,
    hasNextPage
  }
}
