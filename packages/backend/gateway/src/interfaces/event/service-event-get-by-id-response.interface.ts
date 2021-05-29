import { IEvent } from './event.interface'

export interface IServiceEventGetByIdResponse {
  status: number
  message: string
  data: {
    user: IEvent | null
  }
}
