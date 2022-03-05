import { IConfirmedPermissionStrategy } from '../interfaces/confirmed-permission-strategy.interface'
import { IUser } from '../interfaces/user.interface'
import { confirmedPermissions } from './../constants/confirmed-permissions'

export class ConfirmedStrategyService implements IConfirmedPermissionStrategy {
  public getAllowedPermissions(user: IUser, permissions: string[]): string[] {
    return user.is_confirmed
      ? permissions
      : permissions.filter((permission: string) => {
          return !confirmedPermissions.includes(permission)
        })
  }
}
