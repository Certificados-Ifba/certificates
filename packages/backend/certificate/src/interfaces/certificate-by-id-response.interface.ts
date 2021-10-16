import { ICertificate } from './certificate.interface'

export interface ICertificateByIdResponse {
  status: number
  message: string
  data: {
    certificate: ICertificate | null
  }
}
