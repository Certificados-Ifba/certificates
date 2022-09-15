import { IEvent } from './event.interface'

export interface IEventSearchByUserResponse {
  status: number
  message: string
  events: IEvent[]
}
