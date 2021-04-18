import { ApiProperty } from '@nestjs/swagger'

export class CreateActivityDto {
  @ApiProperty({ example: 'Artigo' })
  name: string
}
