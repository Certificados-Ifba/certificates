export interface IUser {
  id: string
  name: string
  email: string
  role: string
  is_confirmed: boolean
  last_login?: Date
}
