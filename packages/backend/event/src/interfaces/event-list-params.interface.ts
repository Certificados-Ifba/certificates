import { IUser } from './user.interface'

export interface IEventListParams {
  user: IUser
  name: string
  page?: number
  perPage?: number
  sortBy: string
  orderBy: 'ASC' | 'DESC'
}
