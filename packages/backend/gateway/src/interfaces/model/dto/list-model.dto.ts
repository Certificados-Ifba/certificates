import { ApiProperty } from '@nestjs/swagger'

export class ListModelDto {
  @ApiProperty({ example: 1, required: false })
  page?: number

  @ApiProperty({ example: 10, required: false })
  per_page?: number

  @ApiProperty({ example: 'created_at', required: false })
  sort_by?: string

  @ApiProperty({ example: 'DESC', required: false })
  order_by?: 'ASC' | 'DESC'
}
