import { IEvent } from './event.interface'

export interface IServiceEventUpdateByIdResponse {
  status: number
  message: string
  event: IEvent | null
  errors: { [key: string]: any }
}
