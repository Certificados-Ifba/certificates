import { ApiProperty } from '@nestjs/swagger'

import { ICertificate } from '../certificate.interface'

export class CreateCertificateResponseDto {
  @ApiProperty({ example: 'certificate_create_success' })
  message: string

  @ApiProperty({
    example: {
      certificate: {
        activity: '5d987c3bfb881ec86b476bca',
        function: '5d987c3bfb881ec86b476bfa',
        participant: '5d987c3bfb881ec86b476bfa',
        event: '5d987c3bfb881ec86b476bfa',
        key: 'fa4605d4-16be-4b28-b50b-29c67fedb2b4',
        workload: 8,
        start_date: new Date('2019-10-01'),
        end_date: new Date('2019-10-11'),
        authorship_order: '',
        additional_field: '',
        created_at: new Date(),
        updated_at: new Date(),
        id: '5d987c3bfb881ec86b476bcc'
      }
    },
    nullable: true
  })
  data: {
    certificate: ICertificate
  }

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any }
}
