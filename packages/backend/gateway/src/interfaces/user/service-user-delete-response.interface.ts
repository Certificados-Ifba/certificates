export interface IServiceUserDeleteResponse {
  status: number
  message: string
  errors: { [key: string]: any }
}
