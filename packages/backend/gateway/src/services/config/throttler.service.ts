import {
  ThrottlerOptionsFactory,
  ThrottlerModuleOptions
} from '@nestjs/throttler'

export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      ttl: Number(process.env.THROTTLE_TTL) || 1,
      limit: Number(process.env.THROTTLE_LIMIT) || 5
    }
  }
}
