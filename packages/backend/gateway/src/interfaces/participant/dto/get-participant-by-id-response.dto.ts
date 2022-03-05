import { ApiProperty } from '@nestjs/swagger'

import { IParticipant } from '../participant.interface'

export class GetParticipantByIdResponseDto {
  @ApiProperty({ example: 'user_get_by_id_success' })
  message: string

  @ApiProperty({
    example: {
      name: 'Teste',
      email: 'test1@ifba.edu.br',
      role: 'ADMIN',
      is_confirmed: true,
      created_at: '2021-05-16T01:08:28.794Z',
      updated_at: '2021-05-16T01:10:57.912Z',
      last_login: '2021-05-16T01:10:57.906Z',
      id: '09b6c3e7-c04a-49bc-b66e-ad28b4097445',
      personal_data: {
        cpf: '925.089.590-90',
        dob: '1/1/2000',
        phone: '',
        institution: false
      }
    },
    nullable: true
  })
  data: IParticipant
}
