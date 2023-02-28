export interface IStorageCreateResponse {
  status: number
  message: string
  data: string | null
  errors: { [key: string]: any } | null
}
