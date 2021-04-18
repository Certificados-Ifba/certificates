import { ApiProperty } from '@nestjs/swagger'

import { IGeneric } from '../../generic/generic.interface'

export class GetFunctionByIdResponseDto {
  @ApiProperty({ example: 'generic_get_by_id_success' })
  message: string

  @ApiProperty({
    example: {
      type: 'function',
      name: 'ouvinte',
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    },
    nullable: true
  })
  data: IGeneric
}
