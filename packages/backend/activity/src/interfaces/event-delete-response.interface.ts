export interface IEventDeleteResponse {
  status: number
  message: string
  errors: { [key: string]: any } | null
}
