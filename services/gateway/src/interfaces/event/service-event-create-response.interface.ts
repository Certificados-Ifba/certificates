import { IEvent } from './event.interface'

export interface IServiceEventCreateResponse {
  status: number
  message: string
  event: IEvent | null
  errors: { [key: string]: any }
}
