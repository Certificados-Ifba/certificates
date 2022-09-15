import { IGeneric } from './generic.interface'

export interface IServiceGenericCreateResponse {
  status: number
  message: string
  generic: IGeneric | null
  errors: { [key: string]: any }
}
