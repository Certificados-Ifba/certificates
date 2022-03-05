import {
  Controller,
  Post,
  Delete,
  Body,
  Req,
  Inject,
  HttpStatus,
  HttpException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger'
import { Request } from 'express'
import * as requestIp from 'request-ip'
import * as parser from 'ua-parser-js'

import { Authorization } from '../decorators/authorization.decorator'
import { IAuthorizedRequest } from '../interfaces/common/authorized-request.interface'
import { IServiceTokenCreateResponse } from '../interfaces/token/service-token-create-response.interface'
import { IServiceTokenDestroyResponse } from '../interfaces/token/service-token-destroy-response.interface'
import { LoginUserResponseDto } from '../interfaces/user/dto/login-user-response.dto'
import { LoginUserDto } from '../interfaces/user/dto/login-user.dto'
import { LogoutUserResponseDto } from '../interfaces/user/dto/logout-user-response.dto'
import { IServiceUserSearchResponse } from '../interfaces/user/service-user-search-response.interface'

@Controller('sessions')
@ApiTags('sessions')
export class SessionsController {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: LoginUserResponseDto,
    description: 'Performs authentication on the platform'
  })
  public async loginUser(
    @Req() req: Request,
    @Body() loginRequest: LoginUserDto
  ): Promise<LoginUserResponseDto> {
    const getUserResponse: IServiceUserSearchResponse = await this.userServiceClient
      .send('user_search_by_credentials', loginRequest)
      .toPromise()

    if (getUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: getUserResponse.message,
          data: null,
          errors: null
        },
        HttpStatus.UNAUTHORIZED
      )
    }
    const agent = parser(req.headers['user-agent'])

    const createTokenResponse: IServiceTokenCreateResponse = await this.tokenServiceClient
      .send('token_create', {
        user: getUserResponse.data.user,
        ip: requestIp.getClientIp(req).split(':').pop(),
        device: `${agent.device.model ? agent.device.model + ' - ' : ''}${
          agent.os.name
        } ${agent.os.version} - ${agent.browser.name}`,
        where: req.headers.location
      })
      .toPromise()

    if (createTokenResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createTokenResponse.message,
          errors: createTokenResponse.errors,
          data: null
        },
        createTokenResponse.status
      )
    }

    return {
      message: createTokenResponse.message,
      data: {
        token: createTokenResponse.token
      },
      errors: null
    }
  }

  @Delete()
  @ApiBearerAuth('JWT')
  @Authorization(true)
  @ApiCreatedResponse({
    type: LogoutUserResponseDto,
    description: 'Performs the output on the platform'
  })
  public async logoutUser(
    @Req() request: IAuthorizedRequest
  ): Promise<LogoutUserResponseDto> {
    const userInfo = request.user

    const destroyTokenResponse: IServiceTokenDestroyResponse = await this.tokenServiceClient
      .send('token_destroy', userInfo.id)
      .toPromise()

    if (destroyTokenResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: destroyTokenResponse.message,
          data: null,
          errors: destroyTokenResponse.errors
        },
        destroyTokenResponse.status
      )
    }

    return {
      message: destroyTokenResponse.message,
      errors: null,
      data: null
    }
  }
}
