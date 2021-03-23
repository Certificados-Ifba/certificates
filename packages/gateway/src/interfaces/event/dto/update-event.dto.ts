import { ApiProperty } from '@nestjs/swagger'

export class UpdateEventDto {
  @ApiProperty({ example: 'V Week-IT' })
  name: string

  @ApiProperty({
    example: 'Cidades Inteligentes: Práticas Colaborativas no Sudoeste da Bahia'
  })
  description: string

  @ApiProperty({ example: 'Week-IT' })
  initials: string

  @ApiProperty({ example: '2019' })
  year: string

  @ApiProperty({ example: '5º' })
  edition: string

  @ApiProperty({ example: new Date('2019-10-01') })
  start_date: Date

  @ApiProperty({ example: new Date('2019-10-11') })
  end_date: Date
}
