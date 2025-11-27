import { Controller, Get } from '@nestjs/common'

@Controller('status')
export class StatusAppController {
  @Get()
  status() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  }
}
