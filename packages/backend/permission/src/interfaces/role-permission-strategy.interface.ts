import { IUser } from './user.interface'

export interface IRolePermissionStrategy {
  getUserPermissions: (user: IUser) => string[]
}
