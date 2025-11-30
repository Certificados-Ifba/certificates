import { ApiProperty } from '@nestjs/swagger'

export class DeleteFileResponseDto {
  @ApiProperty({ example: 'storage_destroy_success' })
  message: string
}
