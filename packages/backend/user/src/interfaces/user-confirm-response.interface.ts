import { IUser } from './user.interface'

export interface IUserConfirmResponse {
  status: number
  message: string
  user: IUser | null
  errors: { [key: string]: any } | null
}
