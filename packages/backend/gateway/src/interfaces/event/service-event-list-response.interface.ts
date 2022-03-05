import { IEvent } from './event.interface'

export interface IServiceEventListResponse {
  status: number
  message: string
  data: {
    events: IEvent[]
    totalPages: number
    totalCount: number
  }
}
