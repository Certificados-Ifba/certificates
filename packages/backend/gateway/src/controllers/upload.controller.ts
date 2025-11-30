import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Inject,
  HttpStatus,
  HttpException,
  Get,
  Param,
  Res,
  Delete
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger'
import { Express, Response } from 'express'

import { Authorization } from '../decorators/authorization.decorator'
import { Permission } from '../decorators/permission.decorator'
import { DeleteFileResponseDto } from '../interfaces/storage/dto/delete-file-response.dto'
import { FileDto } from '../interfaces/storage/dto/file.dto'
import { IServiceStorageUploadResponse } from '../interfaces/storage/service-storage-upload-response.interface'

@Controller('upload')
@ApiTags('upload')
export class UploadController {
  constructor(
    @Inject('STORAGE_SERVICE')
    private readonly storageServiceClient: ClientProxy
  ) {}

  @Get(':file')
  // @Authorization(true)
  // @Permission('storage_decode')
  public async decodeFile(
    @Param() params: FileDto,
    @Res() res: Response
  ): Promise<any> {
    const {
      status,
      message,
      data,
      errors
    } = await this.storageServiceClient
      .send('storage_decode', params.file)
      .toPromise()

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
          errors,
          data: null
        },
        status
      )
    }
    res.set({
      'Content-Type': 'image/png'
    })
    return res.end(Buffer.from(data, 'binary'), 'binary')
  }

  @Delete(':file')
  @ApiBearerAuth('JWT')
  @Authorization(true)
  @Permission('storage_destroy')
  @ApiOkResponse({
    type: DeleteFileResponseDto,
    description: 'List of user'
  })
  public async destroyFile(
    @Param() params: FileDto
  ): Promise<DeleteFileResponseDto> {
    const { status, message, errors } = await this.storageServiceClient
      .send('storage_destroy', params.file)
      .toPromise()

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
          errors,
          data: null
        },
        status
      )
    }

    return {
      message
    }
  }

  @Post()
  @ApiBearerAuth('JWT')
  @Authorization(true)
  @Permission('storage_upload')
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
    @UploadedFile() file: Express.Multer.File
  ): Promise<any> {
    const {
      status,
      message,
      data,
      errors
    }: IServiceStorageUploadResponse = await this.storageServiceClient
      .send('storage_upload', file)
      .toPromise()

    if (status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message,
          errors,
          data: null
        },
        status
      )
    }

    return {
      message,
      data,
      errors: null
    }
  }
}
