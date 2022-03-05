import { ApiProperty } from '@nestjs/swagger'

export class ActivityIdDto {
  @ApiProperty()
  event_id: string

  @ApiProperty()
  id: string
}
