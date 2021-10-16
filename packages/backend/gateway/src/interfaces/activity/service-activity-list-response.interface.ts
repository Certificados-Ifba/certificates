import { IActivity } from './activity.interface'

export interface IServiceActivityListResponse {
  status: number
  message: string
  data: {
    activities: IActivity[]
    totalPages: number
    totalCount: number
  }
}
