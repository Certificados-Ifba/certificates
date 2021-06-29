import {
  Controller,
  Post,
  Get,
  Body,
  Inject,
  HttpStatus,
  HttpException,
  Param,
  Req
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger'
import { Request } from 'express'
import * as requestIp from 'request-ip'
import * as parser from 'ua-parser-js'

import { IServiceTokenCreateResponse } from '../interfaces/token/service-token-create-response.interface'
import { ConfirmUserResponseDto } from '../interfaces/user/dto/confirm-user-response.dto'
import { ConfirmUserDto } from '../interfaces/user/dto/confirm-user.dto'
import { ForgotPasswordUserResponseDto } from '../interfaces/user/dto/forgot-password-user-response.dto'
import { ForgotPasswordUserDto } from '../interfaces/user/dto/forgot-password-user.dto'
import { UserLinkResponseDto } from '../interfaces/user/dto/user-link-response.dto'
import { UserLinkDto } from '../interfaces/user/dto/user-link.dto'
import { IServiceUserConfirmResponse } from '../interfaces/user/service-user-confirm-response.interface'
import { IServiceUserForgotPasswordResponse } from '../interfaces/user/service-user-forgot-password-response.interface'
import { IServiceUserLinkResponse } from '../interfaces/user/service-user-link-response.interface'

@Controller('password')
@ApiTags('password')
export class PasswordController {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}

  @Post('/reset')
  @ApiCreatedResponse({
    type: ConfirmUserResponseDto,
    description: 'Reset password or confirm user'
  })
  public async confirmUser(
    @Req() req: Request,
    @Body() confirmRequest: ConfirmUserDto
  ): Promise<ConfirmUserResponseDto> {
    const confirmUserResponse: IServiceUserConfirmResponse = await this.userServiceClient
      .send('user_confirm', {
        password: confirmRequest.password,
        link: confirmRequest.link
      })
      .toPromise()

    if (confirmUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: confirmUserResponse.message,
          data: null,
          errors: confirmUserResponse.errors
        },
        confirmUserResponse.status
      )
    }

    const agent = parser(req.headers['user-agent'])

    const createTokenResponse: IServiceTokenCreateResponse = await this.tokenServiceClient
      .send('token_create', {
        user: confirmUserResponse.user,
        ip: requestIp.getClientIp(req).split(':').pop(),
        device: `${agent.device.model ? agent.device.model + ' - ' : ''}${
          agent.os.name
        } ${agent.os.version} - ${agent.browser.name}`,
        where: req.headers.location
      })
      .toPromise()

    return {
      message: confirmUserResponse.message,
      errors: null,
      data: {
        token: createTokenResponse.token
      }
    }
  }

  @Post('/forgot')
  @ApiCreatedResponse({
    type: ForgotPasswordUserResponseDto,
    description: 'Resend e-mail to reset password'
  })
  public async forgotPassword(
    @Body() forgotPasswordRequest: ForgotPasswordUserDto
  ): Promise<ForgotPasswordUserResponseDto> {
    const forgotPasswordUserResponse: IServiceUserForgotPasswordResponse = await this.userServiceClient
      .send('user_forgot_password', {
        email: forgotPasswordRequest.email
      })
      .toPromise()

    if (forgotPasswordUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: forgotPasswordUserResponse.message,
          data: null,
          errors: forgotPasswordUserResponse.errors
        },
        forgotPasswordUserResponse.status
      )
    }

    return {
      message: forgotPasswordUserResponse.message,
      errors: null
    }
  }

  @Get('/link/:link')
  @ApiCreatedResponse({
    type: UserLinkResponseDto,
    description: 'Check if the recovery link is valid'
  })
  public async getUserLink(
    @Param() params: UserLinkDto
  ): Promise<UserLinkResponseDto> {
    const linkUserResponse: IServiceUserLinkResponse = await this.userServiceClient
      .send('user_get_by_link', params.link)
      .toPromise()

    if (linkUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: linkUserResponse.message,
          data: null
        },
        linkUserResponse.status
      )
    }

    return {
      message: linkUserResponse.message,
      data: linkUserResponse.data
    }
  }
}
