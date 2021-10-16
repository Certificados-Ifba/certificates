import { ICertificate } from './certificate.interface'

export interface IServiceCertificateCreateResponse {
  status: number
  message: string
  certificate: ICertificate | null
  errors: { [key: string]: any }
}
