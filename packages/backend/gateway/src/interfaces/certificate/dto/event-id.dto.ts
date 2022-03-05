import { ApiProperty } from '@nestjs/swagger'

export class EventIdDto {
  @ApiProperty()
  event_id: string
}
