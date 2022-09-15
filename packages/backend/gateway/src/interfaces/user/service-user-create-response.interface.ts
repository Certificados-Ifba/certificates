import { IUser } from './user.interface'

export interface IServiceUserCreateResponse {
  status: number
  message: string
  data: {
    user: IUser | null
  }
  errors: { [key: string]: any }
}
