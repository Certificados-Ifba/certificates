import { Injectable } from '@nestjs/common'
import { writeFile, readFile, unlink } from 'fs/promises'
import { resolve } from 'path'

import { ConfigService } from './config/config.service'

@Injectable()
export class StorageService {
  public uploadStorage(file: Express.Multer.File, name: string): Promise<void> {
    return writeFile(
      resolve(new ConfigService().get('uploadDir'), name),
      Buffer.from(file.buffer)
    )
  }

  public decodeStorage(file: string): Promise<Buffer> {
    return readFile(resolve(new ConfigService().get('uploadDir'), file))
  }

  public destroyStorage(file: string): Promise<void> {
    return unlink(resolve(new ConfigService().get('uploadDir'), file))
  }
}
