import { IUser } from './user.interface'

export interface ITokenDataResponse {
  status: number
  message: string
  data: { user: IUser } | null
}
