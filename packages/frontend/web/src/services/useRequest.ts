import { api } from '@services'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import useSWR, { SWRConfiguration, SWRResponse } from 'swr'

export type GetRequest = AxiosRequestConfig

export interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'revalidate' | 'error'
  > {
  data: Data | undefined
  response: AxiosResponse<Data> | undefined
  requestKey: string
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    'initialData'
  > {
  initialData?: Data
}

export function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  { initialData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const requestKey = request && JSON.stringify(request)

  const { data: response, error, isValidating, revalidate } = useSWR<
    AxiosResponse<Data>,
    AxiosError<Error>
  >(requestKey, () => api(request), {
    ...config,
    initialData: initialData && {
      status: 200,
      statusText: 'InitialData',
      config: request,
      headers: {},
      data: initialData
    }
  })

  return {
    data: response?.data,
    requestKey,
    response,
    error,
    isValidating,
    revalidate
  }
}
