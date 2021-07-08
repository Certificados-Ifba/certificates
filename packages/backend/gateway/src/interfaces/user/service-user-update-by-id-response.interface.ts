import { IUser } from './user.interface'

export interface IServiceUserUpdateByIdResponse {
  status: number
  message: string
  user: IUser | null
  errors: { [key: string]: any }
}
