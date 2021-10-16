import { ApiProperty } from '@nestjs/swagger'

export class CertificateIdDto {
  @ApiProperty()
  event_id: string

  @ApiProperty()
  id: string
}
