import { ApiProperty } from '@nestjs/swagger'

export class ListActivityDto {
  @ApiProperty({ example: 1 })
  page: number

  @ApiProperty({ example: 10, required: false })
  per_page: number

  @ApiProperty({ example: '', required: false })
  search: string

  @ApiProperty({ example: '', required: false })
  sort_by: string

  @ApiProperty({ example: '', required: false })
  order_by: 'ASC' | 'DESC'
}
