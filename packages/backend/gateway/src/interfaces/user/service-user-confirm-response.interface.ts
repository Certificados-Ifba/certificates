import { IUser } from './user.interface'

export interface IServiceUserConfirmResponse {
  status: number
  message: string
  user: IUser | null
  errors: { [key: string]: any }
}
