import { Injectable } from '@nestjs/common'
import fs from 'fs/promises'
import path from 'path'

import { ConfigService } from './config/config.service'

@Injectable()
export class StorageService {
  // public uploadFile(file: Express.Multer.File): Promise<void> {
  //   console.log(file)
  //   return fs.writeFile(
  //     path.resolve(new ConfigService().get('uploadDir'), file.originalname),
  //     file.buffer
  //   )
  // }
}
