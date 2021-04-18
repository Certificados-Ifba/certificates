import { ApiProperty } from '@nestjs/swagger'

export class CreateFunctionDto {
  @ApiProperty({ example: 'ouvinte' })
  name: string
}
