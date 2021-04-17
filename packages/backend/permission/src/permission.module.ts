import { Module } from '@nestjs/common'

import { PermissionController } from './permission.controller'
import { ConfigService } from './services/config/config.service'
import { ConfirmedStrategyService } from './services/confirmed-strategy.service'
import { RoleStrategyService } from './services/role-strategy.service'

@Module({
  imports: [],
  controllers: [PermissionController],
  providers: [ConfigService, ConfirmedStrategyService, RoleStrategyService]
})
export class PermissionModule {}
