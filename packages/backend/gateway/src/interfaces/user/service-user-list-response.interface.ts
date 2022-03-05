import { IUser } from './user.interface'

export interface IServiceUserListResponse {
  status: number
  message: string
  data: {
    users: IUser[]
    totalPages: number
    totalCount: number
  }
}
