export interface IEventListParams {
  name: string
  page?: number
  perPage?: number
  sortBy: string
  orderBy: 'ASC' | 'DESC'
}
