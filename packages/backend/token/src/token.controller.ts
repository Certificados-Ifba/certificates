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
  public async createToken(data: {
    user: IUser
    ip: string
    device: string
    where?: string
  }): Promise<ITokenResponse> {
    let result: ITokenResponse

    if (data && data.user && data.ip && data.device) {
      try {
        const createResult = await this.tokenService.createToken(data)
        result = {
          status: HttpStatus.CREATED,
          message: 'token_create_success',
          token: createResult.token,
          errors: null
        }
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'token_create_precondition_failed',
          token: null,
          errors: e.errors
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'token_create_bad_request',
        token: null,
        errors: null
      }
    }

    return result
  }

  @MessagePattern('token_destroy')
  public async destroyToken(userId: string): Promise<ITokenDestroyResponse> {
    return {
      status: userId ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message: userId
        ? (await this.tokenService.destroyTokenForUserId(userId)) &&
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
