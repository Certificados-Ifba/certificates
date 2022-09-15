import { IGeneric } from './generic.interface'

export interface IServiceGenericUpdateByIdResponse {
  status: number
  message: string
  generic: IGeneric | null
  errors: { [key: string]: any }
}
