import { ApiProperty } from '@nestjs/swagger'

export class ParticipantIdDto {
  @ApiProperty()
  id: string
}
