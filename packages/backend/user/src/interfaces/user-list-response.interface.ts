import { IUser } from './user.interface'

export interface DataResponse {
  users: IUser[]
  totalPages: number
  totalCount: number
}

export interface IUserListResponse {
  status: number
  message: string
  data: DataResponse
}
