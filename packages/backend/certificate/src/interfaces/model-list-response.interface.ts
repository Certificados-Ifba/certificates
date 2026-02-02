import { IModel } from './model.interface'

export interface ModelDataResponse {
    models: IModel[]
    totalPages: number
    totalCount: number
}

export interface IModelListResponse {
    status: number
    message: string
    data: ModelDataResponse
}
