export interface IModelDeleteResponse {
  status: number
  message: string
  errors: { [key: string]: any } | null
}
