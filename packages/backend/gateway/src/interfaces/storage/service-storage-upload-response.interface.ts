export interface IServiceStorageUploadResponse {
  status: number
  message: string
  errors: { [key: string]: any }
}
