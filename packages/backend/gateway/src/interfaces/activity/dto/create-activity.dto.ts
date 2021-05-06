import { ApiProperty } from '@nestjs/swagger'

export class CreateActivityDto {
  @ApiProperty({ example: 'artigo' })
  name: string
}
