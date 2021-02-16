import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { EventController } from './event.controller'
import { EventSchema } from './schemas/event.schema'
import { MongoConfigService } from './services/config/mongo-config.service'
import { EventService } from './services/event.service'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService
    }),
    MongooseModule.forFeature([
      {
        name: 'Event',
        schema: EventSchema
      }
    ])
  ],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
