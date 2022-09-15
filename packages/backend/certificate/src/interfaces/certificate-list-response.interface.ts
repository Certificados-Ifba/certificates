import { ICertificate } from './certificate.interface'

export interface DataResponse {
  certificates: ICertificate[]
  totalPages: number
  totalCount: number
}

export interface ICertificateListResponse {
  status: number
  message: string
  data: DataResponse
}
