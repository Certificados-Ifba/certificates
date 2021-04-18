import { IGeneric } from './generic.interface'

export interface IServiceGenericListResponse {
  status: number
  message: string
  data: {
    generics: IGeneric[]
    totalPages: number
    totalCount: number
  }
}
