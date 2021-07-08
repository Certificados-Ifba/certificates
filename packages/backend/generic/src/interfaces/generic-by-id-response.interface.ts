import { IGeneric } from './generic.interface'

export interface IGenericByIdResponse {
  status: number
  message: string
  generic: IGeneric | null
}
