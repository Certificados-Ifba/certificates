import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Inject,
  HttpStatus,
  HttpException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags
} from '@nestjs/swagger'
import { Express } from 'express'
import { IServiceStorageUploadResponse } from 'src/interfaces/storage/service-storage-upload-response.interface'

@Controller('upload')
@ApiTags('upload')
export class UploadController {
  constructor(
    @Inject('STORAGE_SERVICE')
    private readonly storageServiceClient: ClientProxy
  ) {}

  @Post('image')
  @ApiCreatedResponse({})
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @UploadedFile() file // : Express.Multer.File
  ): Promise<any> {
    console.log(file)
    const storageUploadResponse: IServiceStorageUploadResponse = await this.storageServiceClient
      .send('storage_upload', file)
      .toPromise()

    if (storageUploadResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: storageUploadResponse.message,
          errors: storageUploadResponse.errors,
          data: null
        },
        storageUploadResponse.status
      )
    }

    return {
      message: storageUploadResponse.message,
      errors: null
    }
  }

  // @Post()
  // @ApiCreatedResponse({
  //   type: LoginUserResponseDto,
  //   description: 'Performs authentication on the platform'
  // })
  // public async loginUser(
  //   @Req() req: Request,
  //   @Body() loginRequest: LoginUserDto
  // ): Promise<LoginUserResponseDto> {
  //   const getUserResponse: IServiceUserSearchResponse = await this.userServiceClient
  //     .send('user_search_by_credentials', loginRequest)
  //     .toPromise()

  //   if (getUserResponse.status !== HttpStatus.OK) {
  //     throw new HttpException(
  //       {
  //         message: getUserResponse.message,
  //         data: null,
  //         errors: null
  //       },
  //       HttpStatus.UNAUTHORIZED
  //     )
  //   }
  //   const agent = parser(req.headers['user-agent'])

  //   const createTokenResponse: IServiceTokenCreateResponse = await this.tokenServiceClient
  //     .send('token_create', {
  //       user: getUserResponse.data.user,
  //       ip: requestIp.getClientIp(req).split(':').pop(),
  //       device: `${agent.device.model ? agent.device.model + ' - ' : ''}${
  //         agent.os.name
  //       } ${agent.os.version} - ${agent.browser.name}`,
  //       where: req.headers.location
  //     })
  //     .toPromise()

  //   if (createTokenResponse.status !== HttpStatus.CREATED) {
  //     throw new HttpException(
  //       {
  //         message: createTokenResponse.message,
  //         errors: createTokenResponse.errors,
  //         data: null
  //       },
  //       createTokenResponse.status
  //     )
  //   }

  //   return {
  //     message: createTokenResponse.message,
  //     data: {
  //       token: createTokenResponse.token
  //     },
  //     errors: null
  //   }
  // }

  // @Delete()
  // @ApiBearerAuth('JWT')
  // @Authorization(true)
  // @ApiCreatedResponse({
  //   type: LogoutUserResponseDto,
  //   description: 'Performs the output on the platform'
  // })
  // public async logoutUser(
  //   @Req() request: IAuthorizedRequest
  // ): Promise<LogoutUserResponseDto> {
  //   const userInfo = request.user

  //   const destroyTokenResponse: IServiceTokenDestroyResponse = await this.tokenServiceClient
  //     .send('token_destroy', userInfo.id)
  //     .toPromise()

  //   if (destroyTokenResponse.status !== HttpStatus.OK) {
  //     throw new HttpException(
  //       {
  //         message: destroyTokenResponse.message,
  //         data: null,
  //         errors: destroyTokenResponse.errors
  //       },
  //       destroyTokenResponse.status
  //     )
  //   }

  //   return {
  //     message: destroyTokenResponse.message,
  //     errors: null,
  //     data: null
  //   }
  // }
}
