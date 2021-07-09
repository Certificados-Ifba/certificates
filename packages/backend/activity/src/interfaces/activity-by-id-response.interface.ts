import { IActivity } from './activity.interface'

export interface IActivityByIdResponse {
  status: number
  message: string
  data: {
    activity: IActivity | null
  }
}
