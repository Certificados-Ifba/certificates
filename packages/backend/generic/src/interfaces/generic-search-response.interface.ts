import { IGeneric } from './generic.interface'

export interface IGenericSearchResponse {
  status: number
  message: string
  generic: IGeneric | null
}
