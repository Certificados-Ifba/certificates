export interface IStorageDataResponse {
  status: number
  message: string
  data: Buffer | null
  errors: { [key: string]: any } | null
}
