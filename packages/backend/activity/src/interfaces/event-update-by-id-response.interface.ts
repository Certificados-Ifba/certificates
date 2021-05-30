import { IEvent } from './event.interface'

export interface IEventUpdateByIdResponse {
  status: number
  message: string
  event: IEvent | null
  errors: { [key: string]: any } | null
}
