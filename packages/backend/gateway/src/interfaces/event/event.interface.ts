export interface IEvent {
  name: string
  description: string
  initials: string
  year: string
  edition: string
  start_date: Date
  end_date: Date
  id?: string
  user_id: { id: string; name: string } | string
}
