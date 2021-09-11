import { ICertificate } from './certificate.interface'

export interface ICertificateCreateResponse {
  status: number
  message: string
  certificate: ICertificate | null
  errors: { [key: string]: any } | null
}
