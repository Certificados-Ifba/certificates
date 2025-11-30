export interface IServiceStorageUploadResponse {
  status: number
  message: string
  data: string
  errors: { [key: string]: any }
}
