import { Module } from '@nestjs/common'

import { PermissionController } from './permission.controller'
import { ConfigService } from './services/config/config.service'
import { ConfirmedStrategyService } from './services/confirmed-strategy.service'

@Module({
  imports: [],
  controllers: [PermissionController],
  providers: [ConfigService, ConfirmedStrategyService]
})
export class PermissionModule {}
