import { IUser } from './user.interface'

export interface IUserUpdateByIdResponse {
  status: number
  message: string
  user: IUser | null
  errors: { [key: string]: any } | null
}
