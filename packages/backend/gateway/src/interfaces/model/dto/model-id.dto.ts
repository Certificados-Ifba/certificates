import { ApiProperty } from '@nestjs/swagger'

export class ModelIdDto {
  @ApiProperty()
  event_id: string

  @ApiProperty()
  id: string
}
