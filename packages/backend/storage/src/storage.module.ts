import { Module } from '@nestjs/common'

import { StorageService } from './services/storage.service'
import { StorageController } from './storage.controller'

@Module({
  controllers: [StorageController],
  providers: [StorageService]
})
export class StorageModule {}
