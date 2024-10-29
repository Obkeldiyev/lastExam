import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStudentAuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
