import { IEvent } from './event.interface'

export interface DataResponse {
  events: IEvent[]
  totalPages: number
  totalCount: number
}

export interface IEventListResponse {
  status: number
  message: string
  data: DataResponse
}
