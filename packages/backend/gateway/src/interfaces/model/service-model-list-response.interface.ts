import { IModel } from './model.interface'

export interface IServiceModelListResponse {
    status: number
    message: string
    data: {
        models: IModel[]
        totalPages: number
        totalCount: number
    }
}
