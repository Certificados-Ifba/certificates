import { ApiProperty } from '@nestjs/swagger'

export class ParticipantEventIdDto {
  @ApiProperty()
  idEvent: string

  @ApiProperty()
  id: string
}
