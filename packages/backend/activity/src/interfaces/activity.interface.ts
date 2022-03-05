import { Document, Types } from 'mongoose'

import { IGeneric } from './generic.interface'

export interface IActivity extends Document {
  event: Types.ObjectId
  type: IGeneric
  name: string
  workload: number
  start_date: Date
  end_date: Date
  created_at: number
  updated_at: number
}
