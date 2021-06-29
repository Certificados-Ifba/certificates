import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator
} from '@nestjs/terminus'
import { ConfigService } from 'src/services/config/config.service'

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
    return this.health.check([
      async () =>
        this.microservice.pingCheck(
          'token',
          this.configService.get('tokenService')
        ),
      async () =>
        this.microservice.pingCheck(
          'user',
          this.configService.get('userService')
        ),
      async () =>
        this.microservice.pingCheck(
          'event',
          this.configService.get('eventService')
        ),
      async () =>
        this.microservice.pingCheck(
          'permission',
          this.configService.get('permissionService')
        ),
      async () =>
        this.microservice.pingCheck(
          'generic',
          this.configService.get('genericService')
        )
    ])
  }
}
