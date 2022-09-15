import { IActivity } from '../activity/activity.interface'
import { IEvent } from '../event/event.interface'
import { IGeneric } from '../generic/generic.interface'
import { IParticipant } from '../participant/participant.interface'

export interface ICertificate {
  id?: string
  activity?: IActivity
  function?: IGeneric
  participant?: IParticipant
  event?: IEvent
  key?: string
  workload: number
  start_date: Date
  end_date: Date
  authorship_order?: string
  additional_field?: string
}
