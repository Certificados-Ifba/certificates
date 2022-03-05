import { ApiProperty } from '@nestjs/swagger'

export class DeleteCertificateResponseDto {
  @ApiProperty({ example: 'certificate_delete_by_id_success' })
  message: string

  @ApiProperty({ example: null, nullable: true, type: 'null' })
  data: null

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any }
}
