import { ApiProperty } from "@nestjs/swagger"

export class DeleteUserResponseDto {
    @ApiProperty({ example: 'user_delete_by_id_success' })
    message: string
  
    @ApiProperty({ example: null, nullable: true, type: 'null' })
    data: null
  
    @ApiProperty({ example: null, nullable: true })
    errors: { [key: string]: any }
  }