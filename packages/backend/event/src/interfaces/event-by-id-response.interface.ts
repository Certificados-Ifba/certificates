import { IEvent } from './event.interface'

export interface IEventByIdResponse {
  status: number
  message: string
  data: {
    event: IEvent | null
  }
}
