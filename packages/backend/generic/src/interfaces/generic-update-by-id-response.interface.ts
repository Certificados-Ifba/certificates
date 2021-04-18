import { IGeneric } from './generic.interface'

export interface IGenericUpdateByIdResponse {
  status: number
  message: string
  generic: IGeneric | null
  errors: { [key: string]: any } | null
}
