import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator
} from '@nestjs/terminus'

import { ConfigService } from '../services/config/config.service'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
    private configService: ConfigService
  ) {}

  @Get()
  @HealthCheck()
  check() {
    console.log(this.configService.get('storageService'))

    return this.health.check([
      async () =>
        this.microservice.pingCheck(
          'certificate',
          this.configService.get('certificateService')
        ),
      async () =>
        this.microservice.pingCheck(
          'event',
          this.configService.get('eventService')
        ),
      async () =>
        this.microservice.pingCheck(
          'token',
          this.configService.get('tokenService')
        ),
      async () =>
        this.microservice.pingCheck(
          'activity',
          this.configService.get('activityService')
        ),
      async () =>
        this.microservice.pingCheck(
          'generic',
          this.configService.get('genericService')
        ),
      async () =>
        this.microservice.pingCheck(
          'mailer',
          this.configService.get('mailerService')
        ),
      async () =>
        this.microservice.pingCheck(
          'permission',
          this.configService.get('permissionService')
        ),
      async () =>
        this.microservice.pingCheck(
          'user',
          this.configService.get('userService')
        ),
      async () =>
        this.microservice.pingCheck(
          'storage',
          this.configService.get('storageService')
        )
    ])
  }
}
