export interface IActivityDeleteResponse {
  status: number
  message: string
  errors: { [key: string]: any } | null
}
