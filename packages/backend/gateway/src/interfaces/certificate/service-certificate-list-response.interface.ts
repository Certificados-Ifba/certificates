import { ICertificate } from './certificate.interface'

export interface IServiceCertificateListResponse {
  status: number
  message: string
  data: {
    certificates: ICertificate[]
    totalPages: number
    totalCount: number
  }
}
