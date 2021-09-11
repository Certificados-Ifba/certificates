import { IActivity } from './activity.interface'

export interface IServiceActivityCreateResponse {
  status: number
  message: string
  activity: IActivity | null
  errors: { [key: string]: any }
}
