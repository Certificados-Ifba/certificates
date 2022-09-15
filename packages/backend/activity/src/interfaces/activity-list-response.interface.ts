import { IActivity } from './activity.interface'

export interface DataResponse {
  activities: IActivity[]
  totalPages: number
  totalCount: number
}

export interface IActivityListResponse {
  status: number
  message: string
  data: DataResponse
}
