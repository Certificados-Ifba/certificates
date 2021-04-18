import { Document } from 'mongoose'

export interface IGeneric extends Document {
  type: string
  name: string
  created_at: number
  updated_at: number
}
