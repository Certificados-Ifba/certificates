export interface IServiceGenericDeleteResponse {
  status: number
  message: string
  errors: { [key: string]: any }
}
