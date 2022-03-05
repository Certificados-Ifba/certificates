import { Document } from 'mongoose'

export interface IUserLink extends Document {
  id?: string
  user: string
  link: string
  is_used: boolean
  expired?: number
}
