export interface IUserDeleteResponse {
  status: number
  message: string
  errors: { [key: string]: any } | null
}
