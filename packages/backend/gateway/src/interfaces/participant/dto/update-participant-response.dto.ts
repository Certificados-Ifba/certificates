import { ApiProperty } from '@nestjs/swagger'

import { IParticipant } from '../participant.interface'

export class UpdateParticipantResponseDto {
  @ApiProperty({ example: 'user_update_by_id_success' })
  message: string

  @ApiProperty({
    example: {
      id: '60cd7047d877b601909814c6',
      name: 'Teste',
      role: 'PARTICIPANT',
      email: 'test1@ifba.edu.br',
      is_confirmed: false,
      personal_data: {
        cpf: '309.511.980-17',
        dob: '1/1/1991',
        phone: '',
        institution: true
      },
      created_at: '2021-06-19T04:19:19.495Z',
      updated_at: '2021-06-25T23:01:03.539Z'
    },
    nullable: true
  })
  data: IParticipant

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any }
}
