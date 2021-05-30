import { IEvent } from './event.interface'

export interface IEventCreateResponse {
  status: number
  message: string
  event: IEvent | null
  errors: { [key: string]: any } | null
}
