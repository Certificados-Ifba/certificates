import { ApiProperty } from '@nestjs/swagger'

import { IParticipant } from '../participant.interface'

export class CreateParticipantResponseDto {
  @ApiProperty({ example: 'participant_create_success' })
  message: string

  @ApiProperty({
    example: {
      user: {
        name: 'Teste Estudante',
        email: 'aluno@ifba.edu.br',
        is_confirmed: false,
        role: 'PARTICIPANT',
        last_login: null,
        personal_data: {
          cpf: '36199705050',
          dob: '1999-01-01',
          institution: true
        },
        id: '5d987c3bfb881ec86b476bcc'
      }
    },
    nullable: true
  })
  data: {
    user: IParticipant
  }

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any }
}
