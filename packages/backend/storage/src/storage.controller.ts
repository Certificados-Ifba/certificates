import { Controller, HttpStatus } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import fs from 'fs'

// import { IStorageDataResponse } from './interfaces/storage-data-response.interface'
// import { IStorageDestroyResponse } from './interfaces/storage-destroy-response.interface'
import { IStorageCreateResponse } from './interfaces/storage-create-response.interface'
import { StorageService } from './services/storage.service'

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @MessagePattern('storage_upload')
  public async uploadStorage(file: any): Promise<IStorageCreateResponse> {
    let result: IStorageCreateResponse

    if (file) {
      try {
        // const response = await this.storageService.uploadFile(file)
        fs.writeFile(file.originalname, file.buffer, err => {
          if (err) return console.error(err)
          console.log('file saved to ', file.filename)
        })
        // console.log(response)

        result = {
          status: HttpStatus.CREATED,
          message: 'storage_upload_success',
          errors: null
        }
      } catch (e) {
        console.log(e)

        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'storage_upload_precondition_failed',
          errors: e.errors
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'storage_upload_bad_request',
        errors: null
      }
    }

    return result
  }

  // @MessagePattern('storage_destroy')
  // public async destroyStorage(userId: string): Promise<IStorageDestroyResponse> {
  //   return {
  //     status: userId ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
  //     message: userId
  //       ? (await this.storageService.destroyStorageForUserId(userId)) &&
  //         'storage_destroy_success'
  //       : 'storage_destroy_bad_request',
  //     errors: null
  //   }
  // }

  // @MessagePattern('storage_decode')
  // public async decodeStorage(data: {
  //   storage: string
  // }): Promise<IStorageDataResponse> {
  //   const storageData = await this.storageService.decodeStorage(data.storage)
  //   return {
  //     status: storageData ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
  //     message: storageData ? 'storage_decode_success' : 'storage_decode_unauthorized',
  //     data: storageData
  //   }
  // }
}
