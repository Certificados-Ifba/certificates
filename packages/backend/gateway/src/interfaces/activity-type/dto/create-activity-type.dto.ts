import { ApiProperty } from '@nestjs/swagger'

export class CreateActivityTypeDto {
  @ApiProperty({ example: 'artigo' })
  name: string
}
