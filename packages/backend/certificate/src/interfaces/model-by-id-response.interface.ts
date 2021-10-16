import { IModel } from './model.interface'

export interface IModelByIdResponse {
  status: number
  message: string
  data: {
    model: IModel | null
  }
}
