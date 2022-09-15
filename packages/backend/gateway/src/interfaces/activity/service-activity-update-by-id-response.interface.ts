import { IActivity } from './activity.interface'

export interface IServiceActivityUpdateByIdResponse {
  status: number
  message: string
  activity: IActivity | null
  errors: { [key: string]: any }
}
