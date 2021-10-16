import { IActivity } from './activity.interface'

export interface IActivityUpdateByIdResponse {
  status: number
  message: string
  activity: IActivity | null
  errors: { [key: string]: any } | null
}
