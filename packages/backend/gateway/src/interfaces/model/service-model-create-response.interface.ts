import { IModel } from './model.interface'

export interface IServiceModelCreateResponse {
  status: number
  message: string
  model: IModel | null
  errors: { [key: string]: any }
}
