export interface ICertificateListParams {
  event?: string
  user?: string
  page?: number
  perPage?: number
  sortBy: string
  orderBy: 'ASC' | 'DESC'
}
