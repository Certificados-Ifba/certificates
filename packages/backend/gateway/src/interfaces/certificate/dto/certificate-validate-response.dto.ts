import { ApiProperty } from '@nestjs/swagger'

export class CertificateValidateResponseDto {
  @ApiProperty({ example: 'certificate_validate_success' })
  message: string

  @ApiProperty({
    example: true,
    nullable: false
  })
  data: boolean
}
