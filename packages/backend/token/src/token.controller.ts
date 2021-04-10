import { Controller, HttpStatus } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { ITokenDataResponse } from './interfaces/token-data-response.interface'
import { ITokenDestroyResponse } from './interfaces/token-destroy-response.interface'
import { ITokenResponse } from './interfaces/token-response.interface'
import { IUser } from './interfaces/user.interface'
import { TokenService } from './services/token.service'

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern('token_create')
  public async createToken(data: { user: IUser }): Promise<ITokenResponse> {
    let result: ITokenResponse

    if (data && data.user) {
      try {
        const createResult = await this.tokenService.createToken(data.user)
        result = {
          status: HttpStatus.CREATED,
          message: 'token_create_success',
          token: createResult.token
        }
      } catch (e) {
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: 'token_create_bad_request',
          token: null
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'token_create_bad_request',
        token: null
      }
    }

    return result
  }

  @MessagePattern('token_destroy')
  public async destroyToken(data: {
    userId: string
  }): Promise<ITokenDestroyResponse> {
    return {
      status: data && data.userId ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message:
        data && data.userId
          ? (await this.tokenService.deleteTokenForUserId(data.userId)) &&
            'token_destroy_success'
          : 'token_destroy_bad_request',
      errors: null
    }
  }

  @MessagePattern('token_decode')
  public async decodeToken(data: {
    token: string
  }): Promise<ITokenDataResponse> {
    const tokenData = await this.tokenService.decodeToken(data.token)
    return {
      status: tokenData ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
      message: tokenData ? 'token_decode_success' : 'token_decode_unauthorized',
      data: tokenData
    }
  }
}
