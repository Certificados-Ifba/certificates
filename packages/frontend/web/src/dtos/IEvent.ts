import { IUser } from './IUser'

export interface IEvent {
  id: string
  name: string
  local: string
  initials: string
  year: string
  edition: string
  start_date: any
  end_date: any
  user: IUser
}
