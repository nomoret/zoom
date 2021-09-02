import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  age: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
