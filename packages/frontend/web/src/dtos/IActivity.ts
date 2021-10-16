import { IEvent } from './../../../../backend/event/src/interfaces/event.interface'
import IGeneric from './IGeneric'

export default interface IActivity {
  id: string
  name: string
  type: IGeneric
  workload: string
  start_date: string
  end_date: string
  event: IEvent
}
