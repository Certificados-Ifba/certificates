import { Document, Types } from 'mongoose'

export interface ICertificate extends Document {
  activity: Types.ObjectId
  function: Types.ObjectId
  participant: Types.ObjectId
  event: Types.ObjectId
  workload: number
  start_date: Date
  end_date: Date
  authorship_order: string
  additional_field: string
  created_at: number
  updated_at: number
}
