import { IActivity } from './activity.interface'

export interface IActivityCreateResponse {
  status: number
  message: string
  activity: IActivity | null
  errors: { [key: string]: any } | null
}
