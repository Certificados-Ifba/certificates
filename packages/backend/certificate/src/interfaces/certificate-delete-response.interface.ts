export interface ICertificateDeleteResponse {
  status: number
  message: string
  errors: { [key: string]: any } | null
}
