export interface IGenericListParams {
  type: string
  name: string
  page?: number
  perPage?: number
  sortBy: string
  orderBy: 'ASC' | 'DESC'
}
