import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ClientProxyFactory } from '@nestjs/microservices'
import { TerminusModule } from '@nestjs/terminus'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'

import { ActivitiesController } from './controllers/activities.controller'
import { ActivityTypesController } from './controllers/activity-types.controller'
import { CertificatesController } from './controllers/certificates.controller'
import { EventActivitiesController } from './controllers/event/event-activity.controller'
import { EventParticipantsController } from './controllers/event/event-participant.controller'
import { EventsController } from './controllers/events.controller'
import { FunctionsController } from './controllers/functions.controller'
import { HealthController } from './controllers/health.controller'
import { ParticipantsController } from './controllers/participants.controller'
import { PasswordController } from './controllers/password.controller'
import { SessionsController } from './controllers/sessions.controller'
import { TestEventsController } from './controllers/test.controller'
import { UsersController } from './controllers/users.controller'
import { ConfigService } from './services/config/config.service'
import { ThrottlerConfigService } from './services/config/throttler.service'
import { AuthGuard } from './services/guards/authorization.guard'
import { PermissionGuard } from './services/guards/permission.guard'

@Module({
  imports: [
    TerminusModule
    // ThrottlerModule.forRootAsync({
    //   useClass: ThrottlerConfigService
    // })
  ],
  controllers: [
    ActivitiesController,
    ActivityTypesController,
    CertificatesController,
    EventsController,
    FunctionsController,
    ParticipantsController,
    TestEventsController,
    UsersController,
    EventParticipantsController,
    SessionsController,
    PasswordController,
    HealthController
  ],
  providers: [
    ConfigService,
    {
      provide: 'ACTIVITY_SERVICE',
      useFactory: (configService: ConfigService) => {
        const activityServiceOptions = configService.get('activityService')
        return ClientProxyFactory.create(activityServiceOptions)
      },
      inject: [ConfigService]
    },
    {
      provide: 'TOKEN_SERVICE',
      useFactory: (configService: ConfigService) => {
        const tokenServiceOptions = configService.get('tokenService')
        return ClientProxyFactory.create(tokenServiceOptions)
      },
      inject: [ConfigService]
    },
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService')
        return ClientProxyFactory.create(userServiceOptions)
      },
      inject: [ConfigService]
    },
    {
      provide: 'EVENT_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('eventService'))
      },
      inject: [ConfigService]
    },
    {
      provide: 'PERMISSION_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('permissionService'))
      },
      inject: [ConfigService]
    },
    {
      provide: 'GENERIC_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('genericService'))
      },
      inject: [ConfigService]
    },
    {
      provide: 'CERTIFICATE_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(
          configService.get('certificateService')
        )
      },
      inject: [ConfigService]
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    }
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard
    // }
  ]
})
export class AppModule {}
