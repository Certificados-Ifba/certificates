import { ApiProperty } from '@nestjs/swagger'

export class ListActivityDto {
  @ApiProperty({ example: 'Artigo' })
  name: string
}
