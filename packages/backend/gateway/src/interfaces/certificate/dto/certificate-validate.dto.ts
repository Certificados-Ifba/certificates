import { ApiProperty } from '@nestjs/swagger'

export class CertificateValidateDto {
  @ApiProperty()
  key: string
}
