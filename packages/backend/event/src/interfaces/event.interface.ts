import { Document } from 'mongoose'

export interface IEvent extends Document {
  user_id: string
  name: string
  description: string
  initials: string
  year: string
  edition: string
  start_date: Date
  end_date: Date
  created_at: number
  updated_at: number
}
