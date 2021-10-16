export interface IStorageCreateResponse {
  status: number
  message: string
  errors: { [key: string]: any } | null
}
