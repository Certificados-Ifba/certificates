import { Document } from 'mongoose'

interface IUser extends Document {
  id: string
  name: string
  email: string
  role: string
  is_confirmed: boolean
  last_login?: Date
}

export interface IEvent extends Document {
  user: IUser | string
  name: string
  local: string
  initials: string
  year: string
  edition: string
  start_date: Date
  end_date: Date
  created_at: number
  updated_at: number
}
