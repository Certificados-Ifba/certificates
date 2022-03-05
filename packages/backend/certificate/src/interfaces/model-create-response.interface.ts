import { IModel } from './model.interface'

export interface IModelCreateResponse {
  status: number
  message: string
  model: IModel | null
  errors: { [key: string]: any } | null
}
