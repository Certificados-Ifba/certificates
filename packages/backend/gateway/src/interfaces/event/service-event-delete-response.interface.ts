export interface IServiceEventDeleteResponse {
  status: number
  message: string
  errors: { [key: string]: any }
}
