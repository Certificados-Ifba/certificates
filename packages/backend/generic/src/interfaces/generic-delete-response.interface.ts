export interface IGenericDeleteResponse {
  status: number
  message: string
  errors: { [key: string]: any } | null
}
