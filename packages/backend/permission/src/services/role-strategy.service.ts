import { adminPermissions } from '../constants/admin-permissions'
import { coordinatorPermissions } from '../constants/coordinator-permissions'
import { IRolePermissionStrategy } from '../interfaces/role-permission-strategy.interface'
import { IUser } from '../interfaces/user.interface'
import { participantPermissions } from './../constants/participant-permissions'

export class RoleStrategyService implements IRolePermissionStrategy {
  public getUserPermissions(user: IUser): string[] {
    return user.role === 'ADMIN'
      ? adminPermissions
      : user.role === 'COORDINATOR'
      ? coordinatorPermissions
      : user.role === 'PARTICIPANT'
      ? participantPermissions
      : []
  }
}
