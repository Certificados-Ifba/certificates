import { Controller, HttpStatus } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { v4 as uuid } from 'uuid'

import { IStorageCreateResponse } from './interfaces/storage-create-response.interface'
import { IStorageDataResponse } from './interfaces/storage-data-response.interface'
import { IStorageDestroyResponse } from './interfaces/storage-destroy-response.interface'
import { StorageService } from './services/storage.service'

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @MessagePattern('storage_upload')
  public async uploadStorage(
    file: Express.Multer.File
  ): Promise<IStorageCreateResponse> {
    let result: IStorageCreateResponse

    if (file) {
      try {
        const name = `${uuid()}.${file.originalname.split('.').pop()}`
        await this.storageService.uploadStorage(file, name)

        result = {
          status: HttpStatus.CREATED,
          message: 'storage_upload_success',
          data: name,
          errors: null
        }
      } catch (e) {
        console.error(e)

        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'storage_upload_precondition_failed',
          data: null,
          errors: e.errors
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'storage_upload_bad_request',
        data: null,
        errors: null
      }
    }

    return result
  }

  @MessagePattern('storage_destroy')
  public async destroyStorage(file: string): Promise<IStorageDestroyResponse> {
    if (!file) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'storage_destroy_bad_request',
        errors: null
      }
    }

    try {
      await this.storageService.destroyStorage(file)
      return {
        status: HttpStatus.OK,
        message: 'storage_destroy_success',
        errors: null
      }
    } catch (e) {
      console.error(e)
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: 'storage_destroy_precondition_failed',
        errors: e.errors
      }
    }
  }

  @MessagePattern('storage_decode')
  public async decodeStorage(file: string): Promise<IStorageDataResponse> {
    if (!file) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'storage_decode_bad_request',
        data: null,
        errors: null
      }
    }
    try {
      const storageData = await this.storageService.decodeStorage(file)
      console.log(storageData)

      return {
        status: storageData ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
        message: storageData
          ? 'storage_decode_success'
          : 'storage_decode_unauthorized',
        data: storageData,
        errors: null
      }
    } catch (e) {
      console.error(e)

      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: 'storage_decode_precondition_failed',
        data: null,
        errors: e.errors
      }
    }
  }
}
