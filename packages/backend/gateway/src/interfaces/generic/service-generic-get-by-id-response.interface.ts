import { IGeneric } from './generic.interface'

export interface IServiceGenericGetByIdResponse {
  status: number
  message: string
  generic: IGeneric | null
}
