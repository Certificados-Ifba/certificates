import { IPermissionStrategy } from '../interfaces/permission-strategy.interface'
import { IUser } from '../interfaces/user.interface'

export class ConfirmedStrategyService implements IPermissionStrategy {
  public getAllowedPermissions(user: IUser, permissions: string[]): string[] {
    const forbiddenPermissions = [
      'event_search_by_user_id',
      'event_create',
      'event_delete_by_id',
      'event_update_by_id'
    ]
    return user.is_confirmed
      ? permissions
      : permissions.filter((permission: string) => {
          return !forbiddenPermissions.includes(permission)
        })
  }
}
