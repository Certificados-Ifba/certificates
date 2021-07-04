import IUser from './IUser'

export default interface IEvent {
  id: string
  name: string
  local: string
  initials: string
  year: string
  edition: string
  start_date: string
  end_date: string
  user: IUser
}
