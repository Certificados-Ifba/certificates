import { IUser } from './user.interface'

export interface IServiceUserGetByIdResponse {
  status: number
  message: string
  data: {
    user: IUser | null
  }
}
