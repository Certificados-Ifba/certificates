import { ApiProperty } from '@nestjs/swagger'

export class FileDto {
  @ApiProperty()
  file: string
}
