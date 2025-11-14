import { Controller, Get } from '@nestjs/common'

@Controller('status')
export class StatusAppController {
  @Get()
  status() {
    return {
      status: 'ok teste deploy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  }
}
