import { ApiProperty } from '@nestjs/swagger'

export class UpdateEventDto {
  @ApiProperty({ example: 'V Week-IT' })
  name: string

  @ApiProperty({
    example: 'Vitória da Conquista'
  })
  local: string

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
