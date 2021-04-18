import { ApiProperty } from '@nestjs/swagger'

export class GenericIdDto {
  @ApiProperty()
  id: string
}
