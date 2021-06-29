export interface IUserListParams {
  name: string
  participant?: boolean
  page?: number
  perPage?: number
  sortBy: string
  orderBy: 'ASC' | 'DESC'
}
