import { IEvent } from './event.interface'

export interface IServiceEventSearchByUserIdResponse {
  status: number
  message: string
  events: IEvent[]
}
