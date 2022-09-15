import { IGeneric } from './generic.interface'

export interface DataResponse {
  generics: IGeneric[]
  totalPages: number
  totalCount: number
}

export interface IGenericListResponse {
  status: number
  message: string
  data: DataResponse
}
