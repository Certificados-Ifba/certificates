import IParticipant from './IParticipant'

export default interface ICertificate {
  id?: string
  activity?: string
  function?: string
  participant?: IParticipant
  event?: string
  key?: string
  workload: number
  start_date: Date
  end_date: Date
  authorship_order?: string
  additional_field?: string
}
