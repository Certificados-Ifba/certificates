export interface IUser {
  id?: string
  email: string
  role: 'ADMIN' | 'COORDINATOR' | 'PARTICIPANT'
  is_confirmed: boolean
}
