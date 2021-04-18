import { IUser } from './user.interface'

export interface IConfirmedPermissionStrategy {
  getAllowedPermissions: (user: IUser, permissions: string[]) => string[]
}
