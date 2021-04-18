import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler()
    )

    if (!secured) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new HttpException(
        {
          message: 'token_missing',
          data: null,
          errors: null
        },
        HttpStatus.UNAUTHORIZED
      )
    }

    const [, token] = authHeader.split(' ')

    const userTokenInfo = await this.tokenServiceClient
      .send('token_decode', {
        token
      })
      .toPromise()

    if (!userTokenInfo || !userTokenInfo.data) {
      throw new HttpException(
        {
          message: userTokenInfo.message,
          data: null,
          errors: null
        },
        userTokenInfo.status
      )
    }

    const userInfo = await this.userServiceClient
      .send('user_get_by_id', userTokenInfo.data.user.id)
      .toPromise()

    request.user = userInfo.user
    return true
  }
}
