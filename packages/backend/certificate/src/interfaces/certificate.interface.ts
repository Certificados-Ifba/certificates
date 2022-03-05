import { Document, Types } from 'mongoose'

import { IActivity } from './activity.interface'
import { IEvent } from './event.interface'
import { IGeneric } from './generic.interface'
import { IParticipant } from './participant.interface'

export interface ICertificate extends Document {
  activity: IActivity
  function: IGeneric
  participant: IParticipant
  event: IEvent
  workload: number
  start_date: Date
  end_date: Date
  authorship_order: string
  additional_field: string
  created_at: number
  updated_at: number
}
