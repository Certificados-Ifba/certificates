interface IResponse {
  participant: string
  activity: string
  activityType: string
  workload: number
  start_date: Date
  end_date: Date
  function: string
  event: string
}

export interface ICertificateValidateResponse {
  status: number
  message: string
  data: IResponse | null
}
