import { ApiProperty } from '@nestjs/swagger'

export class ActivityEventIdDto {
  @ApiProperty()
  idEvent: string

  @ApiProperty()
  id: string
}
