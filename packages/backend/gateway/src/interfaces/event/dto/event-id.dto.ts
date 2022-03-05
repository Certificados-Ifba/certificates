import { ApiProperty } from '@nestjs/swagger'

export class EventIdDto {
  @ApiProperty()
  id: string
}
