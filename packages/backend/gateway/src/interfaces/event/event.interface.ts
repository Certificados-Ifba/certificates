import { IUser } from '../user/user.interface'

export interface IEvent {
  id?: string
  name: string
  local: string
  initials: string
  year: string
  edition: string
  start_date: Date
  end_date: Date
  user: IUser
}
