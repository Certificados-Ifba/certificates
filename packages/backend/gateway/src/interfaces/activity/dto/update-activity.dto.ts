import { ApiProperty } from '@nestjs/swagger'

export class UpdateActivityDto {
  @ApiProperty({
    example: 'Introdução ao Estudo da Língua Brasileira de Sinais (LIBRAS)'
  })
  name: string

  @ApiProperty({ example: '5d987c3bfb881ec86b476bfa' })
  type: string

  @ApiProperty({ example: 40 })
  workload: number

  @ApiProperty({ example: new Date('2019-10-01') })
  start_date: Date

  @ApiProperty({ example: new Date('2019-10-11') })
  end_date: Date
}
